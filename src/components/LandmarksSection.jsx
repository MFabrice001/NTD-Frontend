import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getImageUrl, getFallbackImage } from '../utils/imageUrl';
import { Images, ChevronLeft, ChevronRight, Play } from 'lucide-react';

const LandmarksSection = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All Projects');
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

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
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
                  onClick={() => handleProjectClick(project.id)}
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
    </section>
  );
};

export default LandmarksSection;
