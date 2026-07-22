import React, { useState, useEffect } from 'react';

const AdminBlogs = ({ token }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', author: '', content: '', imageUrl: '', videoUrl: '' });
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/blogs`);
      if (res.ok) setBlogs(await res.json());
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
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
      }
    } catch (e) { console.error(e); }
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Blog Management</h1>
        <button className="btn btn-dark" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Create New Post'}
        </button>
      </div>

      {showForm && (
        <div className="admin-card" style={{marginBottom: '2rem'}}>
          <form onSubmit={handleSubmit}>
            <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem'}}>
              <div>
                <label>Title</label>
                <input className="login-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
              </div>
              <div>
                <label>Author</label>
                <input className="login-input" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} required />
              </div>
            </div>
            <div style={{marginBottom: '1rem'}}>
              <label>Content</label>
              <textarea className="login-input" style={{resize: 'vertical', minHeight: '150px'}} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} required />
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
            <button type="submit" className="btn btn-dark">Publish Post</button>
          </form>
        </div>
      )}

      <div className="admin-card">
        {loading ? <p>Loading...</p> : (
          <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{borderBottom: '2px solid #eee'}}>
                <th style={{padding: '1rem 0'}}>Date</th>
                <th>Title</th>
                <th>Author</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length === 0 ? <tr><td colSpan="4" style={{padding: '1rem 0'}}>No blog posts found.</td></tr> : null}
              {blogs.map(b => (
                <tr key={b.id} style={{borderBottom: '1px solid #eee'}}>
                  <td style={{padding: '1rem 0', color: '#666'}}>
                    {new Date(b.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{fontWeight: 'bold'}}>{b.title}</td>
                  <td>{b.author}</td>
                  <td>
                    <button onClick={() => handleDelete(b.id)} style={{color: 'red', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold'}}>Delete</button>
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

export default AdminBlogs;
