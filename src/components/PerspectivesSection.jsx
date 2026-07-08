import React from 'react';

const PerspectivesSection = () => {
  return (
    <section className="section">
      <div className="news-header">
        <h2 style={{fontSize: '2.5rem', fontWeight: 800}}>Latest Perspectives</h2>
        <a href="/news" style={{color: 'var(--color-blue)', fontWeight: 600}}>View All News ↗</a>
      </div>
      <div className="grid-3">
        <div className="card" style={{boxShadow: 'none', background: 'transparent'}}>
          <img src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=800&auto=format&fit=crop" alt="Concrete" className="card-img" style={{borderRadius: '16px'}} />
          <div className="card-body" style={{padding: '1.5rem 0'}}>
            <span className="date-tag">October 14, 2024</span>
            <h3 className="card-title">Sustainable Concrete: The Future of Kigali's Urban Growth</h3>
            <p className="card-text">How NTD Build & Design Solutions is integrating eco-friendly concrete solutions in our latest commercial projects to...</p>
          </div>
        </div>
        <div className="card" style={{boxShadow: 'none', background: 'transparent'}}>
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" alt="Smart Cities" className="card-img" style={{borderRadius: '16px'}} />
          <div className="card-body" style={{padding: '1.5rem 0'}}>
            <span className="date-tag">September 28, 2024</span>
            <h3 className="card-title">NTD Completes Phase 1 of Vision City Infrastructure</h3>
            <p className="card-text">A milestone achievement in civil works, providing state-of-the-art road networks for th...</p>
          </div>
        </div>
        <div className="card" style={{boxShadow: 'none', background: 'transparent'}}>
          <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop" alt="Digital Twins" className="card-img" style={{borderRadius: '16px'}} />
          <div className="card-body" style={{padding: '1.5rem 0'}}>
            <span className="date-tag">August 12, 2024</span>
            <h3 className="card-title">Digital Twins: Transforming Our On-Site Precision</h3>
            <p className="card-text">Exploring how BIM and digital twin technology are reducing construction waste by 26% on ou...</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerspectivesSection;
