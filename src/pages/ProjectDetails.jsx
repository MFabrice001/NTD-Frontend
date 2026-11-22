import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getImageUrl, getFallbackImage } from '../utils/imageUrl';
import { ChevronLeft, ChevronRight, MapPin, Calendar, ArrowLeft, Play, Tag, Images, Share2 } from 'lucide-react';
import Footer from '../components/Footer';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    // Fetch this project or find from public projects
    fetch(`${apiUrl}/api/public/projects`)
      .then(res => res.json())
      .then(all => {
        if (Array.isArray(all)) {
          const found = all.find(p => String(p.id) === String(id));
          if (found) {
            setProject(found);
            setRelatedProjects(all.filter(p => String(p.id) !== String(id)).slice(0, 3));
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching project details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF' }}>
        <p style={{ color: '#64748B', fontSize: '1.1rem' }}>Loading project details...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF', padding: '2rem' }}>
        <h2 style={{ color: '#0F172A', marginBottom: '1rem' }}>Project Not Found</h2>
        <p style={{ color: '#64748B', marginBottom: '2rem' }}>The project you are looking for does not exist or has been removed.</p>
        <button 
          onClick={() => navigate('/#landmarks')}
          style={{
            background: '#0284C7',
            color: '#FFFFFF',
            padding: '10px 24px',
            borderRadius: '4px',
            border: 'none',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          &larr; Back to Projects
        </button>
      </div>
    );
  }

  const images = project.imageUrls && project.imageUrls.length > 0 
    ? project.imageUrls 
    : (project.imageUrl ? [project.imageUrl] : []);

  const activeSrc = images.length > 0 ? getImageUrl(images[activeImageIndex]) : getFallbackImage();

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', color: '#0F172A', fontFamily: 'var(--font-body, system-ui, sans-serif)' }}>
      {/* Top Breadcrumb Navigation Bar matching Screenshot 3 */}
      <div style={{ borderBottom: '1px solid #E5E7EB', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#0284C7' }}>
              PROJECT DETAILS
            </span>
            <span style={{ color: '#D1D5DB' }}>/</span>
            <span style={{ fontSize: '0.82rem', color: '#6B7280', textTransform: 'uppercase', fontWeight: 600 }}>
              {project.category || 'STRUCTURAL'}
            </span>
          </div>

          <Link 
            to="/#landmarks"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              fontSize: '0.85rem', 
              fontWeight: 600, 
              color: '#4B5563', 
              textDecoration: 'none' 
            }}
          >
            <ArrowLeft size={16} /> All Projects
          </Link>
        </div>
      </div>

      {/* Main Content Container */}
      <article style={{ maxWidth: '1080px', margin: '0 auto', padding: '3.5rem 1.5rem 5rem' }}>
        {/* Huge Bold Title matching Screenshot 3 */}
        <h1 
          style={{ 
            fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', 
            fontWeight: 900, 
            textTransform: 'uppercase', 
            color: '#0F172A', 
            lineHeight: 1.25, 
            marginBottom: '1.25rem',
            letterSpacing: '-0.02em'
          }}
        >
          {project.title}
        </h1>

        {/* Metadata Line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '2.5rem', color: '#64748B', fontSize: '0.92rem' }}>
          {project.year && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Calendar size={15} color="#0284C7" /> {project.year}
            </span>
          )}
          {project.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <MapPin size={15} color="#0284C7" /> {project.location}
            </span>
          )}
          {project.category && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Tag size={15} color="#0284C7" /> {project.category}
            </span>
          )}
        </div>

        {/* Featured Image Viewer / Multi-Image Carousel matching Screenshot 3 */}
        <div 
          style={{ 
            position: 'relative', 
            width: '100%', 
            maxHeight: '620px', 
            height: '520px', 
            backgroundColor: '#090D16', 
            borderRadius: '8px', 
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem',
            boxShadow: '0 4px 20px -2px rgba(0,0,0,0.1)'
          }}
        >
          <img 
            src={activeSrc} 
            alt={project.title} 
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = getFallbackImage();
            }}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />

          {/* Carousel Arrows if multiple images */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => setActiveImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                aria-label="Previous photo"
                style={{
                  position: 'absolute',
                  left: '1.25rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(15, 23, 42, 0.8)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '50%',
                  width: '46px',
                  height: '46px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                }}
              >
                <ChevronLeft size={26} />
              </button>

              <button
                onClick={() => setActiveImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                aria-label="Next photo"
                style={{
                  position: 'absolute',
                  right: '1.25rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(15, 23, 42, 0.8)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '50%',
                  width: '46px',
                  height: '46px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                }}
              >
                <ChevronRight size={26} />
              </button>

              <span 
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  right: '1rem',
                  background: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(4px)',
                  color: '#FFFFFF',
                  padding: '4px 14px',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                {activeImageIndex + 1} / {images.length} Photos
              </span>
            </>
          )}
        </div>

        {/* Thumbnail Gallery (if more than 1 image) */}
        {images.length > 1 && (
          <div 
            style={{ 
              display: 'flex', 
              gap: '0.75rem', 
              overflowX: 'auto', 
              paddingBottom: '1rem',
              marginBottom: '2.5rem' 
            }}
          >
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                style={{
                  width: '95px',
                  height: '65px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  padding: 0,
                  border: activeImageIndex === idx ? '2px solid #0284C7' : '1px solid #E2E8F0',
                  background: '#0F172A',
                  cursor: 'pointer',
                  flexShrink: 0,
                  opacity: activeImageIndex === idx ? 1 : 0.65,
                  transition: 'all 0.2s'
                }}
              >
                <img 
                  src={getImageUrl(img)} 
                  alt={`Thumbnail ${idx + 1}`} 
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

        {/* Full Project Description Content */}
        <div style={{ marginTop: '2.5rem', borderTop: '1px solid #E5E7EB', paddingTop: '2.5rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
            Project Overview & Scope
          </h3>

          <div 
            style={{ 
              fontSize: '1.08rem', 
              lineHeight: '1.85', 
              color: '#334155', 
              whiteSpace: 'pre-line',
              marginBottom: '3rem'
            }}
          >
            {project.description || 'Comprehensive structural details, scope of work, and project highlights.'}
          </div>

          {/* Optional Project Video Player */}
          {project.videoUrl && (
            <div style={{ marginBottom: '3.5rem', background: '#F8FAFC', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Play size={18} color="#0284C7" /> Project Video Tour
              </h4>
              <video 
                src={getImageUrl(project.videoUrl)} 
                controls 
                style={{ width: '100%', maxHeight: '480px', borderRadius: '8px', background: '#000000' }} 
              />
            </div>
          )}

          {/* Bottom Call to Action and Back Link */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', borderTop: '1px solid #E5E7EB', paddingTop: '2rem' }}>
            <button
              onClick={() => navigate('/#landmarks')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#F1F5F9',
                color: '#1E293B',
                border: '1px solid #CBD5E1',
                padding: '10px 22px',
                borderRadius: '4px',
                fontWeight: 600,
                fontSize: '0.92rem',
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={16} /> Back to Projects
            </button>

            <button
              onClick={() => navigate('/quote')}
              style={{
                background: '#0284C7',
                color: '#FFFFFF',
                border: 'none',
                padding: '12px 28px',
                borderRadius: '4px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Request a Quote for Your Project &rarr;
            </button>
          </div>
        </div>

        {/* Related Projects Section */}
        {relatedProjects.length > 0 && (
          <div style={{ marginTop: '5rem', borderTop: '1px solid #E5E7EB', paddingTop: '3.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '2rem', textTransform: 'uppercase' }}>
              Other Impactful Landmarks
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {relatedProjects.map(rel => {
                const relImgs = rel.imageUrls && rel.imageUrls.length > 0 ? rel.imageUrls : (rel.imageUrl ? [rel.imageUrl] : []);
                const relSrc = relImgs.length > 0 ? getImageUrl(relImgs[0]) : getFallbackImage();

                return (
                  <div 
                    key={rel.id} 
                    onClick={() => navigate(`/project/${rel.id}`)}
                    style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                  >
                    <div style={{ width: '100%', height: '180px', borderRadius: '4px', overflow: 'hidden', background: '#E2E8F0', marginBottom: '0.75rem' }}>
                      <img 
                        src={relSrc} 
                        alt={rel.title}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = getFallbackImage();
                        }}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 800, textTransform: 'uppercase', color: '#0F172A', margin: '0 0 0.3rem', lineHeight: 1.35 }}>
                      {rel.title}
                    </h4>
                    <span style={{ fontSize: '0.82rem', color: '#64748B' }}>
                      {rel.location} • {rel.year}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </article>

      <Footer />
    </div>
  );
};

export default ProjectDetails;

