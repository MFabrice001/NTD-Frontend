import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Quote = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    number: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/services`)
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error("Failed to fetch services", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Format the message with company and project details
    const finalMessage = `Project details: ${formData.message}`;
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/contact-messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          number: formData.number,
          subject: formData.subject, // Project Type
          message: finalMessage
        })
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Failed to submit quote request", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="page-container" style={{ background: '#f8fafc', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
          <div style={{ textAlign: 'center', background: 'white', padding: '4rem', borderRadius: '24px', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)', maxWidth: '600px' }}>
            <CheckCircle size={64} style={{ color: '#10b981', margin: '0 auto 1.5rem auto' }} />
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#0f172a' }}>Request Received</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
              Thank you for reaching out! Our engineering team will review your project details and get back to you shortly.
            </p>
            <button onClick={() => navigate('/')} className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
              Return to Homepage
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleSubmit}>
            
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155' }}>First Name *</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155' }}>Last Name / Company</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155' }}>Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155' }}>Phone Number</label>
                <input type="tel" name="number" value={formData.number} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155' }}>Project Type *</label>
              <select name="subject" value={formData.subject} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white' }}>
                <option value="">Select a project type...</option>
                {services.map(s => (
                  <option key={s.id} value={s.title}>{s.title}</option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155' }}>Project Details & Requirements *</label>
              <textarea name="message" value={formData.message} onChange={handleChange} required rows="5" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', resize: 'vertical' }} placeholder="Please describe the scope, estimated timeline, and location of your project..."></textarea>
            </div>

            <button type="submit" disabled={submitting} className="btn btn-primary" style={{ padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', marginTop: '1rem', opacity: submitting ? 0.7 : 1 }}>
              {submitting ? 'Submitting...' : (
                <>Request Consultation <ArrowRight size={20} /></>
              )}
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
