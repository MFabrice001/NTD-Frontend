import React from 'react';
import { Building2, ShieldCheck, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import excellenceImg from '../images/P image2.avif'; // Using local image

const ExcellenceSection = () => {
  const navigate = useNavigate();

  return (
    <section className="section" style={{ padding: '6rem 2rem', background: '#ffffff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        
        {/* Left Column */}
        <div>
          <span style={{ 
            background: 'var(--color-blue-light)', 
            color: 'var(--color-primary-dark)',
            padding: '0.4rem 1rem', 
            borderRadius: '20px', 
            fontSize: '0.85rem', 
            fontWeight: '700',
            letterSpacing: '1px'
          }}>
            Our Value Proposition
          </span>
          <h2 style={{ fontSize: '3rem', marginTop: '1.5rem', marginBottom: '1rem', lineHeight: '1.2', color: 'var(--color-dark)' }}>
            Engineering Excellence
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: '1.6' }}>
            We combine the best of African engineering talent, modern structural innovation, and proven methodologies to deliver exceptional construction solutions that drive urban growth.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
            {/* Item 1 */}
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ background: 'var(--color-blue-light)', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 size={24} color="var(--color-primary-dark)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.3rem', color: 'var(--color-dark)' }}>Commercial Construction</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', margin: 0, lineHeight: '1.5' }}>High-rise office complexes, robust retail hubs, and state-of-the-art facilities designed for maximum utility. We integrate advanced HVAC and smart-building systems to optimize operational efficiency.</p>
              </div>
            </div>
            
            {/* Item 2 */}
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ background: 'var(--color-blue-light)', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={24} color="var(--color-primary-dark)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.3rem', color: 'var(--color-dark)' }}>Quality Assurance</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', margin: 0, lineHeight: '1.5' }}>Rigorous structural testing ensuring seismic safety and multi-decade durability. We strictly adhere to ISO quality control frameworks and employ continuous site inspections at critical milestones.</p>
              </div>
            </div>

            {/* Item 3 */}
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ background: 'var(--color-blue-light)', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={24} color="var(--color-primary-dark)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.3rem', color: 'var(--color-dark)' }}>Project Management</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', margin: 0, lineHeight: '1.5' }}>End-to-end oversight ensuring on-time delivery and strict cost efficiency. Our dedicated quantity surveyors utilize BIM for conflict detection to eliminate unforeseen scope creep.</p>
              </div>
            </div>
          </div>

          <button 
            className="btn btn-dark" 
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 2rem', fontWeight: 'bold' }}
            onClick={() => navigate('/services')}
          >
            Learn More <ArrowRight size={18} />
          </button>
        </div>

        {/* Right Column (Image) */}
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img 
            src={excellenceImg} 
            alt="Engineering Excellence" 
            style={{ 
              width: '100%', 
              height: '650px', 
              objectFit: 'cover', 
              borderRadius: '24px', 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
            }} 
          />
        </div>
        
      </div>
      
      {/* Mobile responsiveness in index.css will handle the grid layout on smaller screens */}
      <style>{`
        @media (max-width: 900px) {
          .section > div {
            grid-template-columns: 1fr !important;
          }
          .section img {
            height: 400px !important;
            margin-top: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ExcellenceSection;
