import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h4>NEWSLETTER</h4>
          <h2 style={{fontSize: '1rem', fontWeight: 800, marginTop: '1rem', marginBottom: '1.5rem', maxWidth: '350px'}}>WANT TO BE THE FIRST TO KNOW ABOUT THE LATEST JOB OPPORTUNITIES, INDUSTRY INSIGHTS, AND PLATFORM UPDATES?</h2>
          <h4 style={{marginBottom: '1.5rem'}}>SIGN UP NOW FOR THE NTD NEWSLETTER</h4>
          
          <form style={{maxWidth: '400px'}}>
            <input 
              type="email" 
              placeholder="Your email address" 
              style={{width: '100%', padding: '1rem', marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'inherit'}}
            />
            <div style={{display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '1.5rem'}}>
              <input type="checkbox" style={{marginTop: '0.25rem'}} />
              <p style={{fontSize: '0.75rem', lineHeight: 1.4}}>By submitting this form, you agree to your email address being used to send you our exclusive newsletter. Your data is processed in accordance with our privacy policy. You can unsubscribe at any time via the link in each email.</p>
            </div>
            <button type="button" className="btn btn-dark">Subscribe</button>
          </form>
        </div>
        
        <div>
          <h4>LEGAL NOTICES</h4>
          <ul className="footer-links">
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Cookie Policy</a></li>
          </ul>
        </div>
        
        <div>
          <h4>CONTACT</h4>
          <ul className="footer-links" style={{color: 'var(--color-dark)', fontWeight: 700}}>
            <li style={{marginBottom: '0.75rem'}}>KIGALI INNOVATION CITY</li>
            <li style={{marginBottom: '0.75rem'}}>P.O. BOX 1234</li>
            <li style={{marginBottom: '0.75rem'}}>KIGALI, RWANDA</li>
            <li>TEL: +250 788 000 000</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <span>&copy; 2026 NTD CONSTRUCTION</span>
        <span>NTD PLATFORM CREATION</span>
      </div>
    </footer>
  );
};

export default Footer;
