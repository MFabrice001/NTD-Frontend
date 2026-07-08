import React from 'react';
import { Building2, Home, Map, PenTool } from 'lucide-react';

const ExcellenceSection = () => {
  return (
    <section className="section section-bg-light">
      <div className="section-header" style={{textAlign: 'center', margin: '0 auto 3rem'}}>
        <h2>Engineering Excellence</h2>
        <p>Comprehensive construction services tailored for large-scale urban growth and private sector innovation.</p>
      </div>
      <div className="bento-grid">
        <div className="bento-card">
          <div className="bento-icon-wrapper"><Building2 size={28} /></div>
          <h3>Commercial Construction</h3>
          <p>High-rise office complexes and retail hubs designed for maximum utility and modern aesthetics in Kigali's CBD.</p>
        </div>
        <div className="bento-card blue">
          <div className="bento-icon-wrapper"><Home size={28} /></div>
          <h3>Residential Projects</h3>
          <p>Luxury housing developments and sustainable residential communities built with local materials.</p>
        </div>
        <div className="bento-card">
          <div className="bento-icon-wrapper"><Map size={28} /></div>
          <h3>Road & Civil Works</h3>
          <p>Crucial transportation infrastructure connecting Rwanda through high-quality paving and bridge engineering.</p>
        </div>
        <div className="bento-card dark">
          <div>
            <div className="bento-icon-wrapper dark-icon"><PenTool size={28} /></div>
            <h3>Project Management & Consulting</h3>
            <p style={{maxWidth: '400px', marginTop: '0.5rem'}}>End-to-end oversight ensuring on-time delivery, cost efficiency, and strict adherence to technical specifications.</p>
          </div>
          <div style={{textAlign: 'right'}}>
            <h2 style={{color: 'var(--color-primary)', fontSize: '3rem'}}>99.8%</h2>
            <p style={{fontSize: '0.8rem', letterSpacing: '1px'}}>ACCURACY RATING</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExcellenceSection;
