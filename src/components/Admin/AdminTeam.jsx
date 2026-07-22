import React, { useState, useEffect } from 'react';

const AdminTeam = ({ token }) => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', quote: '', imageUrl: '' });
  const [imageFile, setImageFile] = useState(null);

  const fetchTeam = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/team-members`);
      if (res.ok) setTeam(await res.json());
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  useEffect(() => { fetchTeam(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/team-members/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchTeam();
    } catch (e) { console.error(e); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let finalImageUrl = formData.imageUrl;

      if (imageFile) {
        const fileData = new FormData();
        fileData.append('file', imageFile);

        const uploadRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/images/upload`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: fileData
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          finalImageUrl = uploadData.url;
        } else {
          console.error("Image upload failed");
          alert("Failed to upload image. Continuing without image.");
        }
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/team-members`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ ...formData, imageUrl: finalImageUrl })
      });
      if (res.ok) {
        setShowForm(false);
        setFormData({ name: '', role: '', quote: '', imageUrl: '' });
        setImageFile(null);
        fetchTeam();
      }
    } catch (e) { console.error(e); }
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Team Management</h1>
        <button className="btn btn-dark" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add New Member'}
        </button>
      </div>

      {showForm && (
        <div className="admin-card" style={{marginBottom: '2rem'}}>
          <form onSubmit={handleSubmit}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem'}}>
              <div>
                <label>Name</label>
                <input className="login-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div>
                <label>Role</label>
                <input className="login-input" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} required />
              </div>
            </div>
            <div style={{marginBottom: '1rem'}}>
              <label>Quote</label>
              <textarea className="login-input" style={{resize: 'vertical', minHeight: '80px'}} value={formData.quote} onChange={e => setFormData({...formData, quote: e.target.value})} required />
            </div>
            <div style={{marginBottom: '1.5rem'}}>
              <label>Profile Image</label>
              <input 
                type="file" 
                accept="image/*"
                className="login-input" 
                style={{padding: '0.5rem'}}
                onChange={e => setImageFile(e.target.files[0])} 
              />
              {imageFile && <p style={{fontSize: '0.8rem', color: '#10b981', marginTop: '0.5rem'}}>Selected: {imageFile.name}</p>}
            </div>
            <button type="submit" className="btn btn-dark">Save Team Member</button>
          </form>
        </div>
      )}

      <div className="admin-card">
        {loading ? <p>Loading...</p> : (
          <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{borderBottom: '2px solid #eee'}}>
                <th style={{padding: '1rem 0'}}>Name</th>
                <th>Role</th>
                <th>Quote</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {team.length === 0 ? <tr><td colSpan="4" style={{padding: '1rem 0'}}>No team members found.</td></tr> : null}
              {team.map(m => (
                <tr key={m.id} style={{borderBottom: '1px solid #eee'}}>
                  <td style={{padding: '1rem 0', fontWeight: 'bold'}}>{m.name}</td>
                  <td>{m.role}</td>
                  <td>{m.quote.length > 50 ? m.quote.substring(0,50) + '...' : m.quote}</td>
                  <td>
                    <button onClick={() => handleDelete(m.id)} style={{color: 'red', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold'}}>Delete</button>
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

export default AdminTeam;
