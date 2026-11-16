import { getImageUrl } from '../../utils/imageUrl';
import React, { useState, useEffect } from 'react';
import { Upload, X, Star, Images, Edit2, Trash2, Plus, Film } from 'lucide-react';

const AdminProjects = ({ token }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    year: '',
    description: '',
    videoUrl: ''
  });

  // Multiple image handling: existing uploaded URLs + new File objects
  const [existingImages, setExistingImages] = useState([]);
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
  const authToken = token || localStorage.getItem('token');

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/public/projects`);
      if (res.ok) {
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      console.error("Error fetching projects", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      location: '',
      year: '',
      description: '',
      videoUrl: ''
    });
    setExistingImages([]);
    setNewImageFiles([]);
    setVideoFile(null);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title || '',
      category: project.category || '',
      location: project.location || '',
      year: project.year || '',
      description: project.description || '',
      videoUrl: project.videoUrl || ''
    });

    const imgs = project.imageUrls && project.imageUrls.length > 0 
      ? project.imageUrls 
      : (project.imageUrl ? [project.imageUrl] : []);
    
    setExistingImages(imgs);
    setNewImageFiles([]);
    setVideoFile(null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`${apiUrl}/api/admin/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (res.ok) fetchProjects();
    } catch (e) {
      console.error(e);
    }
  };

  const handleImageFilesSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedArr = Array.from(e.target.files);
      setNewImageFiles(prev => [...prev, ...selectedArr]);
    }
  };

  const removeExistingImage = (index) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeNewFile = (index) => {
    setNewImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const setCoverExisting = (index) => {
    setExistingImages(prev => {
      const copy = [...prev];
      const [item] = copy.splice(index, 1);
      return [item, ...copy];
    });
  };

  const setCoverNew = (index) => {
    setNewImageFiles(prev => {
      const copy = [...prev];
      const [item] = copy.splice(index, 1);
      return [item, ...copy];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let uploadedUrls = [];

      // 1. Upload multiple images if any new files selected
      if (newImageFiles.length > 0) {
        const fileData = new FormData();
        newImageFiles.forEach(file => fileData.append('files', file));

        try {
          const uploadRes = await fetch(`${apiUrl}/api/admin/images/upload-multiple`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${authToken}` },
            body: fileData
          });

          if (uploadRes.ok) {
            const data = await uploadRes.json();
            uploadedUrls = data.urls || [];
          } else {
            // Fallback: Upload sequentially via /upload
            for (const file of newImageFiles) {
              const singleData = new FormData();
              singleData.append('file', file);
              const singleRes = await fetch(`${apiUrl}/api/admin/images/upload`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${authToken}` },
                body: singleData
              });
              if (singleRes.ok) {
                const sJson = await singleRes.json();
                if (sJson.url) uploadedUrls.push(sJson.url);
              }
            }
          }
        } catch (uploadErr) {
          console.error("Multiple image upload failed, trying sequential:", uploadErr);
        }
      }

      // Combine existing images and newly uploaded images
      const allImages = [...existingImages, ...uploadedUrls];
      const primaryCover = allImages.length > 0 ? allImages[0] : '';

      // 2. Upload video if selected
      let finalVideoUrl = formData.videoUrl;
      if (videoFile) {
        const videoData = new FormData();
        videoData.append('file', videoFile);
        const vRes = await fetch(`${apiUrl}/api/admin/images/upload`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${authToken}` },
          body: videoData
        });
        if (vRes.ok) {
          const vJson = await vRes.json();
          finalVideoUrl = vJson.url;
        }
      }

      const payload = {
        ...formData,
        imageUrl: primaryCover,
        imageUrls: allImages,
        videoUrl: finalVideoUrl
      };

      const url = editingId ? `${apiUrl}/api/admin/projects/${editingId}` : `${apiUrl}/api/admin/projects`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        resetForm();
        fetchProjects();
        alert(editingId ? 'Project updated successfully!' : 'Project created successfully with multiple images!');
      } else {
        alert('Failed to save project. Please check backend connection.');
      }
    } catch (err) {
      console.error("Submit error", err);
      alert('An error occurred while saving the project.');
    } finally {
      setSubmitting(false);
    }
  };

  const totalSelectedImages = existingImages.length + newImageFiles.length;

  return (
    <div>
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Projects Management</h1>
          <p style={{ color: '#6b7280', margin: 0 }}>Add, edit, and upload multi-image projects for the landing page.</p>
        </div>
        <button 
          className="btn" 
          style={{ 
            background: "var(--orbit-primary)", 
            color: "#f1f5f9", 
            border: "none",
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.25rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 600
          }} 
          onClick={() => {
            if (showForm) resetForm();
            else setShowForm(true);
          }}
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? 'Cancel' : 'Add New Project'}
        </button>
      </div>

      {showForm && (
        <div className="premium-admin-card" style={{ marginBottom: '2.5rem', border: '1px solid var(--orbit-border)' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--orbit-text)' }}>
            {editingId ? 'Edit Project' : 'Add New Project with Multi-Image Gallery'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>Project Title *</label>
                <input 
                  className="login-input" 
                  value={formData.title} 
                  onChange={e => setFormData({ ...formData, title: e.target.value })} 
                  placeholder="e.g. Kigali Heights Extension"
                  required 
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>Category *</label>
                <input 
                  className="login-input" 
                  value={formData.category} 
                  onChange={e => setFormData({ ...formData, category: e.target.value })} 
                  placeholder="e.g. COMMERCIAL, RESIDENTIAL, CIVIL WORKS"
                  required 
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>Location *</label>
                <input 
                  className="login-input" 
                  value={formData.location} 
                  onChange={e => setFormData({ ...formData, location: e.target.value })} 
                  placeholder="e.g. Kigali, Rwanda"
                  required 
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>Year *</label>
                <input 
                  className="login-input" 
                  value={formData.year} 
                  onChange={e => setFormData({ ...formData, year: e.target.value })} 
                  placeholder="e.g. 2024 - 2026"
                  required 
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>Project Description *</label>
              <textarea 
                className="login-input" 
                value={formData.description} 
                onChange={e => setFormData({ ...formData, description: e.target.value })} 
                rows="4" 
                placeholder="Comprehensive structural details, scope of work, and project highlights..."
                required 
              />
            </div>

            {/* Multiple Images Upload Box */}
            <div style={{ marginBottom: '1.75rem', background: 'var(--orbit-surface2)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--orbit-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Images size={18} color="var(--orbit-primary)" /> Project Images Gallery (Upload Multiple)
                  </h3>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                    Select multiple high-resolution photos. The first image will be the primary cover on the landing page.
                  </p>
                </div>
                <label 
                  style={{
                    background: 'var(--orbit-primary)',
                    color: '#ffffff',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <Upload size={16} /> Choose Images
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    style={{ display: 'none' }} 
                    onChange={handleImageFilesSelect} 
                  />
                </label>
              </div>

              {totalSelectedImages === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', border: '2px dashed var(--orbit-border)', borderRadius: '8px', color: '#94a3b8' }}>
                  <Images size={36} style={{ margin: '0 auto 0.5rem', opacity: 0.5 }} />
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>No images selected yet. Click "Choose Images" to add one or multiple photos.</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                  {/* Existing Uploaded Images */}
                  {existingImages.map((imgUrl, index) => (
                    <div 
                      key={`existing-${index}`} 
                      style={{ 
                        position: 'relative', 
                        borderRadius: '8px', 
                        overflow: 'hidden', 
                        border: index === 0 ? '2px solid #10b981' : '1px solid var(--orbit-border)',
                        background: '#000',
                        height: '110px'
                      }}
                    >
                      <img 
                        src={getImageUrl(imgUrl)} 
                        alt="Project" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                      {index === 0 && (
                        <span style={{ position: 'absolute', top: '4px', left: '4px', background: '#10b981', color: '#fff', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                          ★ COVER
                        </span>
                      )}
                      <div style={{ position: 'absolute', top: '4px', right: '4px', display: 'flex', gap: '4px' }}>
                        {index !== 0 && (
                          <button
                            type="button"
                            title="Set as Cover"
                            onClick={() => setCoverExisting(index)}
                            style={{ background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', borderRadius: '4px', padding: '3px', cursor: 'pointer' }}
                          >
                            <Star size={12} />
                          </button>
                        )}
                        <button
                          type="button"
                          title="Remove Image"
                          onClick={() => removeExistingImage(index)}
                          style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', padding: '3px', cursor: 'pointer' }}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Newly Selected Local Files */}
                  {newImageFiles.map((file, index) => {
                    const isCover = existingImages.length === 0 && index === 0;
                    return (
                      <div 
                        key={`new-${index}`} 
                        style={{ 
                          position: 'relative', 
                          borderRadius: '8px', 
                          overflow: 'hidden', 
                          border: isCover ? '2px solid #10b981' : '1px solid var(--orbit-border)',
                          background: '#000',
                          height: '110px'
                        }}
                      >
                        <img 
                          src={URL.createObjectURL(file)} 
                          alt="New preview" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                        {isCover && (
                          <span style={{ position: 'absolute', top: '4px', left: '4px', background: '#10b981', color: '#fff', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                            ★ COVER
                          </span>
                        )}
                        <div style={{ position: 'absolute', top: '4px', right: '4px', display: 'flex', gap: '4px' }}>
                          {!isCover && (
                            <button
                              type="button"
                              title="Set as Cover"
                              onClick={() => setCoverNew(index)}
                              style={{ background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', borderRadius: '4px', padding: '3px', cursor: 'pointer' }}
                            >
                              <Star size={12} />
                            </button>
                          )}
                          <button
                            type="button"
                            title="Remove Image"
                            onClick={() => removeNewFile(index)}
                            style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', padding: '3px', cursor: 'pointer' }}
                          >
                            <X size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Optional Feature Video */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
                Optional Feature Video
              </label>
              <input 
                type="file" 
                accept="video/*"
                className="login-input" 
                style={{ padding: '0.5rem' }}
                onChange={e => setVideoFile(e.target.files[0] || null)} 
              />
              {videoFile && (
                <p style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '0.4rem' }}>
                  Selected video: {videoFile.name}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                type="submit" 
                disabled={submitting}
                className="btn" 
                style={{ 
                  background: "var(--orbit-primary)", 
                  color: "#f1f5f9", 
                  border: "none",
                  padding: '0.75rem 2rem',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  opacity: submitting ? 0.7 : 1
                }}
              >
                {submitting ? 'Uploading & Saving...' : (editingId ? 'Update Project' : 'Save Project')}
              </button>
              <button 
                type="button" 
                onClick={resetForm}
                style={{ 
                  background: 'transparent', 
                  border: '1px solid var(--orbit-border)', 
                  color: 'var(--orbit-text)', 
                  padding: '0.75rem 1.5rem', 
                  borderRadius: '8px', 
                  cursor: 'pointer' 
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects Listing Table */}
      <div className="premium-admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <p style={{ padding: '2rem' }}>Loading projects...</p>
        ) : (
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--orbit-surface2)', borderBottom: '1px solid var(--orbit-border)' }}>
                <th style={{ padding: '1rem 1.5rem', width: '90px' }}>Preview</th>
                <th style={{ padding: '1rem 1.5rem' }}>Title & Category</th>
                <th style={{ padding: '1rem 1.5rem' }}>Location</th>
                <th style={{ padding: '1rem 1.5rem' }}>Year</th>
                <th style={{ padding: '1rem 1.5rem' }}>Gallery</th>
                <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                    No projects found. Click "Add New Project" above to create one.
                  </td>
                </tr>
              ) : (
                projects.map(p => {
                  const imgs = p.imageUrls && p.imageUrls.length > 0 ? p.imageUrls : (p.imageUrl ? [p.imageUrl] : []);
                  const coverImg = imgs.length > 0 ? imgs[0] : null;

                  return (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--orbit-border)' }}>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        {coverImg ? (
                          <img 
                            src={getImageUrl(coverImg)} 
                            alt={p.title} 
                            style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '6px' }} 
                          />
                        ) : (
                          <div style={{ width: '60px', height: '45px', background: 'var(--orbit-surface2)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Images size={16} opacity={0.4} />
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <div style={{ fontWeight: 600, color: 'var(--orbit-text)' }}>{p.title}</div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--orbit-primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                          {p.category}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', color: '#64748b' }}>{p.location}</td>
                      <td style={{ padding: '1rem 1.5rem', color: '#64748b' }}>{p.year}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '0.3rem', 
                          fontSize: '0.8rem', 
                          fontWeight: 600, 
                          padding: '0.25rem 0.6rem', 
                          borderRadius: '20px', 
                          background: imgs.length > 1 ? 'rgba(16, 185, 129, 0.15)' : 'var(--orbit-surface2)', 
                          color: imgs.length > 1 ? '#10b981' : '#64748b' 
                        }}>
                          <Images size={13} /> {imgs.length} {imgs.length === 1 ? 'photo' : 'photos'}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                        <button 
                          onClick={() => handleEdit(p)} 
                          title="Edit Project"
                          style={{ color: 'var(--orbit-primary)', background: 'none', border: 'none', cursor: 'pointer', marginRight: '1rem', padding: '0.3rem' }}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(p.id)} 
                          title="Delete Project"
                          style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', padding: '0.3rem' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminProjects;
