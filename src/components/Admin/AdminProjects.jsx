import React, { useState, useEffect } from 'react';

const AdminProjects = ({ token }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: '', location: '', year: '', imageUrl: '', videoUrl: '' });
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/public/projects');
      if (res.ok) setProjects(await res.json());
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`http://localhost:8080/api/admin/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchProjects();
    } catch (e) { console.error(e); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let finalImageUrl = formData.imageUrl;
      let finalVideoUrl = formData.videoUrl;

      // Upload Image
      if (imageFile) {
        const fileData = new FormData();
        fileData.append('file', imageFile);
        const uploadRes = await fetch('http://localhost:8080/api/admin/images/upload', {
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
        const uploadRes = await fetch('http://localhost:8080/api/admin/images/upload', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: fileData
        });
        if (uploadRes.ok) finalVideoUrl = (await uploadRes.json()).url;
      }

      const res = await fetch('http://localhost:8080/api/admin/projects', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ ...formData, imageUrl: finalImageUrl, videoUrl: finalVideoUrl })
      });
      if (res.ok) {
        setShowForm(false);
        setFormData({ title: '', category: '', location: '', year: '', imageUrl: '', videoUrl: '' });
        setImageFile(null);
        setVideoFile(null);
        fetchProjects();
      }
    } catch (e) { console.error(e); }
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Projects Management</h1>
        <button className="btn btn-dark" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add New Project'}
        </button>
      </div>

      {showForm && (
        <div className="admin-card" style={{marginBottom: '2rem'}}>
          <form onSubmit={handleSubmit}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem'}}>
              <div>
                <label>Title</label>
                <input className="login-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
              </div>
              <div>
                <label>Category</label>
                <input className="login-input" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required />
              </div>
              <div>
                <label>Location</label>
                <input className="login-input" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} required />
              </div>
              <div>
                <label>Year</label>
                <input className="login-input" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} required />
              </div>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem'}}>
              <div>
                <label>Feature Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  className="login-input" 
                  style={{padding: '0.5rem'}}
                  onChange={e => setImageFile(e.target.files[0])} 
                />
                {imageFile && <p style={{fontSize: '0.8rem', color: '#10b981', marginTop: '0.5rem'}}>Selected: {imageFile.name}</p>}
              </div>
              <div>
                <label>Feature Video</label>
                <input 
                  type="file" 
                  accept="video/*"
                  className="login-input" 
                  style={{padding: '0.5rem'}}
                  onChange={e => setVideoFile(e.target.files[0])} 
                />
                {videoFile && <p style={{fontSize: '0.8rem', color: '#10b981', marginTop: '0.5rem'}}>Selected: {videoFile.name}</p>}
              </div>
            </div>
            <button type="submit" className="btn btn-dark">Save Project</button>
          </form>
        </div>
      )}

      <div className="admin-card">
        {loading ? <p>Loading...</p> : (
          <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{borderBottom: '2px solid #eee'}}>
                <th style={{padding: '1rem 0'}}>Title</th>
                <th>Category</th>
                <th>Location</th>
                <th>Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? <tr><td colSpan="5" style={{padding: '1rem 0'}}>No projects found.</td></tr> : null}
              {projects.map(p => (
                <tr key={p.id} style={{borderBottom: '1px solid #eee'}}>
                  <td style={{padding: '1rem 0', fontWeight: 'bold'}}>{p.title}</td>
                  <td>{p.category}</td>
                  <td>{p.location}</td>
                  <td>{p.year}</td>
                  <td>
                    <button onClick={() => handleDelete(p.id)} style={{color: 'red', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold'}}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminProjects;
