import React from 'react';
import Footer from '../components/Footer';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Quote = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container" style={{ background: '#f8fafc' }}>
      <div className="faq-hero" style={{paddingBottom: '2rem'}}>
        <span style={{fontSize: '0.85rem', fontWeight: '700', letterSpacing: '2px', color: 'var(--color-primary)', textTransform: 'uppercase'}}>
          Start Your Project
        </span>
        <h1 style={{marginTop: '0.5rem'}}>Get a Free Quote</h1>
        <p>
          Tell us about your upcoming project, and our engineering team will provide a preliminary consultation and estimate.
        </p>
      </div>
      
      <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 2rem' }}>
        <div style={{ background: 'white', padding: '3rem', borderRadius: '24px', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={(e) => { e.preventDefault(); navigate('/contact'); }}>
            
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155' }}>Full Name *</label>
                <input type="text" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155' }}>Company / Organization</label>
                <input type="text" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155' }}>Email Address *</label>
                <input type="email" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155' }}>Phone Number</label>
                <input type="tel" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155' }}>Project Type *</label>
              <select required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white' }}>
                <option value="">Select a project type...</option>
                <option value="commercial">Commercial Construction</option>
                <option value="residential">Residential Development</option>
                <option value="civil">Roads & Civil Works</option>
                <option value="design">Architectural Design / BIM</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155' }}>Project Details & Requirements *</label>
              <textarea required rows="5" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', resize: 'vertical' }} placeholder="Please describe the scope, estimated timeline, and location of your project..."></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', marginTop: '1rem' }}>
              Request Consultation <ArrowRight size={20} />
            </button>
            <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
              By submitting this form, you agree to our privacy policy. Our team will get back to you within 24-48 hours.
            </p>

          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Quote;
