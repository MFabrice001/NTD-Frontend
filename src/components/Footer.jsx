import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
            <li>
              <Link to="/faq" onClick={() => window.scrollTo(0, 0)}>
                Frequently Asked Questions (FAQ)
              </Link>
            </li>
            <li>
              <Link to="/blog" onClick={() => window.scrollTo(0, 0)}>
                Architectural Perspectives
              </Link>
            </li>
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
          
          {/* Authentic Real-Look Social Brand Icons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', alignItems: 'center' }}>
            {/* Instagram: Official Radial Gradient with Camera Glyph */}
            <a 
              href="https://www.instagram.com/ntdbuild_designsolution?stkn=MWJyaHVnODdodzB0aw==" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="Follow us on Instagram"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '11px',
                background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(214, 36, 159, 0.35)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                textDecoration: 'none'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.06)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(214, 36, 159, 0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(214, 36, 159, 0.35)';
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <circle cx="17.5" cy="6.5" r="1.2" fill="#FFFFFF" stroke="none"></circle>
              </svg>
            </a>

            {/* TikTok: Authentic Black Icon with Cyan & Red Accent Glow */}
            <a 
              href="https://www.tiktok.com/@ntdbuild_designsolution?_r=1&_t=ZS-99mKui94UZb" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="Follow us on TikTok"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '11px',
                background: '#010101',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.45)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                textDecoration: 'none'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.06)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(37, 244, 238, 0.35)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.45)';
              }}
            >
              {/* Official TikTok Multi-color SVG Glyph */}
              <svg width="22" height="22" viewBox="0 0 24 24">
                {/* Cyan Shadow */}
                <path 
                  d="M12.5 4.5v10.3a3.2 3.2 0 1 1-2.3-3.1v-2.3a5.5 5.5 0 1 0 4.6 5.4V8.4a7.8 7.8 0 0 0 4.2 1.3v-2.4a5.5 5.5 0 0 1-4.2-2.8h-2.3z" 
                  fill="#25F4EE" 
                  transform="translate(-0.8, -0.6)"
                />
                {/* Red/Magenta Shadow */}
                <path 
                  d="M12.5 4.5v10.3a3.2 3.2 0 1 1-2.3-3.1v-2.3a5.5 5.5 0 1 0 4.6 5.4V8.4a7.8 7.8 0 0 0 4.2 1.3v-2.4a5.5 5.5 0 0 1-4.2-2.8h-2.3z" 
                  fill="#FE2C55" 
                  transform="translate(0.8, 0.6)"
                />
                {/* White Main Glyph */}
                <path 
                  d="M12.5 4.5v10.3a3.2 3.2 0 1 1-2.3-3.1v-2.3a5.5 5.5 0 1 0 4.6 5.4V8.4a7.8 7.8 0 0 0 4.2 1.3v-2.4a5.5 5.5 0 0 1-4.2-2.8h-2.3z" 
                  fill="#FFFFFF"
                />
              </svg>
            </a>

            {/* WhatsApp: Official Green Badge with Handset in Speech Bubble */}
            <a 
              href="https://wa.me/250780754701" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="Chat with us on WhatsApp"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#25D366',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.45)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                textDecoration: 'none'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.06)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(37, 211, 102, 0.65)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.45)';
              }}
            >
              <svg width="23" height="23" viewBox="0 0 24 24" fill="#FFFFFF">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.01 4.54-3.69 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.55.12.17 1.74 2.65 4.21 3.72.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.12-.22-.19-.47-.31z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} NTD BUILD & DESIGN SOLUTIONS. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
