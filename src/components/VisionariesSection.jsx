import { getImageUrl, getFallbackImage } from '../utils/imageUrl';
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
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid #334155;
          width: 100%;
          max-width: 360px;
          border-radius: 16px;
          overflow: hidden;
        }
        .screenshot-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.25);
        }
        .screenshot-image-wrapper {
          width: 100%;
          height: 350px;
          background: #0f172a;
          overflow: hidden;
          position: relative;
        }
        .screenshot-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          transition: transform 0.4s ease;
        }
        .screenshot-card:hover .screenshot-image-wrapper img {
          transform: scale(1.03);
        }
        .screenshot-text-wrapper {
          padding: 1.75rem 1.5rem 2rem;
          text-align: center;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          background: #FFFFFF;
        }
        .screenshot-name {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 0.35rem;
          line-height: 1.3;
        }
        .screenshot-role {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #D97706;
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }
        .screenshot-quote-box {
          position: relative;
          width: 100%;
          margin-top: 0.85rem;
          padding-top: 0.85rem;
          border-top: 1px solid #E2E8F0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .screenshot-quote {
          font-size: 0.95rem;
          color: #475569;
          font-style: italic;
          line-height: 1.6;
          margin: 0;
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
                <img 
                  src={member.imageUrl ? getImageUrl(member.imageUrl) : getFallbackImage()} 
                  alt={member.name} 
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = getFallbackImage();
                  }}
                />
              </div>
              <div className="screenshot-text-wrapper">
                <h4 className="screenshot-name">{member.name}</h4>
                {member.role && <p className="screenshot-role">{member.role}</p>}
                {member.quote && (
                  <div className="screenshot-quote-box">
                    <p className="screenshot-quote">"{member.quote}"</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default VisionariesSection;
