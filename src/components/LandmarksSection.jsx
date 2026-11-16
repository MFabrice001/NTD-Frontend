import { getImageUrl } from '../utils/imageUrl';
import React, { useState, useEffect } from 'react';
import { X, Images, ChevronLeft, ChevronRight, Play } from 'lucide-react';

const LandmarksSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All Projects');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/projects`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
        setLoading(false);
      });
  }, []);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
  };

  // Filter projects based on the active tab
  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'All Projects') return true;
    return project.category === activeFilter;
  });

  // Collect unique categories for tabs (if any)
  const categories = ['All Projects', ...new Set(projects.map(p => p.category).filter(Boolean))];

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
          position: relative;
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
        .project-thumb-btn:hover {
          opacity: 1 !important;
          transform: translateY(-2px);
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
        <div style={{ textAlign: 'center', padding: '2rem', color: '#cbd5e1' }}>Loading projects...</div>
      ) : projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No projects available.</div>
      ) : (
        <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
          {filteredProjects.map(project => {
            const projectImages = project.imageUrls && project.imageUrls.length > 0
              ? project.imageUrls
              : (project.imageUrl ? [project.imageUrl] : []);
            
            const coverSrc = projectImages.length > 0 
              ? getImageUrl(projectImages[0])
              : 'https://images.unsplash.com/photo-1541888081622-df8d9c572baf?q=80&w=800&auto=format&fit=crop';

            return (
              <div key={project.id} onClick={() => openProjectModal(project)} className="landmark-card">
                <div className="landmark-image-wrapper">
                  <img 
                    src={coverSrc} 
                    alt={project.title} 
                  />
                  {projectImages.length > 1 && (
                    <span 
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '12px',
                        background: 'rgba(15, 23, 42, 0.85)',
                        backdropFilter: 'blur(6px)',
                        color: '#ffffff',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '4px 10px',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                      }}
                    >
                      <Images size={13} color="#10b981" /> {projectImages.length} Photos
                    </span>
                  )}
                  {project.videoUrl && (
                    <span 
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'rgba(15, 23, 42, 0.85)',
                        backdropFilter: 'blur(6px)',
                        color: '#ffffff',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '4px 10px',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        border: '1px solid rgba(255, 255, 255, 0.25)'
                      }}
                    >
                      <Play size={11} fill="#ffffff" /> Video Tour
                    </span>
                  )}
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
            );
          })}
        </div>
      )}

      {/* Project Details Modal with Multi-Image Gallery */}
      {selectedProject && (() => {
        const modalImages = selectedProject.imageUrls && selectedProject.imageUrls.length > 0
          ? selectedProject.imageUrls
          : (selectedProject.imageUrl ? [selectedProject.imageUrl] : []);

        const currentImage = modalImages.length > 0 ? getImageUrl(modalImages[activeImageIndex]) : null;

        return (
          <div 
            onClick={() => setSelectedProject(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(4px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
          >
            <div 
              onClick={e => e.stopPropagation()}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '960px',
                maxHeight: '92vh',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(15, 23, 42, 0.75)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 20,
                  transition: 'background 0.2s'
                }}
              >
                <X size={22} />
              </button>

              {/* Main Image Viewer */}
              {currentImage && (
                <div style={{ position: 'relative', width: '100%', height: '440px', background: '#090d16', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img 
                    src={currentImage} 
                    alt={`${selectedProject.title} ${activeImageIndex + 1}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />

                  {/* Previous / Next Controls if multiple images */}
                  {modalImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex(prev => (prev === 0 ? modalImages.length - 1 : prev - 1));
                        }}
                        title="Previous Image"
                        style={{
                          position: 'absolute',
                          left: '1rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'rgba(15, 23, 42, 0.75)',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '50%',
                          width: '44px',
                          height: '44px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                        }}
                      >
                        <ChevronLeft size={26} />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex(prev => (prev === modalImages.length - 1 ? 0 : prev + 1));
                        }}
                        title="Next Image"
                        style={{
                          position: 'absolute',
                          right: '1rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'rgba(15, 23, 42, 0.75)',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '50%',
                          width: '44px',
                          height: '44px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                        }}
                      >
                        <ChevronRight size={26} />
                      </button>

                      {/* Image Counter Badge */}
                      <span 
                        style={{
                          position: 'absolute',
                          bottom: '1rem',
                          right: '1rem',
                          background: 'rgba(15, 23, 42, 0.8)',
                          backdropFilter: 'blur(4px)',
                          color: '#ffffff',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        {activeImageIndex + 1} / {modalImages.length}
                      </span>
                    </>
                  )}
                </div>
              )}

              {/* Thumbnail Strip (if more than 1 image) */}
              {modalImages.length > 1 && (
                <div 
                  style={{
                    display: 'flex',
                    gap: '0.75rem',
                    padding: '0.85rem 2.5rem',
                    background: '#f8fafc',
                    borderBottom: '1px solid #e2e8f0',
                    overflowX: 'auto'
                  }}
                >
                  {modalImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className="project-thumb-btn"
                      style={{
                        width: '84px',
                        height: '58px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        padding: 0,
                        border: activeImageIndex === idx ? '2px solid var(--color-primary)' : '1px solid #cbd5e1',
                        background: '#0f172a',
                        cursor: 'pointer',
                        flexShrink: 0,
                        opacity: activeImageIndex === idx ? 1 : 0.65,
                        transition: 'all 0.2s',
                        boxShadow: activeImageIndex === idx ? '0 0 0 2px rgba(22, 101, 52, 0.25)' : 'none'
                      }}
                    >
                      <img 
                        src={getImageUrl(imgUrl)} 
                        alt={`Thumbnail ${idx + 1}`} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </button>
                  ))}
                </div>
              )}
              
              {/* Project Text Info */}
              <div style={{ padding: '2.5rem' }}>
                <span 
                  style={{ 
                    background: 'var(--color-primary)', 
                    color: 'white', 
                    padding: '0.4rem 1rem', 
                    borderRadius: '20px', 
                    fontSize: '0.8rem', 
                    fontWeight: '700', 
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  {selectedProject.category}
                </span>
                
                <h2 style={{ fontSize: '2.2rem', margin: '1rem 0 0.5rem', color: '#0f172a', fontWeight: 800 }}>
                  {selectedProject.title}
                </h2>
                <p style={{ fontSize: '1.05rem', color: '#64748b', marginBottom: '1.75rem', fontWeight: '500' }}>
                  {selectedProject.location} &bull; {selectedProject.year}
                </p>

                {selectedProject.description ? (
                  <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7', color: '#334155', fontSize: '1.05rem', marginBottom: '2rem' }}>
                    {selectedProject.description}
                  </div>
                ) : (
                  <p style={{ color: '#94a3b8', fontStyle: 'italic', marginBottom: '2rem' }}>No detailed description provided for this project.</p>
                )}

                {/* Optional Feature Video */}
                {selectedProject.videoUrl && (
                  <div style={{ marginTop: '2rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Play size={18} color="var(--color-primary)" /> Project Video Tour
                    </h4>
                    <video 
                      src={getImageUrl(selectedProject.videoUrl)} 
                      controls 
                      style={{ width: '100%', maxHeight: '420px', borderRadius: '12px', background: '#000' }} 
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
};

export default LandmarksSection;
