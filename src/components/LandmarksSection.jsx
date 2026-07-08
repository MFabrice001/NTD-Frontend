import React from 'react';

const LandmarksSection = () => {
  return (
    <section className="section">
      <div className="section-header">
        <h2>Impactful Landmarks</h2>
        <p>A selection of our most recent structural achievements.</p>
      </div>
      <div className="filter-tabs">
        <button className="filter-btn active">All Projects</button>
        <button className="filter-btn">Urban Developments</button>
      </div>
      <div className="grid-3">
        <div className="card">
          <div style={{position: 'relative'}}>
            <span className="landmark-tag">COMMERCIAL</span>
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" alt="Kigali Office Complex" className="card-img" style={{height: '350px'}} />
          </div>
          <div className="card-body">
            <h3 className="card-title">Kigali Office Complex</h3>
            <p className="card-text">Nyarugenge District • 2023</p>
          </div>
        </div>
        <div className="card">
          <div style={{position: 'relative'}}>
            <span className="landmark-tag" style={{background: 'var(--color-blue)', color: 'white'}}>RESIDENTIAL</span>
            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop" alt="Kimihurura Residences" className="card-img" style={{height: '350px'}} />
          </div>
          <div className="card-body">
            <h3 className="card-title">Kimihurura Residences</h3>
            <p className="card-text">Kimihurura District • 2022</p>
          </div>
        </div>
        <div className="card">
          <div style={{position: 'relative'}}>
            <span className="landmark-tag" style={{background: 'var(--color-dark)', color: 'white'}}>CIVIL WORKS</span>
            <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop" alt="KK 15 Road Expansion" className="card-img" style={{height: '350px'}} />
          </div>
          <div className="card-body">
            <h3 className="card-title">KK 15 Road Expansion</h3>
            <p className="card-text">Kicukiro District • 2024</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandmarksSection;
