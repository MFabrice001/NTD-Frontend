import React, { useState, useEffect } from 'react';
import { Globe, Mail, MessageCircle } from 'lucide-react';

const VisionariesSection = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/team-members`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        setTeamMembers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching team members:', error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="section section-bg-blue">
      <div className="section-header" style={{ marginBottom: '4rem' }}>
        <h2>Led by Visionaries in Engineering</h2>
        <p>Our leadership team combines local expertise with global standards to deliver unmatched quality.</p>
        <button className="btn btn-primary" style={{marginTop: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.2)'}}>Join Our Team 👥</button>
      </div>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'white' }}>Loading team members...</div>
      ) : teamMembers.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.7)' }}>No team members available.</div>
      ) : (
        <div className="grid-2" style={{ gap: '3rem', maxWidth: '1100px', margin: '0 auto' }}>
          {teamMembers.map(member => (
            <div 
              key={member.id} 
              style={{
                display: 'flex',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                padding: '1.5rem',
                gap: '1.5rem',
                alignItems: 'center',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 30px 50px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
              }}
            >
              <img 
                src={member.imageUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop'} 
                alt={member.name} 
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid rgba(255,255,255,0.2)'
                }}
              />
              <div style={{ flex: 1, color: 'white' }}>
                <h4 style={{ fontSize: '1.4rem', marginBottom: '0.2rem' }}>{member.name}</h4>
                <p style={{ color: 'var(--color-primary)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{member.role}</p>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontStyle: 'italic', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '1rem' }}>"{member.quote}"</p>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a href="#" style={{ color: 'rgba(255,255,255,0.6)', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='white'} onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.6)'}><Globe size={18} /></a>
                  <a href="#" style={{ color: 'rgba(255,255,255,0.6)', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='white'} onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.6)'}><MessageCircle size={18} /></a>
                  <a href="#" style={{ color: 'rgba(255,255,255,0.6)', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='white'} onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.6)'}><Mail size={18} /></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default VisionariesSection;
