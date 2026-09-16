import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!agreed) {
      setMessage('Please agree to the privacy policy.');
      return;
    }
    setLoading(true);
    setMessage('');
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setMessage('Subscribed successfully!');
        setEmail('');
        setAgreed(false);
      } else {
        setMessage('Failed to subscribe. Try again.');
      }
    } catch (e) {
      setMessage('Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h4>NEWSLETTER</h4>
          <h2 style={{fontSize: '1rem', fontWeight: 800, marginTop: '1rem', marginBottom: '1.5rem', maxWidth: '350px', color: '#FFFFFF'}}>WANT TO BE THE FIRST TO KNOW ABOUT THE LATEST JOB OPPORTUNITIES, INDUSTRY INSIGHTS, AND PLATFORM UPDATES?</h2>
          <h4 style={{marginBottom: '1.5rem'}}>SIGN UP NOW FOR THE NTD NEWSLETTER</h4>
          
          <form onSubmit={handleSubscribe} style={{maxWidth: '400px'}}>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address" 
              style={{width: '100%', padding: '1rem', marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'inherit'}}
            />
            <div style={{display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '1.5rem'}}>
              <input 
                type="checkbox" 
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={{marginTop: '0.25rem'}} 
              />
              <p style={{fontSize: '0.75rem', lineHeight: 1.4}}>By submitting this form, you agree to your email address being used to send you our exclusive newsletter. Your data is processed in accordance with our privacy policy. You can unsubscribe at any time via the link in each email.</p>
            </div>
            {message && <div style={{fontSize: '0.85rem', marginBottom: '1rem', color: message.includes('successfully') ? '#10b981' : '#ef4444'}}>{message}</div>}
            <button type="submit" disabled={loading} className="btn btn-dark">{loading ? 'Subscribing...' : 'Subscribe'}</button>
          </form>
        </div>
        
        <div>
          <h4>LEGAL & RESOURCES</h4>
          <ul className="footer-links">
            <li><a href="/faq">Frequently Asked Questions (FAQ)</a></li>
            <li><a href="/blog">Architectural Perspectives</a></li>
          </ul>
        </div>
        
        <div>
          <h4>CONTACT</h4>
          <ul className="footer-links" style={{color: '#94A3B8', fontWeight: 500}}>
            <li style={{marginBottom: '0.75rem'}}>KG 18 Ave, Remera</li>
            <li style={{marginBottom: '0.75rem'}}>Kigali - Gasabo</li>
            <li style={{marginBottom: '0.75rem'}}>P.O Box 1234, Kigali - Rwanda</li>
            <li style={{marginBottom: '0.75rem'}}>TEL: +250 780 754 701</li>
            <li>ntdbuilddesignsolution@gmail.com</li>
          </ul>
          
          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '1.25rem', marginTop: '1.5rem', alignItems: 'center' }}>
            <a href="https://www.instagram.com/ntdbuild_designsolution?stkn=MWJyaHVnODdodzB0aw==" target="_blank" rel="noopener noreferrer" style={{ color: '#94A3B8', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.color = '#FFFFFF'} onMouseOut={(e) => e.currentTarget.style.color = '#94A3B8'} title="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@ntdbuild_designsolution?_r=1&_t=ZS-99mKui94UZb" target="_blank" rel="noopener noreferrer" style={{ color: '#94A3B8', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.color = '#FFFFFF'} onMouseOut={(e) => e.currentTarget.style.color = '#94A3B8'} title="TikTok">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
              </svg>
            </a>
            <a href="https://wa.me/250780754701" target="_blank" rel="noopener noreferrer" style={{ color: '#94A3B8', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.color = '#FFFFFF'} onMouseOut={(e) => e.currentTarget.style.color = '#94A3B8'} title="WhatsApp">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <span>&copy; 2026 NTD BUILD & DESIGN SOLUTIONS</span>
        <span>NTD PLATFORM CREATION</span>
      </div>
    </footer>
  );
};

export default Footer;
