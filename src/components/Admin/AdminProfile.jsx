import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

const AdminProfile = ({ token }) => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/profile`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setEmail(data.email || '');
        }
      } catch (e) {
        console.error('Failed to fetch profile', e);
      }
    };
    fetchProfile();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setMessage('Email updated successfully!');
      } else {
        const err = await res.text();
        setMessage(`Error: ${err}`);
      }
    } catch (e) {
      setMessage('An error occurred while updating.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>Profile Settings</h1>
          <p style={{ color: '#6b7280', margin: 0 }}>Update your admin email address.</p>
        </div>
      </div>

      <div className="premium-admin-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', fontWeight: '700', color: 'white', flexShrink: 0
          }}>
            A
          </div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '1.1rem', color: '#f1f5f9' }}>Administrator</div>
            <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{email}</div>
          </div>
        </div>

        {message && (
          <div style={{
            padding: '1rem', marginBottom: '1.5rem', borderRadius: '8px',
            background: message.includes('Error') ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
            color: message.includes('Error') ? '#ef4444' : '#10b981',
            border: `1px solid ${message.includes('Error') ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem', fontSize: '0.875rem', fontWeight: '600', color: '#94a3b8' }}>
              <Mail size={15} /> Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
              style={{
                width: '100%', padding: '0.85rem 1rem', borderRadius: '8px',
                border: '1px solid var(--orbit-border)', background: '#09090e',
                color: '#f1f5f9', fontSize: '1rem', outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{
              width: '100%', padding: '0.9rem', borderRadius: '8px', fontWeight: '600',
              background: 'var(--orbit-primary)', border: 'none', color: 'white',
              cursor: submitting ? 'not-allowed' : 'pointer',
              opacity: submitting ? 0.7 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              fontSize: '0.95rem'
            }}
          >
            {submitting ? 'Saving...' : <><CheckCircle size={18} /> Update Email</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
