import React, { useState, useEffect, useMemo } from 'react';
import { Search, Play, ArrowRight, X, Calendar, User, Film, Image as ImageIcon } from 'lucide-react';
import Footer from '../components/Footer';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Parallax scroll hook mirroring the exact Home page behavior
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/blogs`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
        setError('Failed to load perspectives. Please try again later.');
        setLoading(false);
      });
  }, []);

  const filteredBlogs = useMemo(() => {
    if (!searchQuery.trim()) return blogs;
    const query = searchQuery.toLowerCase();
    return blogs.filter(b =>
      b.title?.toLowerCase().includes(query) ||
      b.author?.toLowerCase().includes(query) ||
      b.content?.toLowerCase().includes(query)
    );
  }, [blogs, searchQuery]);

  const featuredBlog = useMemo(() => {
    return filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  }, [filteredBlogs]);

  const regularBlogs = useMemo(() => {
    return filteredBlogs.length > 1 ? filteredBlogs.slice(1) : [];
  }, [filteredBlogs]);

  return (
    <div className="blog-page">
      {/* Hero Header */}
      <div className="blog-hero">
        <div className="blog-hero-content">
          <span style={{ fontSize: '0.85rem', fontWeight: '700', letterSpacing: '2px', color: 'var(--color-primary)', textTransform: 'uppercase' }}>
            NTD BUILD & DESIGN SOLUTIONS Editorial
          </span>
          <h1 style={{ marginTop: '0.5rem' }}>Architectural Perspectives</h1>
          <p>Explore our deep-dive articles, project documentaries, visual showcases, and industry insights.</p>
        </div>
      </div>

      {/* Interactive Search Bar */}
      <div className="blog-search-container">
        <div className="blog-search-box">
          <Search size={20} color="#64748b" style={{ marginRight: '0.5rem' }} />
          <input
            type="text"
            className="blog-search-input"
            placeholder="Search articles by topic, author, or keyword..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '0.25rem' }}
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <section className="section" style={{ paddingTop: '0' }}>
        {loading && <div className="loading-state">Loading perspectives...</div>}
        {error && <div className="error-state">{error}</div>}

        {!loading && !error && filteredBlogs.length === 0 && (
          <div className="empty-state">
            <h2>No matching perspectives found</h2>
            <p>Try refining your search query or check back later for new articles!</p>
          </div>
        )}


    </section>

        {/* Featured Cinematic Banner for Latest/Top Article */ }
  {
    !loading && !error && featuredBlog && (
      <div
        className="blog-featured-card"
        onClick={() => setSelectedArticle(featuredBlog)}
      >
        <div
          className="blog-featured-media"
          style={{
            backgroundImage: featuredBlog.imageUrl ? `url(${featuredBlog.imageUrl})` : undefined
          }}
        >
          {featuredBlog.videoUrl && (
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(225, 29, 72, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 25px rgba(225, 29, 72, 0.4)',
              border: '2px solid white'
            }}>
              <Play size={28} color="white" fill="white" style={{ marginLeft: '3px' }} />
            </div>
          )}
        </div>

        <div className="blog-featured-content">
          <span className={`blog-badge ${featuredBlog.videoUrl ? 'blog-badge-video' : ''}`}>
            {featuredBlog.videoUrl ? '★ Featured Documentary Video' : '★ Featured Perspective'}
          </span>
          <h2>{featuredBlog.title}</h2>
          <p>
            {featuredBlog.content.substring(0, 180)}
            {featuredBlog.content.length > 180 ? '...' : ''}
          </p>
          <div className="blog-meta-row">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <User size={14} /> By <strong>{featuredBlog.author}</strong>
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Calendar size={14} /> {new Date(featuredBlog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="blog-read-more" style={{ marginLeft: 'auto' }}>
              Read Article <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </div>
    )
  }

  {/* Grid of Remaining Articles */ }
  {
    !loading && !error && regularBlogs.length > 0 && (
      <div className="blog-grid" style={{ paddingTop: '1rem' }}>
        {regularBlogs.map(blog => (
              <div 
                className="blog-card" 
                key={blog.id}
                onClick={() => setSelectedArticle(blog)}
                style={{cursor: 'pointer'}}
              >
                <div className="blog-card-img-wrapper">
                  {/* Media Indicator Badge */}
                  {blog.videoUrl ? (
                    <div className="blog-card-media-badge" style={{background: '#be123c'}}>
                      <Film size={12} /> VIDEO
                    </div>
                  ) : blog.imageUrl ? (
                    <div className="blog-card-media-badge">
                      <ImageIcon size={12} /> IMAGE
                    </div>
                  ) : null}

                  <div 
                    className="blog-card-img" 
                    style={{ backgroundImage: blog.imageUrl ? `url(${blog.imageUrl})` : undefined }}
                  />
                </div>

                <div className="blog-card-content">
                  <span className="blog-date">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  <h3>{blog.title}</h3>
                  <p>{blog.content.substring(0, 110)}{blog.content.length > 110 ? '...' : ''}</p>
                  
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem'}}>
                    {blog.author && <span className="blog-author">By {blog.author}</span>}
                    <span className="blog-read-more" style={{marginTop: 0}}>
                      Read <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
        ))}
      </div>
    )
  }

  {/* Full Article & Video Modal Reader */ }
{
  selectedArticle && (
    <div className="blog-modal-backdrop" onClick={() => setSelectedArticle(null)}>
      <div className="blog-modal-dialog" onClick={e => e.stopPropagation()}>
        <button className="blog-modal-close" onClick={() => setSelectedArticle(null)} title="Close Article">
          <X size={22} />
        </button>

        <div className="blog-modal-header">
          <span className={`blog-badge ${selectedArticle.videoUrl ? 'blog-badge-video' : ''}`}>
            {selectedArticle.videoUrl ? 'Architectural Video Showcase' : 'Editorial Perspective'}
          </span>
          <h1>{selectedArticle.title}</h1>
          <div className="blog-meta-row" style={{ fontSize: '0.95rem' }}>
            <span>By <strong style={{ color: 'var(--color-dark)' }}>{selectedArticle.author}</strong></span>
            <span>•</span>
            <span>{new Date(selectedArticle.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>

        {/* Render Embedded Video OR Image Banner */}
        <div className="blog-modal-media-section">
          {selectedArticle.videoUrl && (
            <div style={{ marginBottom: selectedArticle.imageUrl ? '1.5rem' : '0' }}>
              <video
                src={selectedArticle.videoUrl}
                controls
                autoPlay
                className="blog-modal-video-player"
                poster={selectedArticle.imageUrl || undefined}
              />
            </div>
          )}
          {selectedArticle.imageUrl && !selectedArticle.videoUrl && (
            <div
              className="blog-modal-img-banner"
              style={{ backgroundImage: `url(${selectedArticle.imageUrl})` }}
            />
          )}
        </div>

        <div className="blog-modal-body">
          {selectedArticle.content}
        </div>

        <div style={{ padding: '0 3rem 3rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            className="btn btn-dark"
            onClick={() => setSelectedArticle(null)}
            style={{ padding: '0.75rem 2rem' }}
          >
            Close Perspective
          </button>
        </div>
      </div>
    </div>
  )
}
<Footer />
    </div >
  );
};

export default Blog;