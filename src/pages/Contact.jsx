import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import Footer from '../components/Footer';
import heroBg from '../assets/hero_bg.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    number: '',
    subject: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/contact-messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (err) {
      console.error('Failed to submit message:', err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '8rem 0 5rem 0',
        textAlign: 'center',
        color: 'white',
        overflow: 'hidden',
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        {/* Overlays */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--color-primary)', opacity: 0.3 }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4))' }}></div>
        
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1000px', margin: '0 auto', padding: '0 5%' }}>
          <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 3.5rem)', fontWeight: '700', marginBottom: '1.25rem', color: 'white' }}>Get in Touch</h1>
          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', lineHeight: '1.6', opacity: 0.9 }}>
            Have questions about our services? We're here to help. Reach out to us and let's discuss how we can empower your business.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 5%', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '2.5rem' }}>
          
          {/* Form Side */}
          <div style={{ background: 'white', borderRadius: '16px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>Send Us A Message</h2>
            <p style={{ color: '#64748b', marginBottom: '2rem' }}>Fill Out The Form Below And Our Team Will Get Back To You Within 24 Hours.</p>
            
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <CheckCircle2 size={56} color="var(--color-primary)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.6rem', color: '#0f172a', marginBottom: '0.5rem' }}>Message Sent Successfully</h3>
                <p style={{ color: '#64748b', marginBottom: '2rem' }}>Thank you for contacting NTD BUILD & DESIGN SOLUTIONS.</p>
                <button onClick={() => setSubmitted(false)} className="btn" style={{ background: 'var(--color-primary)', color: 'white', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Full Name *</label>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <input type="text" name="firstName" placeholder="First Name" required value={formData.firstName} onChange={handleChange} style={{ flex: '1 1 140px', minWidth: '120px', width: '100%', padding: '0.75rem 1rem', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', fontSize: '1rem', outline: 'none' }} />
                    <input type="text" name="lastName" placeholder="Last Name" required value={formData.lastName} onChange={handleChange} style={{ flex: '1 1 140px', minWidth: '120px', width: '100%', padding: '0.75rem 1rem', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', fontSize: '1rem', outline: 'none' }} />
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Phone Number *</label>
                    <input type="tel" name="number" placeholder="Your Phone" required value={formData.number} onChange={handleChange} style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', fontSize: '1rem', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Email *</label>
                    <input type="email" name="email" placeholder="Your Email" required value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', fontSize: '1rem', outline: 'none' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Subject *</label>
                  <input type="text" name="subject" placeholder="How Can We Help You?" required value={formData.subject} onChange={handleChange} style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', fontSize: '1rem', outline: 'none' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>Message *</label>
                  <textarea name="message" placeholder="Type your message here..." required value={formData.message} onChange={handleChange} rows="5" style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', resize: 'vertical', fontSize: '1rem', outline: 'none' }} />
                </div>

                <button type="submit" disabled={submitting} style={{ background: 'var(--color-primary)', color: 'white', padding: '1rem', borderRadius: '8px', fontWeight: '600', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '1rem', transition: 'all 0.2s ease' }}>
                  {submitting ? 'Sending...' : 'Send Message'}
                  {!submitting && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info Side */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a', marginBottom: '2rem' }}>Contact Information</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                  <div style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, #EA4335 0%, #D93025 100%)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', flexShrink: 0, boxShadow: '0 6px 16px rgba(234, 67, 53, 0.3)' }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="#FFFFFF">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ fontWeight: '600', color: '#0f172a', marginBottom: '0.25rem' }}>Email</h3>
                    <a href="mailto:ntdbuilddesignsolution@gmail.com" style={{ color: '#64748b', textDecoration: 'none' }} onMouseOver={e => e.currentTarget.style.color = '#EA4335'} onMouseOut={e => e.currentTarget.style.color = '#64748b'}>ntdbuilddesignsolution@gmail.com</a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                  <div style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', flexShrink: 0, boxShadow: '0 6px 16px rgba(16, 185, 129, 0.3)' }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="#FFFFFF">
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.52 0-.55-.45-1-1-1H4.1c-.55 0-1 .45-1 1C3.1 13.39 10.71 21 20.1 21c.55 0 1-.45 1-1v-3.62c0-.55-.45-1-1.09-1z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ fontWeight: '600', color: '#0f172a', marginBottom: '0.25rem' }}>Phone</h3>
                    <a href="tel:+250780754701" style={{ color: '#64748b', textDecoration: 'none' }} onMouseOver={e => e.currentTarget.style.color = '#10B981'} onMouseOut={e => e.currentTarget.style.color = '#64748b'}>(+250) 780 754 701</a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', flexShrink: 0, boxShadow: '0 6px 16px rgba(245, 158, 11, 0.3)' }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="#FFFFFF">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ fontWeight: '600', color: '#0f172a', marginBottom: '0.25rem' }}>Office</h3>
                    <p style={{ color: '#64748b', lineHeight: '1.5' }}>KG 18 Ave, Remera<br/>Kigali, Rwanda</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', flexShrink: 0, boxShadow: '0 6px 16px rgba(59, 130, 246, 0.3)' }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="#FFFFFF">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ fontWeight: '600', color: '#0f172a', marginBottom: '0.25rem' }}>Business Hours</h3>
                    <p style={{ color: '#64748b', lineHeight: '1.5' }}>Monday - Friday: 8:30 AM - 5:00 PM<br/>Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--color-dark)', borderRadius: '16px', padding: '2.5rem', color: 'white', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-1rem', right: '-1rem', width: '150px', height: '150px', background: 'var(--color-primary)', opacity: 0.1, borderRadius: '50%' }}></div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', position: 'relative', zIndex: 10 }}>Why choose NTD BUILD?</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', zIndex: 10 }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="m9 11 3 3L22 4"></path></svg>
                  <p>Premium architectural design</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="m9 11 3 3L22 4"></path></svg>
                  <p>Comprehensive construction solutions</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="m9 11 3 3L22 4"></path></svg>
                  <p>Dedicated customer support team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section style={{ height: '400px', backgroundColor: '#e2e8f0', width: '100%' }}>
        <iframe 
          src="https://maps.google.com/maps?q=KG%2018%20Ave,%20Remera,%20Rwanda&t=&z=15&ie=UTF8&iwloc=&output=embed" 
          width="100%" 
          height="100%" 
          style={{ border: 0, display: 'block' }} 
          allowFullScreen="" 
          loading="lazy" 
          title="Google Maps Location"
        ></iframe>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
