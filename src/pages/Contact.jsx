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
          <h1 style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '1.5rem', color: 'white' }}>Get in Touch</h1>
          <p style={{ fontSize: '1.25rem', lineHeight: '1.6', opacity: 0.9 }}>
            Have questions about our services? We're here to help. Reach out to us and let's discuss how we can empower your business.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section style={{ padding: '5rem 5%', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          
          {/* Form Side */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>Send Us A Message</h2>
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
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <input type="text" name="firstName" placeholder="First Name" required value={formData.firstName} onChange={handleChange} style={{ flex: 1, width: '100%', padding: '0.75rem 1rem', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', fontSize: '1rem', outline: 'none' }} />
                    <input type="text" name="lastName" placeholder="Last Name" required value={formData.lastName} onChange={handleChange} style={{ flex: 1, width: '100%', padding: '0.75rem 1rem', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', fontSize: '1rem', outline: 'none' }} />
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
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '48px', height: '48px', background: 'rgba(255, 179, 71, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', flexShrink: 0 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                  </div>
                  <div>
                    <h3 style={{ fontWeight: '600', color: '#0f172a', marginBottom: '0.25rem' }}>Email</h3>
                    <p style={{ color: '#64748b' }}>ntdbuilddesignsolution@gmail.com</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '48px', height: '48px', background: 'rgba(255, 179, 71, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', flexShrink: 0 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <h3 style={{ fontWeight: '600', color: '#0f172a', marginBottom: '0.25rem' }}>Phone</h3>
                    <p style={{ color: '#64748b' }}>(+250) 780 754 701</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '48px', height: '48px', background: 'rgba(255, 179, 71, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', flexShrink: 0 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div>
                    <h3 style={{ fontWeight: '600', color: '#0f172a', marginBottom: '0.25rem' }}>Office</h3>
                    <p style={{ color: '#64748b', lineHeight: '1.5' }}>KG 18 Ave, Remera<br/>Kigali, Rwanda</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '48px', height: '48px', background: 'rgba(255, 179, 71, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', flexShrink: 0 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
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
