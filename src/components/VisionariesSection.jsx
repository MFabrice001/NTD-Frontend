import { getImageUrl } from '../utils/imageUrl';
import React, { useState, useEffect } from 'react';

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
    <section style={{ backgroundColor: '#1E293B', padding: '5rem 5%' }}>
      <div className="section-header" style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h2 style={{ color: '#FFFFFF', fontSize: '2.0rem', fontWeight: '700', marginBottom: '1rem' }}>Led by Visionaries in Engineering</h2>
        <p style={{ color: '#94A3B8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Our leadership team combines local expertise with global standards to deliver unmatched quality.
        </p>
      </div>

      <style>{`
        .screenshot-card {
          background: #FFFFFF;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid #E5E7EB;
          width: 100%;
          max-width: 380px;
        }
        .screenshot-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
        }
        .screenshot-image-wrapper {
          width: 100%;
          height: 350px;
          background: linear-gradient(to bottom, #E5E7EB, #D1D5DB);
          overflow: hidden;
          position: relative;
        }
        .screenshot-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
        }
        .screenshot-text-wrapper {
          padding: 2rem 1.5rem;
          text-align: center;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
        }
        .screenshot-name {
          font-size: 1.15rem;
          font-weight: 800;
          color: #111827;
          margin-bottom: 0.8rem;
          line-height: 1.4;
        }
        .screenshot-role {
          font-size: 0.95rem;
          color: #6B7280;
          line-height: 1.5;
        }
      `}</style>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6B7280' }}>Loading team members...</div>
      ) : (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2.5rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {teamMembers.map(member => (
            <div key={member.id} className="screenshot-card">
              <div className="screenshot-image-wrapper">
                <img src={member.imageUrl ? getImageUrl(member.imageUrl) : 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop'} alt={member.name} />
              </div>
              <div className="screenshot-text-wrapper">
                <h4 className="screenshot-name">{member.name}</h4>
                <p className="screenshot-role">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default VisionariesSection;
