import React, { useState, useEffect } from 'react';
import { Mail, Trash2, Phone, Calendar, User, MessageSquare, AlertCircle } from 'lucide-react';

const AdminMessages = ({ token }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/contact-messages`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch contact messages');
        return res.json();
      })
      .then(data => {
        setMessages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading contact messages:', err);
        setError('Failed to load contact messages.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/contact-messages/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setMessages(messages.filter(msg => msg.id !== id));
      } else {
        alert('Failed to delete message.');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error deleting message.');
    }
  };

  if (loading) {
    return <div className="admin-loading"><div className="spinner"></div><p>Loading Contact Messages...</p></div>;
  }

  return (
    <div className="admin-section-container" style={{padding: '0'}}>
      <div className="admin-section-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
        <div>
          <h2 style={{fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: 0}}>Contact Us Messages</h2>
          <p style={{color: '#64748b', margin: '0.25rem 0 0', fontSize: '0.95rem'}}>
            Review and manage inquiries submitted through the website contact form.
          </p>
        </div>
        <div style={{background: '#eff6ff', color: '#1d4ed8', padding: '0.5rem 1.25rem', borderRadius: '20px', fontWeight: '700', fontSize: '0.85rem'}}>
          Total: {messages.length} {messages.length === 1 ? 'Message' : 'Messages'}
        </div>
      </div>

      {error && (
        <div style={{background: '#fef2f2', border: '1px solid #fecaca', padding: '1rem', borderRadius: '8px', color: '#991b1b', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          <AlertCircle size={20} /> {error}
        </div>
      )}

      {messages.length === 0 ? (
        <div style={{background: 'var(--orbit-surface2)', border: '1px solid var(--orbit-border)', borderRadius: '16px', padding: '4rem 2rem', textAlign: 'center'}}>
          <Mail size={48} color="#94a3b8" style={{margin: '0 auto 1rem'}} />
          <h3 style={{fontSize: '1.3rem', color: '#f1f5f9', marginBottom: '0.5rem'}}>No Contact Messages Yet</h3>
          <p style={{color: '#64748b', maxWidth: '400px', margin: '0 auto'}}>
            When prospective clients submit inquiries on the Contact Us page, they will appear here automatically.
          </p>
        </div>
      ) : (
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                background: 'white',
                border: '1px solid var(--orbit-border)',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.5rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div style={{ flex: '0 0 220px', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <strong style={{fontSize: '0.9rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
                  <User size={14} color="#3b82f6" /> {msg.firstName} {msg.lastName}
                </strong>
                <div style={{fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
                  <Mail size={12} /> {msg.email}
                </div>
                <div style={{fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
                  <Phone size={12} /> {msg.number}
                </div>
                <div style={{fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem'}}>
                  <Calendar size={12} /> {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'Recently'}
                </div>
              </div>

              <div style={{ flex: '1', minWidth: 0, paddingLeft: '1.5rem', borderLeft: '2px solid #e2e8f0' }}>
                {msg.subject && (
                  <div style={{fontWeight: '700', color: '#1e293b', fontSize: '0.85rem', marginBottom: '0.35rem'}}>
                    {msg.subject}
                  </div>
                )}
                <div style={{
                  color: '#334155',
                  fontSize: '0.85rem',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-wrap',
                  maxHeight: '4.5rem',
                  overflowY: 'auto'
                }}>
                  {msg.message}
                </div>
              </div>

              <div style={{ flexShrink: 0 }}>
                <button
                  onClick={() => handleDelete(msg.id)}
                  style={{
                    background: 'transparent',
                    color: '#ef4444',
                    border: 'none',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                  }}
                  onMouseOver={e => e.currentTarget.style.background = '#fef2f2'}
                  onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                  title="Delete Message"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
