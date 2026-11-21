import React, { useState, useEffect } from 'react';
import { getImageUrl, getFallbackImage } from '../utils/imageUrl';
import { X, Images, ChevronLeft, ChevronRight, Play, ArrowRight, Calendar, MapPin, Tag } from 'lucide-react';

const LandmarksSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All Projects');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

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

  // Filter projects by category
  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'All Projects') return true;
    return project.category === activeFilter;
  });

  // Collect unique categories for tabs
  const categories = ['All Projects', ...new Set(projects.map(p => p.category).filter(Boolean))];

  // Pagination for the 3-column view (3 items per page)
  const pageSize = 3;
  const totalPages = Math.ceil(filteredProjects.length / pageSize) || 1;
  const safePageIndex = pageIndex >= totalPages ? 0 : pageIndex;

  const displayedProjects = showAll 
    ? filteredProjects 
    : filteredProjects.slice(safePageIndex * pageSize, safePageIndex * pageSize + pageSize);

  const handlePrevPage = () => {
    setShowAll(false);
    setPageIndex(prev => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNextPage = () => {
    setShowAll(false);
    setPageIndex(prev => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
  };

  return (
    <section 
      id="landmarks" 
      style={{ 
        backgroundColor: '#FFFFFF', 
        padding: '5rem 6%', 
        color: '#0F172A',
        fontFamily: 'var(--font-body, system-ui, sans-serif)'
      }}
    >
      <style>{`
        .landmarks-wrapper {
          max-width: 1240px;
          margin: 0 auto;
        }
        .landmarks-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .landmarks-title {
          font-size: 2.2rem;
          font-weight: 800;
          color: #0F172A;
          margin: 0;
          letter-spacing: -0.02em;
          text-transform: capitalize;
        }
        .carousel-arrows {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .carousel-arrow-btn {
          width: 38px;
          height: 38px;
          border: 1px solid #D1D5DB;
          background: #FFFFFF;
          color: #1F2937;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .carousel-arrow-btn:hover {
          background: #F3F4F6;
          border-color: #9CA3AF;
        }
        .landmarks-filter-tabs {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 2.25rem;
        }
        .landmark-filter-pill {
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.82rem;
          font-weight: 600;
          border: 1px solid #E2E8F0;
          background: #F8FAFC;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s;
        }
        .landmark-filter-pill.active {
          background: #0284C7;
          color: #FFFFFF;
          border-color: #0284C7;
        }
        .landmarks-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 2.25rem;
        }
        @media (max-width: 1024px) {
          .landmarks-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 640px) {
          .landmarks-grid {
            grid-template-columns: 1fr;
          }
          .landmarks-title {
            font-size: 1.75rem;
          }
        }
        .project-card {
          display: flex;
          flex-direction: column;
          cursor: pointer;
          background: #FFFFFF;
          transition: transform 0.25s ease;
        }
        .project-card:hover {
          transform: translateY(-4px);
        }
        .project-card-image-box {
          position: relative;
          width: 100%;
          height: 220px;
          overflow: hidden;
          background: #E2E8F0;
          border-radius: 2px;
        }
        .project-card-image-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
          display: block;
        }
        .project-card:hover .project-card-image-box img {
          transform: scale(1.05);
        }
        .project-card-body {
          padding-top: 1.15rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .project-card-title {
          font-size: 1.02rem;
          font-weight: 800;
          text-transform: uppercase;
          color: #0F172A;
          line-height: 1.35;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.01em;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 2.7rem;
        }
        .project-card-meta {
          font-size: 0.83rem;
          color: #64748B;
          margin: 0 0 0.75rem 0;
          font-weight: 400;
        }
        .project-card-desc {
          font-size: 0.9rem;
          color: #475569;
          line-height: 1.6;
          margin: 0 0 1.25rem 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex-grow: 1;
        }
        .project-card-readmore {
          font-size: 0.93rem;
          font-weight: 700;
          color: #0F172A;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          margin-top: auto;
          transition: color 0.2s ease, gap 0.2s ease;
        }
        .project-card:hover .project-card-readmore {
          color: #0284C7;
          gap: 0.65rem;
        }
        .more-projects-btn {
          background-color: #0284C7;
          color: #FFFFFF;
          font-size: 0.95rem;
          font-weight: 600;
          padding: 12px 36px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.1s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .more-projects-btn:hover {
          background-color: #0369A1;
        }
        .more-projects-btn:active {
          transform: scale(0.98);
        }
        .project-modal-thumb:hover {
          opacity: 1 !important;
          transform: translateY(-2px);
        }
      `}</style>

      <div className="landmarks-wrapper">
        {/* Top Section Header with Title on Left and < > Controls on Right */}
        <div className="landmarks-header-row">
          <div>
            <h2 className="landmarks-title">Impactful Landmarks</h2>
          </div>
          {filteredProjects.length > pageSize && (
            <div className="carousel-arrows">
              <button 
                onClick={handlePrevPage} 
                className="carousel-arrow-btn" 
                title="Previous Projects"
                aria-label="Previous Projects"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={handleNextPage} 
                className="carousel-arrow-btn" 
                title="Next Projects"
                aria-label="Next Projects"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Category Filter Pills (if multiple categories available) */}
        {categories.length > 1 && (
          <div className="landmarks-filter-tabs">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`landmark-filter-pill ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => {
                  setActiveFilter(cat);
                  setPageIndex(0);
                  setShowAll(false);
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Projects 3-Column Card Grid (Matching Screenshot 2) */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#64748B' }}>
            Loading projects...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#64748B' }}>
            No projects available in this category.
          </div>
        ) : (
          <div className="landmarks-grid">
            {displayedProjects.map(project => {
              const projectImages = project.imageUrls && project.imageUrls.length > 0
                ? project.imageUrls
                : (project.imageUrl ? [project.imageUrl] : []);

              const coverSrc = projectImages.length > 0 
                ? getImageUrl(projectImages[0])
                : getFallbackImage();

              // Clean format date/location metadata matching Screenshot 2
              const metaString = [
                project.year || '2025',
                project.location || 'Kigali, Rwanda',
                project.category || 'Architecture'
              ].filter(Boolean).join(' • ');

              return (
                <div 
                  key={project.id} 
                  className="project-card" 
                  onClick={() => openProjectModal(project)}
                >
                  {/* Landscape Image Box */}
                  <div className="project-card-image-box">
                    <img 
                      src={coverSrc} 
                      alt={project.title} 
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = getFallbackImage();
                      }}
                    />

                    {/* Multi-Image Badge */}
                    {projectImages.length > 1 && (
                      <span 
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '10px',
                          background: 'rgba(15, 23, 42, 0.85)',
                          backdropFilter: 'blur(4px)',
                          color: '#FFFFFF',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        <Images size={12} color="#38BDF8" /> {projectImages.length} Photos
                      </span>
                    )}

                    {/* Video Tour Badge */}
                    {project.videoUrl && (
                      <span 
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          background: 'rgba(15, 23, 42, 0.85)',
                          backdropFilter: 'blur(4px)',
                          color: '#FFFFFF',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        <Play size={10} fill="#ffffff" /> Video
                      </span>
                    )}
                  </div>

                  {/* Project Details Content */}
                  <div className="project-card-body">
                    <h3 className="project-card-title">
                      {project.title}
                    </h3>
                    <p className="project-card-meta">
                      {metaString}
                    </p>
                    <p className="project-card-desc">
                      {project.description || 'Comprehensive structural details, scope of work, and project highlights.'}
                    </p>
                    <div className="project-card-readmore">
                      Read more &rarr;
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Centered "More Projects" Button Matching Screenshot 2 */}
        {filteredProjects.length > pageSize && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3.5rem' }}>
            <button 
              className="more-projects-btn"
              onClick={() => {
                if (showAll) {
                  setShowAll(false);
                } else {
                  setShowAll(true);
                }
              }}
            >
              {showAll ? 'Show Less' : 'More Projects'}
            </button>
          </div>
        )}
      </div>

      {/* Full Interactive Project Modal (Displays Multi-Image Gallery + Description) */}
      {selectedProject && (() => {
        const modalImages = selectedProject.imageUrls && selectedProject.imageUrls.length > 0
          ? selectedProject.imageUrls
          : (selectedProject.imageUrl ? [selectedProject.imageUrl] : []);

        const activeImgSrc = modalImages.length > 0 
          ? getImageUrl(modalImages[activeImageIndex]) 
          : getFallbackImage();

        return (
          <div 
            onClick={() => setSelectedProject(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(5px)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.25rem'
            }}
          >
            <div 
              onClick={e => e.stopPropagation()}
              style={{
                background: '#FFFFFF',
                borderRadius: '12px',
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
                title="Close"
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(15, 23, 42, 0.75)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 30,
                  transition: 'background 0.2s'
                }}
              >
                <X size={20} />
              </button>

              {/* Main Image Viewer */}
              <div 
                style={{ 
                  position: 'relative', 
                  width: '100%', 
                  height: '460px', 
                  background: '#090D16', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}
              >
                <img 
                  src={activeImgSrc} 
                  alt={`${selectedProject.title} ${activeImageIndex + 1}`} 
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = getFallbackImage();
                  }}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />

                {/* Left/Right Carousel Controls if multiple images */}
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
                        background: 'rgba(15, 23, 42, 0.8)',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '50%',
                        width: '42px',
                        height: '42px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                        transition: 'all 0.2s'
                      }}
                    >
                      <ChevronLeft size={24} />
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
                        background: 'rgba(15, 23, 42, 0.8)',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '50%',
                        width: '42px',
                        height: '42px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                        transition: 'all 0.2s'
                      }}
                    >
                      <ChevronRight size={24} />
                    </button>

                    {/* Image Counter Badge */}
                    <span 
                      style={{
                        position: 'absolute',
                        bottom: '1rem',
                        right: '1rem',
                        background: 'rgba(15, 23, 42, 0.85)',
                        backdropFilter: 'blur(4px)',
                        color: '#FFFFFF',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      {activeImageIndex + 1} / {modalImages.length} Photos
                    </span>
                  </>
                )}
              </div>

              {/* Thumbnail Strip (if multiple images uploaded) */}
              {modalImages.length > 1 && (
                <div 
                  style={{
                    display: 'flex',
                    gap: '0.75rem',
                    padding: '0.85rem 1.5rem',
                    background: '#F8FAFC',
                    borderBottom: '1px solid #E2E8F0',
                    overflowX: 'auto'
                  }}
                >
                  {modalImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className="project-modal-thumb"
                      style={{
                        width: '80px',
                        height: '56px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        padding: 0,
                        border: activeImageIndex === idx ? '2px solid #0284C7' : '1px solid #CBD5E1',
                        background: '#0F172A',
                        cursor: 'pointer',
                        flexShrink: 0,
                        opacity: activeImageIndex === idx ? 1 : 0.65,
                        transition: 'all 0.2s'
                      }}
                    >
                      <img 
                        src={getImageUrl(imgUrl)} 
                        alt={`Thumb ${idx + 1}`} 
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = getFallbackImage();
                        }}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Project Content Description & Information */}
              <div style={{ padding: '2rem 2.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <span 
                    style={{ 
                      background: '#0284C7', 
                      color: '#FFFFFF', 
                      padding: '4px 12px', 
                      borderRadius: '4px', 
                      fontSize: '0.75rem', 
                      fontWeight: '700', 
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {selectedProject.category || 'PROJECT'}
                  </span>
                  <span style={{ fontSize: '0.88rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={14} /> {selectedProject.location || 'Rwanda'}
                  </span>
                  <span style={{ fontSize: '0.88rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} /> {selectedProject.year || '2025'}
                  </span>
                </div>

                <h2 style={{ fontSize: '1.8rem', margin: '0 0 1rem 0', color: '#0F172A', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.3 }}>
                  {selectedProject.title}
                </h2>

                {selectedProject.description ? (
                  <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.75', color: '#334155', fontSize: '1rem', marginBottom: '1.5rem' }}>
                    {selectedProject.description}
                  </div>
                ) : (
                  <p style={{ color: '#94A3B8', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                    No detailed description provided for this project.
                  </p>
                )}

                {/* Optional Project Video Tour */}
                {selectedProject.videoUrl && (
                  <div style={{ marginTop: '1.5rem', borderTop: '1px solid #E2E8F0', paddingTop: '1.25rem' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Play size={16} color="#0284C7" /> Project Video Tour
                    </h4>
                    <video 
                      src={getImageUrl(selectedProject.videoUrl)} 
                      controls 
                      style={{ width: '100%', maxHeight: '420px', borderRadius: '8px', background: '#000000' }} 
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
