import React, { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';

const Contact = () => {
  const bgRef = useRef(null);
  
  // Form States
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Parallax scroll hook mirroring the exact Home, Blog, and FAQ behavior
  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const scrolled = window.scrollY;
        bgRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 4000);
    }
  };

  return (
    <div className="contact-page" style={{ backgroundColor: '#f8fafc', fontFamily: 'system-ui, sans-serif', overflowX: 'hidden' }}>
      
      {/* =========================================================
          1. HERO BREADCRUMB HEADER (Wavy Shape Divider)
         ========================================================= */}
      <section className="hero" style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#0f172a', padding: '10rem 2rem 8rem 2rem', color: 'white', textAlign: 'center' }}>
        <div className="hero-bg" ref={bgRef} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(to bottom right, #1e1b4b, #0f172a)', backgroundSize: 'cover', zIndex: 1 }}></div>
        <div className="hero-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', zIndex: 2 }}></div>
        
        <div className="hero-container" style={{ position: 'relative', zIndex: 3, maxWidth: '800px', margin: '0 auto' }}>
          <div className="hero-content">
            {/* Animated Header Text Wrapper */}
            <h1 className="hero-title" style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
              <span style={{ display: 'block', color: '#94a3b8', fontSize: '1rem', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Get In Touch</span>
              <span>CONNECT WITH OUR</span>{' '}
              <span className="highlight" style={{ color: '#f59e0b' }}>ENGINEERING</span> TEAM
            </h1>
            <p className="hero-subtitle" style={{ fontSize: '1.1rem', color: '#cbd5e1', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
              Have an enterprise project or infrastructure inquiry? Reach out to schedule a consultation with our development specialists at our regional headquarters.
            </p>
          </div>
        </div>
        
        {/* Wavy SVG shape divider matching your unified structural layout */}
        <div className="wave-container" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', overflow: 'hidden', lineHeight: 0, zIndex: 4 }}>
          <svg className="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" aria-hidden="true" style={{ width: '100%', height: '40px' }}>
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className="wave1"><use href="#gentle-wave" x="48" y="0" fill="rgba(248,250,252,0.05)" /></g>
            <g className="wave2"><use href="#gentle-wave" x="48" y="3" fill="rgba(248,250,252,0.1)" /></g>
            <g className="wave3"><use href="#gentle-wave" x="48" y="5" fill="rgba(248,250,252,0.2)" /></g>
            <g className="wave4"><use href="#gentle-wave" x="48" y="7" fill="#f8fafc" /></g>
          </svg>
        </div>
      </section>

      {/* =========================================================
          2. TWO-COLUMN RESPONSIVE FORM & INFO CONTAINER
         ========================================================= */}
      <section className="contact-body" style={{ padding: '4rem 2rem 6rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '3.5rem' }}>
          
          {/* Column A: Interactive Contact Information Panel (Left Side) */}
          <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem' }}>Office Information</h2>
              <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Drop by our technical office clusters or drop a direct line to request an engineering structural audit.
              </p>
              
              {/* Informational Cards */}
              <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: 'rgba(30, 27, 75, 0.05)', color: '#1e1b4b', padding: '0.75rem', borderRadius: '8px', fontWeight: 'bold' }}>📍</div>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', color: '#0f172a', fontWeight: '700' }}>Headquarters</h4>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Kigali, Rwanda</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: 'rgba(30, 27, 75, 0.05)', color: '#1e1b4b', padding: '0.75rem', borderRadius: '8px', fontWeight: 'bold' }}>✉️</div>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', color: '#0f172a', fontWeight: '700' }}>Email Us</h4>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>engineering@domain.rw</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: 'rgba(30, 27, 75, 0.05)', color: '#1e1b4b', padding: '0.75rem', borderRadius: '8px', fontWeight: 'bold' }}>📞</div>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', color: '#0f172a', fontWeight: '700' }}>Call Center</h4>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>+250 788 000 000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Interactive Operational Hours Widget */}
            <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Working Metrics</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.9rem', color: '#475569' }}>
                <span>Monday — Friday</span>
                <span style={{ fontWeight: '600', color: '#0f172a' }}>08:00 AM - 05:00 PM</span>
              </div>
            </div>
          </div>

          {/* Column B: Full Responsive Messaging Card System (Right Side) */}
          <div style={{ flex: '1 1 550px', backgroundColor: 'white', padding: '2.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(15,23,42,0.02)' }}>
            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
                <h3 style={{ fontSize: '1.5rem', color: '#0f172a', margin: '0 0 0.5rem 0', fontWeight: '800' }}>Message Dispatched Successfully!</h3>
                <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Our design and system analysts will review your query parameters shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* Field 1: Name Input */}
                <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '700', color: focusedField === 'name' ? '#1e1b4b' : '#64748b', marginBottom: '0.5rem', transition: 'color 0.2s' }}>
                    Full Name *
                  </label>
                  <input 
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    style={{ padding: '0.85rem 1.2rem', borderRadius: '6px', border: focusedField === 'name' ? '2px solid #1e1b4b' : '1px solid #cbd5e1', outline: 'none', fontSize: '0.95rem', transition: 'all 0.2s ease-in-out' }}
                  />
                </div>

                {/* Field 2: Email Input */}
                <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '700', color: focusedField === 'email' ? '#1e1b4b' : '#64748b', marginBottom: '0.5rem', transition: 'color 0.2s' }}>
                    Email Address *
                  </label>
                  <input 
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    style={{ padding: '0.85rem 1.2rem', borderRadius: '6px', border: focusedField === 'email' ? '2px solid #1e1b4b' : '1px solid #cbd5e1', outline: 'none', fontSize: '0.95rem', transition: 'all 0.2s ease-in-out' }}
                  />
                </div>

                {/* Field 3: Subject Choice Selection dropdown */}
                <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '700', color: focusedField === 'subject' ? '#1e1b4b' : '#64748b', marginBottom: '0.5rem', transition: 'color 0.2s' }}>
                    Department Target
                  </label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    style={{ padding: '0.85rem 1.2rem', borderRadius: '6px', border: focusedField === 'subject' ? '2px solid #1e1b4b' : '1px solid #cbd5e1', outline: 'none', backgroundColor: '#fff', fontSize: '0.95rem', transition: 'all 0.2s ease-in-out', cursor: 'pointer' }}
                  >
                    <option value="">General Project Request</option>
                    <option value="Infrastructure Planning">Infrastructure Planning</option>
                    <option value="Architectural Review">Architectural Layout Review</option>
                    <option value="Sustainability Consultation">Sustainability Consultation</option>
                  </select>
                </div>

                {/* Field 4: Textarea Message Box */}
                <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '700', color: focusedField === 'message' ? '#1e1b4b' : '#64748b', marginBottom: '0.5rem', transition: 'color 0.2s' }}>
                    Project Requirements / Message *
                  </label>
                  <textarea 
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Provide details regarding the project scope..."
                    style={{ padding: '0.85rem 1.2rem', borderRadius: '6px', border: focusedField === 'message' ? '2px solid #1e1b4b' : '1px solid #cbd5e1', outline: 'none', fontSize: '0.95rem', resize: 'vertical', minHeight: '120px', transition: 'all 0.2s ease-in-out' }}
                  />
                </div>

                {/* Submit Action Action Trigger Button */}
                <button 
                  type="submit" 
                  style={{ width: '100%', marginTop: '0.5rem', padding: '1rem', backgroundColor: '#1e1b4b', color: 'white', border: 'none', fontWeight: '700', borderRadius: '6px', cursor: 'pointer', letterSpacing: '0.05em', transition: 'background-color 0.2s' }}
                >
                  DISPATCH TECHNICAL MESSAGE
                </button>

              </form>
            )}
          </div>

        </div>
      </section>

      {/* =========================================================
          3. SITE FOOTER INTEGRATION
         ========================================================= */}
      <Footer />
    </div>
  );
};

export default Contact;