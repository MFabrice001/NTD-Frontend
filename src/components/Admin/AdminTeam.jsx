import { getImageUrl } from '../../utils/imageUrl';
import React, { useState, useEffect } from 'react';

const AdminTeam = ({ token }) => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', quote: '', imageUrl: '' });
  const [imageFile, setImageFile] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
  const authToken = token || localStorage.getItem('token');

  const fetchTeam = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/public/team-members`);
      if (res.ok) setTeam(await res.json());
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  useEffect(() => { fetchTeam(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) return;
    try {
      const res = await fetch(`${apiUrl}/api/admin/team-members/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (res.ok) fetchTeam();
    } catch (e) { console.error(e); }
  };

  const compressImageFile = (file) => {
    return new Promise((resolve) => {
      if (!file || !file.type.startsWith('image/')) return resolve(null);
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 1280;
          let width = img.width;
          let height = img.height;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
          resolve(dataUrl);
        };
        img.onerror = () => resolve(e.target.result);
        img.src = e.target.result;
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let finalImageUrl = formData.imageUrl;

      if (imageFile) {
        try {
          const dataUrl = await compressImageFile(imageFile);
          if (dataUrl) finalImageUrl = dataUrl;
        } catch (compErr) {
          console.error("Team member image compression error", compErr);
        }
      }

      const res = await fetch(`${apiUrl}/api/admin/team-members`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}` 
        },
        body: JSON.stringify({ ...formData, imageUrl: finalImageUrl })
      });
      if (res.ok) {
        setShowForm(false);
        setFormData({ name: '', role: '', quote: '', imageUrl: '' });
        setImageFile(null);
        fetchTeam();
        alert('Team member successfully saved!');
      } else {
        alert(`Failed to save team member (${res.status}).`);
      }
    } catch (e) {
      console.error(e);
      alert('Error saving team member.');
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Team Management</h1>
        <button className="btn" style={{background: "var(--orbit-primary)", color: "#f1f5f9", border: "none"}} onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add New Member'}
        </button>
      </div>

      {showForm && (
        <div className="premium-admin-card" style={{marginBottom: '2rem'}}>
          <form onSubmit={handleSubmit}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem'}}>
              <div>
                <label style={{display: 'block', marginBottom: '0.4rem', fontWeight: '600', color: '#f1f5f9'}}>Full Name *</label>
                <input className="login-input" placeholder="e.g. Eng. Fabrice M." value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '0.4rem', fontWeight: '600', color: '#f1f5f9'}}>Role / Designation *</label>
                <input className="login-input" placeholder="e.g. Managing Director & Senior Engineer" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} required />
              </div>
            </div>
            <div style={{marginBottom: '1rem'}}>
              <label style={{display: 'block', marginBottom: '0.4rem', fontWeight: '600', color: '#f1f5f9'}}>Leadership Quote / Philosophy *</label>
              <textarea className="login-input" placeholder="e.g. Innovating structural elegance and engineering standards that shape tomorrow's landscapes." style={{resize: 'vertical', minHeight: '80px'}} value={formData.quote} onChange={e => setFormData({...formData, quote: e.target.value})} required />
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
              {imageFile && (
                <div style={{marginTop: '0.5rem'}}>
                  <p style={{fontSize: '0.8rem', color: '#10b981', marginBottom: '0.5rem'}}>Selected: {imageFile.name}</p>
                  <img src={URL.createObjectURL(imageFile)} alt="Preview" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--orbit-border)' }} />
                </div>
              )}
            </div>
            <button type="submit" className="btn" style={{background: "var(--orbit-primary)", color: "#f1f5f9", border: "none"}}>Save Team Member</button>
          </form>
        </div>
      )}

      <div className="premium-admin-card">
        {loading ? <p>Loading...</p> : (
          <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{borderBottom: '1px solid var(--orbit-border)'}}>
                <th style={{padding: '1rem 0'}}>Name</th>
                <th>Role</th>
                <th>Quote</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {team.length === 0 ? <tr><td colSpan="4" style={{padding: '1rem 0'}}>No team members found.</td></tr> : null}
              {team.map(m => (
                <tr key={m.id} style={{borderBottom: '1px solid var(--orbit-border)'}}>
                  <td style={{padding: '1rem 0', fontWeight: 'bold'}}>{m.name}</td>
                  <td>{m.role}</td>
                  <td>{m.quote.length > 50 ? m.quote.substring(0,50) + '...' : m.quote}</td>
                  <td>
                    <button onClick={() => handleDelete(m.id)} style={{color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold'}}>Delete</button>
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
