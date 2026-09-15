import React, { useRef, useState, useEffect } from 'react';
import defaultImg from '../images/co image.jpg';

const ExcellenceSection = () => {
  const scrollContainerRef = useRef(null);
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/services`)
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data)) {
          const mapped = data.map(srv => ({
            id: srv.id,
            title: srv.title,
            description: srv.description,
            image: srv.icon || defaultImg
          }));
          setServicesData(mapped);
        }
      })
      .catch(err => console.error("Failed to fetch services:", err));
  }, []);

  return (
    <section style={{ padding: '4rem 5%', backgroundColor: '#1E293B', overflow: 'hidden' }}>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h2 style={{
          color: 'var(--color-primary)',
          fontSize: '1.5rem',
          fontWeight: '900',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          margin: 0
        }}>
          OUR SERVICES
        </h2>
        <p style={{ fontSize: '1.2rem', marginTop: '0.5rem', color: '#FFFFFF', fontWeight: '400', letterSpacing: '1px' }}>
          What We Do
        </p>
      </div>

      {/* CSS for Hover Animations */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { 
          display: none; 
        }
        .service-card {
          position: relative;
          min-width: 400px;
          height: 380px;
          scroll-snap-align: start;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
        }
        .service-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .service-card:hover img {
          transform: scale(1.08);
        }
        .service-card-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 70%;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          text-align: center;
          padding: 2rem;
          color: white;
          transition: transform 0.4s ease, opacity 0.4s ease;
        }
        .service-card-desc {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.4s ease, transform 0.4s ease;
          max-height: 0;
        }
        .service-card:hover .service-card-desc {
          opacity: 1;
          transform: translateY(0);
          max-height: 100px;
          margin-top: 0.5rem;
        }
      `}</style>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollContainerRef}
        style={{
          display: 'flex',
          gap: '2rem',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none', // hide scrollbar Firefox
          msOverflowStyle: 'none' // hide scrollbar IE
        }}
        className="hide-scrollbar"
      >
        {servicesData.map(service => (
          <div key={service.id} className="service-card">
            <img src={service.image} alt={service.title} />
            <div className="service-card-overlay">
              <h3 style={{ color: 'var(--color-primary)', fontSize: '1.5rem', fontWeight: '800', textTransform: 'uppercase', margin: 0, textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
                {service.title}
              </h3>
              <p className="service-card-desc" style={{ color: '#E2E8F0', fontSize: '1rem', lineHeight: '1.5', margin: 0 }}>
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExcellenceSection;
