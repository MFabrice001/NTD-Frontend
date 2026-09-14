import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/services`)
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch services", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-container">
      <div className="faq-hero" style={{paddingBottom: '2rem'}}>
        <span style={{fontSize: '0.85rem', fontWeight: '700', letterSpacing: '2px', color: 'var(--color-primary)', textTransform: 'uppercase'}}>
          What We Do
        </span>
        <h1 style={{marginTop: '0.5rem'}}>Our Services</h1>
        <p>
          We provide end-to-end engineering, architectural design, and construction management solutions.
        </p>
      </div>
      
      <div style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 2rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>Loading services...</div>
        ) : services.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No services available at the moment.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {services.map(service => (
              <div key={service.id} style={{ background: '#f8fafc', padding: '2.5rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ color: 'var(--color-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>{service.title}</h3>
                <p style={{ color: '#475569', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{service.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Services;
