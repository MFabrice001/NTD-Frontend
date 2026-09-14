import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, CheckCircle, Search } from 'lucide-react';

const AdminServices = ({ token }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', icon: '' });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchServices = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/services`);
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (e) {
      console.error("Failed to fetch services", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenModal = (service = null) => {
    if (service) {
      setCurrentService(service);
      setFormData({ title: service.title, description: service.description, icon: service.icon || '' });
    } else {
      setCurrentService(null);
      setFormData({ title: '', description: '', icon: '' });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentService(null);
    setFormData({ title: '', description: '', icon: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    let finalIconUrl = formData.icon;

    try {
      if (imageFile) {
        const fileData = new FormData();
        fileData.append('file', imageFile);
        const uploadRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/images/upload`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: fileData
        });
        if (uploadRes.ok) {
          finalIconUrl = (await uploadRes.json()).url;
        }
      }

      const url = currentService 
        ? `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/services/${currentService.id}`
        : `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/services`;
        
      const method = currentService ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...formData, icon: finalIconUrl })
      });

      if (res.ok) {
        fetchServices();
        handleCloseModal();
      } else {
        console.error("Failed to save service");
      }
    } catch (e) {
      console.error("Error saving service", e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/services/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setServices(services.filter(s => s.id !== id));
      }
    } catch (e) {
      console.error("Failed to delete service", e);
    }
  };

  const filteredServices = services.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>Services Management</h1>
          <p style={{color: '#6b7280', margin: 0}}>Manage the dynamic services offered by NTD Build.</p>
        </div>
        <button 
          className="btn" 
          style={{background: "var(--orbit-primary)", color: "#f1f5f9", border: "none", display: 'flex', alignItems: 'center', gap: '0.5rem'}} 
          onClick={() => handleOpenModal()}
        >
          <Plus size={18} />
          Add Service
        </button>
      </div>

      <div className="admin-search-bar" style={{marginBottom: '2rem'}}>
        <div style={{position: 'relative', maxWidth: '400px'}}>
          <Search size={18} style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b'}} />
          <input 
            type="text" 
            placeholder="Search services..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%', 
              padding: '0.75rem 1rem 0.75rem 2.5rem',
              borderRadius: '8px',
              border: '1px solid var(--orbit-border)',
              background: 'var(--orbit-surface)',
              color: 'var(--orbit-text)'
            }}
          />
        </div>
      </div>

      <div className="premium-admin-card" style={{padding: 0, overflow: 'hidden'}}>
        {loading ? <p style={{padding: '2rem'}}>Loading services...</p> : (
          <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{background: 'var(--orbit-surface2)', borderBottom: '1px solid var(--orbit-border)'}}>
                <th style={{padding: '1rem 1.5rem'}}>Title</th>
                <th style={{padding: '1rem 1.5rem'}}>Description</th>
                <th style={{padding: '1rem 1.5rem', width: '150px'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.length === 0 ? (
                <tr><td colSpan="3" style={{padding: '2rem 1.5rem', textAlign: 'center', color: '#6b7280'}}>No services found.</td></tr>
              ) : (
                filteredServices.map(service => (
                  <tr key={service.id} style={{borderBottom: '1px solid var(--orbit-border)'}}>
                    <td style={{padding: '1rem 1.5rem', fontWeight: '600'}}>{service.title}</td>
                    <td style={{padding: '1rem 1.5rem', color: '#6b7280'}}>
                      {service.description.length > 80 ? service.description.substring(0, 80) + '...' : service.description}
                    </td>
                    <td style={{padding: '1rem 1.5rem'}}>
                      <div style={{display: 'flex', gap: '0.5rem'}}>
                        <button 
                          onClick={() => handleOpenModal(service)}
                          style={{padding: '0.5rem', background: 'transparent', border: 'none', color: '#3b82f6', cursor: 'pointer', borderRadius: '4px'}}
                          onMouseOver={e => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'}
                          onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(service.id)}
                          style={{padding: '0.5rem', background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', borderRadius: '4px'}}
                          onMouseOver={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                          onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, 
          display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            background: 'var(--orbit-surface)', width: '100%', maxWidth: '600px', 
            borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid var(--orbit-border)', overflow: 'hidden'
          }}>
            <div style={{
              padding: '1.5rem', borderBottom: '1px solid var(--orbit-border)', 
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <h2 style={{margin: 0, fontSize: '1.25rem', fontWeight: '600'}}>
                {currentService ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button onClick={handleCloseModal} style={{background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer'}}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} style={{padding: '1.5rem'}}>
              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500'}}>Service Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  required
                  style={{
                    width: '100%', padding: '0.75rem', borderRadius: '6px', 
                    border: '1px solid var(--orbit-border)', background: 'var(--orbit-bg)', color: 'var(--orbit-text)'
                  }}
                />
              </div>
              
              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500'}}>Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  required
                  rows={4}
                  style={{
                    width: '100%', padding: '0.75rem', borderRadius: '6px', 
                    border: '1px solid var(--orbit-border)', background: 'var(--orbit-bg)', color: 'var(--orbit-text)'
                  }}
                />
              </div>
              
              <div style={{marginBottom: '2rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500'}}>Service Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])} 
                  style={{
                    width: '100%', padding: '0.75rem', borderRadius: '6px', 
                    border: '1px solid var(--orbit-border)', background: 'var(--orbit-bg)', color: 'var(--orbit-text)'
                  }}
                />
                {formData.icon && !imageFile && (
                  <div style={{marginTop: '0.5rem', fontSize: '0.85rem', color: '#64748b'}}>
                    Current Image: <a href={formData.icon} target="_blank" rel="noreferrer" style={{color: '#3b82f6'}}>View</a>
                  </div>
                )}
              </div>
              
              <div style={{display: 'flex', justifyContent: 'flex-end', gap: '1rem'}}>
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  style={{
                    padding: '0.75rem 1.5rem', borderRadius: '6px', fontWeight: '500',
                    background: 'transparent', border: '1px solid var(--orbit-border)', color: 'var(--orbit-text)', cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={submitting}
                  style={{
                    padding: '0.75rem 1.5rem', borderRadius: '6px', fontWeight: '500',
                    background: 'var(--orbit-primary)', border: 'none', color: 'white', cursor: 'pointer',
                    opacity: submitting ? 0.7 : 1, display: 'flex', alignItems: 'center', gap: '0.5rem'
                  }}
                >
                  {submitting ? 'Saving...' : (
                    <>
                      <CheckCircle size={18} />
                      {currentService ? 'Update Service' : 'Save Service'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
