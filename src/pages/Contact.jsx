import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import Footer from '../components/Footer';

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
      await fetch('http://localhost:8080/api/public/contact-messages', {
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
      <div className="contact-page-simple">
        <h1 className="contact-page-title">Contact Us</h1>

        <div className="contact-card-box">
          {/* Left Column: Dark Blue Contact Information Panel */}
          <div className="contact-blue-panel">
            {/* Decorative Dark Blue Circles in bottom right */}
            <div className="contact-blue-circle-1" />
            <div className="contact-blue-circle-2" />

            <div>
              <h2>Contact Information</h2>

              <div className="contact-info-list">
                <div className="contact-info-item">
                  <strong>Opening Hours</strong>
                  <p>Monday – Friday: 08:30 AM – 05:00 PM</p>
                  <p>Saturday – Sunday: Closed</p>
                  <p>Technical Support: Available 24/7</p>
                </div>

                <div className="contact-info-item">
                  <strong>WhatsApp</strong>
                  <p>(+250) 788 000 000</p>
                </div>

                <div className="contact-info-item">
                  <strong>Technical Support</strong>
                  <p>(+250) 788 000 001</p>
                </div>

                <div className="contact-info-item">
                  <strong>Customer Support</strong>
                  <p>(+250) 788 000 000/0793898671</p>
                </div>

                <div className="contact-info-item">
                  <strong>Email</strong>
                  <p>info@ndbuilddesign.rw</p>
                </div>

                <div className="contact-info-item">
                  <strong>Our Address</strong>
                  <p>Kigali Innovation City, KG 7 Ave</p>
                  <p>Building, Kigali – Gasabo</p>
                  <p>P.O Box 1234, Kigali–Rwanda</p>
                </div>
              </div>
            </div>

            {/* Social Icons Row */}
            <div className="contact-social-row">
              <a href="https://x.com" target="_blank" rel="noreferrer" className="contact-social-btn" title="X (Twitter)">
                X
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="contact-social-btn" title="Instagram">
                IG
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="contact-social-btn" title="LinkedIn">
                in
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="contact-social-btn" title="Facebook">
                f
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="contact-social-btn" title="TikTok" style={{fontFamily: 'sans-serif', fontSize: '0.75rem', fontWeight: 800}}>
                TT
              </a>
            </div>
          </div>

          {/* Right Column: Minimal Form Area */}
          <div className="contact-form-panel">
            {submitted ? (
              <div style={{textAlign: 'center', padding: '4rem 1.5rem'}}>
                <CheckCircle2 size={56} color="#0f172a" style={{margin: '0 auto 1rem'}} />
                <h3 style={{fontSize: '1.6rem', color: '#0f172a', marginBottom: '0.5rem'}}>
                  Message Sent Successfully
                </h3>
                <p style={{color: '#64748b', maxWidth: '400px', margin: '0 auto 2rem'}}>
                  Thank you for contacting ND Build & Design. Our team will get back to you shortly.
                </p>
                <button 
                  className="contact-send-btn"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      firstName: '',
                      lastName: '',
                      email: '',
                      number: '',
                      subject: '',
                      message: ''
                    });
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
                {/* Name * -> First | Last */}
                <div className="contact-form-field">
                  <label className="contact-form-label">Name *</label>
                  <div className="contact-name-row">
                    <input
                      type="text"
                      name="firstName"
                      required
                      placeholder="First"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="contact-input-line"
                    />
                    <input
                      type="text"
                      name="lastName"
                      required
                      placeholder="Last"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="contact-input-line"
                    />
                  </div>
                </div>

                {/* Email * */}
                <div className="contact-form-field">
                  <label className="contact-form-label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="contact-input-line"
                  />
                </div>

                {/* Numbers * */}
                <div className="contact-form-field">
                  <label className="contact-form-label">Numbers *</label>
                  <input
                    type="tel"
                    name="number"
                    required
                    value={formData.number}
                    onChange={handleChange}
                    className="contact-input-line"
                  />
                </div>

                {/* Subject */}
                <div className="contact-form-field">
                  <label className="contact-form-label">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="contact-input-line"
                  />
                </div>

                {/* Comment or Message * */}
                <div className="contact-form-field" style={{marginBottom: '2.5rem'}}>
                  <label className="contact-form-label">Comment or Message *</label>
                  <textarea
                    rows={3}
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="contact-input-line"
                    style={{resize: 'vertical'}}
                  />
                </div>

                {/* Send Message Button */}
                <button 
                  type="submit" 
                  disabled={submitting} 
                  className="contact-send-btn"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Professional Footer matching Home Page */}
      <Footer />
    </>
  );
};

export default Contact;
