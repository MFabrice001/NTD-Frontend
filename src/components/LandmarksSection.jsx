import React, { useState, useEffect } from 'react';

const LandmarksSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All Projects');

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
    <section className="section">
      <div className="section-header">
        <h2>Impactful Landmarks</h2>
        <p>A selection of our most recent structural achievements.</p>
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
        <div className="grid-3">
          {filteredProjects.map(project => (
            <div className="card" key={project.id}>
              <div style={{position: 'relative'}}>
                <span className="landmark-tag" style={{
                  background: project.category?.toLowerCase() === 'residential' ? 'var(--color-blue)' : 
                             project.category?.toLowerCase() === 'civil works' ? 'var(--color-dark)' : 'var(--color-primary)', 
                  color: 'white'
                }}>
                  {project.category?.toUpperCase() || 'PROJECT'}
                </span>
                <img 
                  src={project.imageUrl || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'} 
                  alt={project.title} 
                  className="card-img" 
                  style={{height: '350px'}} 
                />
              </div>
              <div className="card-body">
                <h3 className="card-title">{project.title}</h3>
                <p className="card-text">{project.location} • {project.year}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default LandmarksSection;
