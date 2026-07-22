import React, { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';

const Blog = () => {
  const bgRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Parallax scroll hook mirroring the exact Home page behavior
  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const scrolled = window.scrollY;
        bgRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['All', 'Infrastructure', 'Architecture', 'Engineering Tech', 'Sustainability'];

  const blogPosts = [
    {
      id: 1,
      title: 'Reshaping the Kigali Skyline: The Future of High-Rise Architecture',
      category: 'Architecture',
      date: 'July 18, 2026',
      readTime: '5 min read',
      excerpt: 'An in-depth look into the architectural trends and engineering milestones guiding sustainable commercial towers in modern Rwanda.',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop',
      featured: true
    },
    {
      id: 2,
      title: 'Precision-Engineered Concrete: Adapting to Changing Terrains',
      category: 'Infrastructure',
      date: 'June 29, 2026',
      readTime: '8 min read',
      excerpt: 'How our structural teams deploy advanced soil stabilization methodologies across rolling landscapes to secure foundations.',
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7eed?q=80&w=600&auto=format&fit=crop',
      featured: false
    },
    {
      id: 3,
      title: 'Green Materials: Scaling Sustainable Solutions Nationwide',
      category: 'Sustainability',
      date: 'May 14, 2026',
      readTime: '6 min read',
      excerpt: 'Integrating carbon-neutral production, optimized microclimates, and locally sourced materials into civic frameworks.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop',
      featured: false
    },
    {
      id: 4,
      title: 'Digital Twins & IoT: Smart Systems in Structural Health Monitoring',
      category: 'Engineering Tech',
      date: 'April 02, 2026',
      readTime: '10 min read',
      excerpt: 'Deploying real-time network sensors across smart infrastructure grids to run predictive maintenance and long-term strain evaluation.',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=600&auto=format&fit=crop',
      featured: false
    }
  ];

  // Combined interactive search & category filtering logic preserving integrity
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured || selectedCategory !== 'All' || searchQuery !== '');

  return (
    <div className="blog-page" style={{ backgroundColor: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* =========================================================
          1. HERO HEADER SECTION (Wavy shape divider, new search input)
         ========================================================= */}
      <section className="hero" style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#0f172a', padding: '10rem 2rem 8rem 2rem', color: 'white', textAlign: 'center' }}>
        <div className="hero-bg" ref={bgRef} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(to bottom right, #1e1b4b, #0f172a)', backgroundSize: 'cover', zIndex: 1 }}></div>
        <div className="hero-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', zIndex: 2 }}></div>
        
        <div className="hero-container" style={{ position: 'relative', zIndex: 3, maxWidth: '800px', margin: '0 auto' }}>
          <div className="hero-content">
            <h1 className="hero-title" style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
              <span style={{ display: 'block', color: '#94a3b8', fontSize: '1rem', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Knowledge Base</span>
              <span>ENGINEERING</span>{' '}
              <span className="highlight" style={{ color: '#f59e0b' }}>PERSPECTIVES</span>{' '}
              <span>& INSIGHTS</span>
            </h1>
            <p className="hero-subtitle" style={{ fontSize: '1.1rem', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '2.5rem', maxWidth: '650px', margin: '0 auto 2.5rem auto' }}>
              Stay updated with our latest thoughts on architectural breakthroughs, infrastructure strategies, and sustainable developments shaping the continent.
            </p>

            {/* Interactive Search Integration Box inside the Header Banner */}
            <div style={{ maxWidth: '500px', margin: '0 auto', position: 'relative' }}>
              <input 
                type="text"
                placeholder="Search technical articles, case studies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '1rem 1.5rem', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '0.95rem', backdropFilter: 'blur(8px)', outline: 'none', transition: 'all 0.3s' }}
              />
            </div>
          </div>
        </div>
        
        {/* Wavy SVG shape divider matching Home layout perfectly */}
        <div className="wave-container" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', overflow: 'hidden', lineHeight: 0, zIndex: 4 }}>
          <svg className="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" aria-hidden="true" style={{ width: '100%', height: '40px' }}>
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className="wave1"><use href="#gentle-wave" x="48" y="0" fill="rgba(248,250,252,0.05)" /></g>
            <g className="wave2"><use href="#gentle-wave" x="48" y="3" fill="rgba(248,250,252,0.1)" /></g>
            <g className="wave3"><use href="#gentle-wave" x="48" y="5" fill="rgba(248,250,252,0.2)" /></g>
            <g className="wave4"><use href="#gentle-wave" x="48" y="7" fill="#f8fafc" /></g>
          </svg>
        </div>
      </section>

      {/* =========================================================
          2. CATEGORY FILTER CONTROLS
         ========================================================= */}
      <section className="category-filter-section" style={{ padding: '3rem 2rem 1rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '0.6rem 1.5rem',
                  fontSize: '0.8rem',
                  letterSpacing: '0.05em',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  border: isActive ? '1px solid #1e1b4b' : '1px solid #cbd5e1',
                  backgroundColor: isActive ? '#1e1b4b' : 'transparent',
                  color: isActive ? '#ffffff' : '#475569',
                  transition: 'all 0.2s ease'
                }}
              >
                {category.toUpperCase()}
              </button>
            );
          })}
        </div>
      </section>

      {/* =========================================================
          3. FEATURED POST (Preserved conditional structure)
         ========================================================= */}
      {selectedCategory === 'All' && searchQuery === '' && featuredPost && (
        <section className="featured-post-section" style={{ padding: '3rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center', backgroundColor: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(15,23,42,0.03)', border: '1px solid #e2e8f0' }}>
            <div style={{ borderRadius: '12px', overflow: 'hidden', height: '380px' }}>
              <img src={featuredPost.image} alt={featuredPost.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <span style={{ color: '#f59e0b', fontWeight: '700', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                FEATURED RELEASE • {featuredPost.category}
              </span>
              <h2 style={{ fontSize: '2rem', margin: '0.5rem 0 1rem 0', lineHeight: '1.2', fontWeight: '800', color: '#0f172a' }}>{featuredPost.title}</h2>
              <p style={{ color: '#475569', lineHeight: '1.6', marginBottom: '1.5rem', fontSize: '1rem' }}>{featuredPost.excerpt}</p>
              <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', color: '#64748b', marginBottom: '2rem' }}>
                <span>{featuredPost.date}</span>
                <span>•</span>
                <span>{featuredPost.readTime}</span>
              </div>
              <button style={{ padding: '0.75rem 1.5rem', backgroundColor: '#1e1b4b', color: 'white', border: 'none', fontWeight: '600', borderRadius: '4px', cursor: 'pointer', letterSpacing: '0.05em' }}>
                READ ARTICLE &rarr;
              </button>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          4. BLOG ARTICLES GRID CONTAINER
         ========================================================= */}
      <section className="blog-grid-section" style={{ padding: '2rem 2rem 6rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
              {selectedCategory === 'All' ? 'All Publications' : `Category: ${selectedCategory}`} 
              {searchQuery && ` matching "${searchQuery}"`}
            </h2>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>{filteredPosts.length} Articles found</span>
          </div>
          
          {filteredPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 2rem', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <p style={{ color: '#64748b', margin: 0, fontSize: '1.05rem' }}>No articles match your criteria. Try adjustments to your selection filters.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2.5rem' }}>
              {regularPosts.map((post) => (
                <article key={post.id} style={{ display: 'flex', flexDirection: 'column', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01), 0 2px 4px -1px rgba(0,0,0,0.01)', border: '1px solid #e2e8f0', backgroundColor: '#fff', transition: 'transform 0.2s' }}>
                  <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                    <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: '1rem', left: '1rem', backgroundColor: '#ffffff', color: '#0f172a', padding: '0.3rem 0.8rem', fontSize: '0.7rem', fontWeight: '700', borderRadius: '4px', letterSpacing: '0.05em', textTransform: 'uppercase', boxShadow: '0 4px 6px rgba(15,23,42,0.08)' }}>
                      {post.category}
                    </span>
                  </div>
                  <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#64748b', marginBottom: '0.75rem', fontWeight: '500' }}>
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 style={{ fontSize: '1.2rem', margin: '0 0 0.75rem 0', fontWeight: '700', lineHeight: '1.4', color: '#0f172a' }}>{post.title}</h3>
                    <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.75rem', flexGrow: 1 }}>{post.excerpt}</p>
                    <button style={{ alignSelf: 'flex-start', padding: '0.5rem 1.2rem', fontSize: '0.8rem', fontWeight: '600', backgroundColor: 'transparent', border: '1px solid #cbd5e1', color: '#475569', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s' }}>
                      READ ARTICLE
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          5. SITE FOOTER INTEGRATION
         ========================================================= */}
      <Footer />
    </div>
  );
};

export default Blog;