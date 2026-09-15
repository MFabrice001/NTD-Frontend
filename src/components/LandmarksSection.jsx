import { getImageUrl } from '../utils/imageUrl';
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const LandmarksSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All Projects');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/projects`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
        setLoading(false);
      });
  }, []);

  // Filter projects based on the active tab
  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'All Projects') return true;
    return project.category === activeFilter;
  });

  // Collect unique categories for tabs (if any)
  const categories = ['All Projects', ...new Set(projects.map(p => p.category))];

  return (
    <section className="section" style={{ backgroundColor: '#0F172A', padding: '3rem 5%' }}>
      <style>{`
        .landmark-card {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease;
        }
        .landmark-card:hover {
          transform: translateY(-8px);
        }
        .landmark-image-wrapper {
          overflow: hidden;
          border-radius: 8px;
          margin-bottom: 1.5rem;
        }
        .landmark-card img {
          width: 100%;
          height: 350px;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .landmark-card:hover img {
          transform: scale(1.08);
        }
      `}</style>
      <div className="section-header" style={{ color: '#FFFFFF' }}>
        <h2 style={{ color: '#FFFFFF' }}>Impactful Landmarks</h2>
        <p style={{ color: '#94A3B8' }}>A selection of our most recent structural achievements.</p>
      </div>
      
      {categories.length > 1 && (
        <div className="filter-tabs">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading projects...</div>
      ) : projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No projects available.</div>
      ) : (
        <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
          {filteredProjects.map(project => (
            <div key={project.id} onClick={() => setSelectedProject(project)} className="landmark-card">
              <div className="landmark-image-wrapper">
                <img 
                  src={project.imageUrl ? getImageUrl(project.imageUrl) : 'https://images.unsplash.com/photo-1541888081622-df8d9c572baf?q=80&w=800&auto=format&fit=crop'} 
                  alt={project.title} 
                />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '0.2rem', letterSpacing: '1px' }}>
                  {project.category || 'PROJECT'}
                </h4>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '600', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                  {project.title}
                </h3>
                {project.description && (
                  <p style={{ color: '#CBD5E1', fontSize: '0.85rem', lineHeight: '1.6', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', marginBottom: '0.8rem' }}>
                    {project.description}
                  </p>
                )}
                <p style={{ color: '#94A3B8', fontSize: '0.9rem', margin: 0 }}>
                  {project.location} • {project.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Details Modal */}
      {selectedProject && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.85)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '1000px',
            maxHeight: '90vh',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}>
            <button 
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={24} />
            </button>

            {selectedProject.imageUrl && (
              <img 
                src={selectedProject.imageUrl} 
                alt={selectedProject.title} 
                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
              />
            )}
            
            <div style={{ padding: '3rem' }}>
              <span style={{ 
                background: 'var(--color-primary)', 
                color: 'white', 
                padding: '0.4rem 1rem', 
                borderRadius: '20px', 
                fontSize: '0.8rem', 
                fontWeight: '700', 
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {selectedProject.category}
              </span>
              
              <h2 style={{ fontSize: '2.5rem', margin: '1rem 0 0.5rem', color: 'var(--color-dark)' }}>{selectedProject.title}</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '2rem', fontWeight: '500' }}>
                {selectedProject.location} &bull; {selectedProject.year}
              </p>

              {selectedProject.description ? (
                <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7', color: '#475569', fontSize: '1.05rem' }}>
                  {selectedProject.description}
                </div>
              ) : (
                <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>No detailed description provided for this project.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LandmarksSection;
