import React from 'react';
import Footer from '../components/Footer';

const Services = () => {
  return (
    <div className="page-container">
      <div className="faq-hero" style={{paddingBottom: '2rem'}}>
        <span style={{fontSize: '0.85rem', fontWeight: '700', letterSpacing: '2px', color: 'var(--color-primary)', textTransform: 'uppercase'}}>
          Partner With Us
        </span>
        <h1 style={{marginTop: '0.5rem'}}>Our Services</h1>
        <p>
          We provide end-to-end engineering, architectural design, and construction management solutions.
        </p>
      </div>
      
      <div style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 2rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div style={{ background: '#f8fafc', padding: '2.5rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ color: 'var(--color-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>Architectural Design</h3>
            <p style={{ color: '#475569', lineHeight: '1.6' }}>Our design philosophy merges cutting-edge modern aesthetics with sustainable engineering. We utilize advanced 3D rendering and BIM modeling to help you visualize your project before construction begins.</p>
          </div>
          <div style={{ background: '#f8fafc', padding: '2.5rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ color: 'var(--color-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>Turnkey Construction</h3>
            <p style={{ color: '#475569', lineHeight: '1.6' }}>We handle everything from initial soil testing and procurement to on-site construction, MEP installation, and luxury interior fit-outs. One unified contract for your entire project lifecycle.</p>
          </div>
          <div style={{ background: '#f8fafc', padding: '2.5rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ color: 'var(--color-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>Project Management</h3>
            <p style={{ color: '#475569', lineHeight: '1.6' }}>Our strict oversight prevents cost overruns and delays. We provide comprehensive Bills of Quantities (BOQ), conflict detection, and continuous site inspections to guarantee ISO quality standards.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
