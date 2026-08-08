import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon, Video as VideoIcon, FileText, Eye, X, Upload } from 'lucide-react';

const AdminBlogs = ({ token }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', author: '', content: '', imageUrl: '', videoUrl: '' });
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [previewModal, setPreviewModal] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/blogs`);
      if (res.ok) setBlogs(await res.json());
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog perspective?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/blogs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchBlogs();
    } catch (e) { console.error(e); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      let finalImageUrl = formData.imageUrl;
      let finalVideoUrl = formData.videoUrl;

      // Upload Image
      if (imageFile) {
        const fileData = new FormData();
        fileData.append('file', imageFile);
        const uploadRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/images/upload`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: fileData
        });
        if (uploadRes.ok) finalImageUrl = (await uploadRes.json()).url;
      }

      // Upload Video
      if (videoFile) {
        const fileData = new FormData();
        fileData.append('file', videoFile);
        const uploadRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/images/upload`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: fileData
        });
        if (uploadRes.ok) finalVideoUrl = (await uploadRes.json()).url;
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/blogs`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ ...formData, imageUrl: finalImageUrl, videoUrl: finalVideoUrl })
      });
      if (res.ok) {
        setShowForm(false);
        setFormData({ title: '', author: '', content: '', imageUrl: '', videoUrl: '' });
        setImageFile(null);
        setVideoFile(null);
        fetchBlogs();
        alert('Article successfully published!');
      }
    } catch (e) { 
      console.error(e); 
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="admin-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <div>
          <h1 style={{fontSize: '1.8rem', fontWeight: '800', color: 'var(--color-dark)', marginBottom: '0.25rem'}}>
            Perspectives & Editorial Studio
          </h1>
          <p style={{color: 'var(--color-text-muted)', fontSize: '0.95rem'}}>
            Publish architectural articles, upload media assets, and manage news posts.
          </p>
        </div>
        <button 
          className="btn btn-dark" 
          style={{display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem'}}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? 'Close Studio' : 'New Article'}
        </button>
      </div>

      {showForm && (
        <div className="admin-blog-studio" style={{marginBottom: '2.5rem'}}>
          <div className="admin-studio-header">
            <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
              <FileText size={22} color="var(--color-primary)" />
              <h2 style={{fontSize: '1.3rem', fontWeight: '700', color: 'var(--color-dark)'}}>
                Article Composer
              </h2>
            </div>
            <span style={{fontSize: '0.8rem', color: '#64748b'}}>Supports large 100MB videos & images</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem'}}>
              <div>
                <label style={{display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--color-dark)'}}>
                  Article Title *
                </label>
                <input 
                  className="login-input" 
                  style={{padding: '0.75rem 1rem'}}
                  placeholder="e.g. Modern Minimalist Interiors: The 2026 Architectural Outlook" 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})} 
                  required 
                />
              </div>
              <div>
                <label style={{display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--color-dark)'}}>
                  Author Name *
                </label>
                <input 
                  className="login-input" 
                  style={{padding: '0.75rem 1rem'}}
                  placeholder="e.g. ND Design Team" 
                  value={formData.author} 
                  onChange={e => setFormData({...formData, author: e.target.value})} 
                  required 
                />
              </div>
            </div>

            <div style={{marginBottom: '1.75rem'}}>
              <label style={{display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--color-dark)'}}>
                Article Content & Description *
              </label>
              <textarea 
                className="login-input" 
                style={{resize: 'vertical', minHeight: '200px', padding: '1rem', lineHeight: '1.6', fontSize: '1rem'}} 
                placeholder="Write your article description and editorial storytelling here..."
                value={formData.content} 
                onChange={e => setFormData({...formData, content: e.target.value})} 
                required 
              />
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem'}}>
              {/* Feature Image Upload */}
              <div className="admin-media-upload-box">
                <label style={{cursor: 'pointer', display: 'block'}}>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem'}}>
                    <div style={{width: '44px', height: '44px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <ImageIcon size={22} color="#475569" />
                    </div>
                    <span style={{fontWeight: '700', color: 'var(--color-dark)', fontSize: '0.95rem'}}>
                      Upload Featured Image
                    </span>
                    <span style={{fontSize: '0.8rem', color: '#64748b'}}>
                      {imageFile ? imageFile.name : 'PNG, JPG or WEBP'}
                    </span>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*"
                    style={{display: 'none'}}
                    onChange={e => setImageFile(e.target.files[0])} 
                  />
                </label>
                {imageFile && (
                  <div style={{marginTop: '0.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div style={{fontSize: '0.85rem', color: '#10b981', fontWeight: '600', marginBottom: '0.5rem'}}>
                      ✓ {imageFile.name} ready
                    </div>
                    <img src={URL.createObjectURL(imageFile)} alt="Preview" style={{ width: '100%', maxWidth: '200px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #eee' }} />
                  </div>
                )}
              </div>

              {/* Feature Video Upload */}
              <div className="admin-media-upload-box">
                <label style={{cursor: 'pointer', display: 'block'}}>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem'}}>
                    <div style={{width: '44px', height: '44px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <VideoIcon size={22} color="#e11d48" />
                    </div>
                    <span style={{fontWeight: '700', color: 'var(--color-dark)', fontSize: '0.95rem'}}>
                      Upload Featured Video (Optional)
                    </span>
                    <span style={{fontSize: '0.8rem', color: '#64748b'}}>
                      {videoFile ? videoFile.name : 'MP4, MOV up to 100MB'}
                    </span>
                  </div>
                  <input 
                    type="file" 
                    accept="video/*"
                    style={{display: 'none'}}
                    onChange={e => setVideoFile(e.target.files[0])} 
                  />
                </label>
                {videoFile && (
                  <div style={{marginTop: '0.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div style={{fontSize: '0.85rem', color: '#10b981', fontWeight: '600', marginBottom: '0.5rem'}}>
                      ✓ {videoFile.name} ready
                    </div>
                    <video src={URL.createObjectURL(videoFile)} style={{ width: '100%', maxWidth: '200px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #eee' }} controls />
                  </div>
                )}
              </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '1rem'}}>
              <button 
                type="button" 
                className="btn" 
                style={{background: '#f1f5f9', color: '#475569', fontWeight: '600'}}
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-dark" 
                style={{padding: '0.75rem 2rem', fontWeight: '700'}}
                disabled={uploading}
              >
                {uploading ? 'Publishing Post...' : 'Publish Article'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="premium-admin-card">
        <h3 style={{fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--color-dark)'}}>
          Published Perspectives ({blogs.length})
        </h3>
        {loading ? <p>Loading articles...</p> : (
          <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{borderBottom: '2px solid #e2e8f0', color: '#64748b', fontSize: '0.85rem', textTransform: 'uppercase'}}>
                <th style={{padding: '1rem 0'}}>Date</th>
                <th>Media</th>
                <th>Title</th>
                <th>Author</th>
                <th>Snippet</th>
                <th style={{textAlign: 'right'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{padding: '2.5rem 0', textAlign: 'center', color: '#64748b'}}>
                    No perspectives published yet. Click "New Article" above to create one.
                  </td>
                </tr>
              ) : null}
              {blogs.map(b => (
                <tr key={b.id} style={{borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s ease'}}>
                  <td style={{padding: '1.25rem 0', color: '#64748b', fontSize: '0.9rem'}}>
                    {new Date(b.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <div style={{display: 'flex', gap: '0.4rem'}}>
                      {b.videoUrl && (
                        <span style={{background: '#ffe4e6', color: '#be123c', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '0.25rem'}}>
                          <VideoIcon size={12} /> Video
                        </span>
                      )}
                      {b.imageUrl && (
                        <span style={{background: '#e0f2fe', color: '#0369a1', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '0.25rem'}}>
                          <ImageIcon size={12} /> Image
                        </span>
                      )}
                      {!b.videoUrl && !b.imageUrl && (
                        <span style={{background: '#f1f5f9', color: '#64748b', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '700'}}>
                          Text
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{fontWeight: '700', color: 'var(--color-dark)', maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                    {b.title}
                  </td>
                  <td style={{color: '#475569'}}>{b.author}</td>
                  <td style={{color: '#64748b', maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.9rem'}}>
                    {b.content}
                  </td>
                  <td style={{textAlign: 'right'}}>
                    <div style={{display: 'flex', justifyContent: 'flex-end', gap: '0.75rem'}}>
                      <button 
                        onClick={() => setPreviewModal(b)} 
                        title="Preview Article"
                        style={{background: '#f1f5f9', color: '#334155', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem'}}
                      >
                        <Eye size={14} /> Preview
                      </button>
                      <button 
                        onClick={() => handleDelete(b.id)} 
                        title="Delete Article"
                        style={{background: '#fee2e2', color: '#dc2626', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem'}}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Admin Article Preview Modal */}
      {previewModal && (
        <div className="blog-modal-backdrop" onClick={() => setPreviewModal(null)}>
          <div className="blog-modal-dialog" onClick={e => e.stopPropagation()}>
            <button className="blog-modal-close" onClick={() => setPreviewModal(null)}>
              <X size={20} />
            </button>

            <div className="blog-modal-header">
              <span className="blog-badge">Admin Live Preview</span>
              <h1>{previewModal.title}</h1>
              <div className="blog-meta-row">
                <span>By <strong>{previewModal.author}</strong></span>
                <span>•</span>
                <span>{new Date(previewModal.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="blog-modal-media-section">
              {previewModal.videoUrl && (
                <div style={{marginBottom: previewModal.imageUrl ? '1.5rem' : '0'}}>
                  <video 
                    src={previewModal.videoUrl} 
                    controls 
                    className="blog-modal-video-player"
                    poster={previewModal.imageUrl || undefined}
                  />
                </div>
              )}
              {previewModal.imageUrl && !previewModal.videoUrl && (
                <div 
                  className="blog-modal-img-banner" 
                  style={{backgroundImage: `url(${previewModal.imageUrl})`}} 
                />
              )}
            </div>

            <div className="blog-modal-body">
              {previewModal.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
