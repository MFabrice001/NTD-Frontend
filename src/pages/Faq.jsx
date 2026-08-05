import React, { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';

const FAQ = () => {
  const bgRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Parallax scroll hook mirroring the exact Home/Blog page behavior
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

  const faqData = [
    {
      question: "What engineering disciplines does your firm specialize in?",
      answer: "We offer full-scale structural design, civil infrastructure planning, architectural blueprint optimization, electromechanical coordination, and comprehensive project management solutions tailored specifically to East African terrains and zoning structures."
    },
    {
      question: "How do you integrate sustainability into high-rise projects?",
      answer: "Sustainability is embedded into our materials lifecycle. We utilize low-carbon custom concrete mixtures, natural building ventilation modeling, efficient microclimate solar orientation layouts, and localized supply chains to drastically minimize ambient emissions."
    },
    {
      question: "What is your typical project timeline from assessment to construction?",
      answer: "Timelines depend significantly on the scale of development. Commercial portfolios generally require 3 to 6 months for rigorous structural engineering drafting, site assessments, and regulatory approval workflows before foundational excavation commences."
    },
    {
      question: "Do you offer digital structural health monitoring after project handover?",
      answer: "Yes, we integrate intelligent IoT sensor networks and real-time digital twins into our signature corporate projects. This permits engineering teams to track ongoing strain, material settling thresholds, and execute preventative maintenance diagnostics."
    },
    {
      question: "How can clients initiate an initial engineering consultation?",
      answer: "Clients can connect directly with our engineering department using our formal contact form or by scheduling an expert layout evaluation directly at our Kigali headquarters."
    }
  ];

  // Filters questions based on real-time interactive search inputs
  const filteredFaqs = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-page" style={{ backgroundColor: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* =========================================================
          1. HERO HEADER SECTION (Wavy shape divider & Search box)
         ========================================================= */}
      <section className="hero" style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#0f172a', padding: '10rem 2rem 8rem 2rem', color: 'white', textAlign: 'center' }}>
        <div className="hero-bg" ref={bgRef} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(to bottom right, #1e1b4b, #0f172a)', backgroundSize: 'cover', zIndex: 1 }}></div>
        <div className="hero-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', zIndex: 2 }}></div>
        
        <div className="hero-container" style={{ position: 'relative', zIndex: 3, maxWidth: '800px', margin: '0 auto' }}>
          <div className="hero-content">
            <h1 className="hero-title" style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
              <span style={{ display: 'block', color: '#94a3b8', fontSize: '1rem', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Support & Knowledge</span>
              <span>FREQUENTLY ASKED</span>{' '}
              <span className="highlight" style={{ color: '#f59e0b' }}>QUESTIONS</span>
            </h1>
            <p className="hero-subtitle" style={{ fontSize: '1.1rem', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '2.5rem', maxWidth: '650px', margin: '0 auto' }}>
              Find quick answers regarding our architectural frameworks, infrastructure workflows, sustainability principles, and consultation models.
            </p>

            {/* Interactive Question Search Input */}
            <div style={{ maxWidth: '500px', margin: '2rem auto 0 auto', position: 'relative' }}>
              <input 
                type="text"
                placeholder="Search queries (e.g., sustainability, timeline)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '1rem 1.5rem', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '0.95rem', backdropFilter: 'blur(8px)', outline: 'none', transition: 'all 0.3s' }}
              />
            </div>
          </div>
        </div>
        
        {/* Wavy SVG shape divider matching Home & Blog perfectly */}
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
          2. INTERACTIVE FAQ ACCORDION LIST
         ========================================================= */}
      <section className="faq-content-section" style={{ padding: '5rem 2rem 6rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          {filteredFaqs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>No matching frequently asked questions discovered. Try alternate keywords.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {filteredFaqs.map((faq, idx) => {
                const isOpen = activeIndex === idx;
                return (
                  <div 
                    key={idx} 
                    style={{ backgroundColor: 'white', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01)', overflow: 'hidden', transition: 'all 0.2s ease-in-out' }}
                  >
                    {/* Accordion Toggle Header Row */}
                    <button 
                      onClick={() => toggleAccordion(idx)}
                      style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', outline: 'none' }}
                    >
                      <span style={{ fontSize: '1.1rem', fontWeight: '700', color: isOpen ? '#f59e0b' : '#0f172a', transition: 'color 0.2s' }}>
                        {faq.question}
                      </span>
                      <span style={{ fontSize: '1.5rem', fontWeight: '400', color: '#94a3b8', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.2s', display: 'inline-block', lineHeight: 1 }}>
                        ＋
                      </span>
                    </button>

                    {/* Collapsible Answer Body Box */}
                    <div style={{ maxHeight: isOpen ? '300px' : '0px', overflow: 'hidden', transition: 'max-height 0.3s ease-in-out, padding 0.3s ease' }}>
                      <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Additional Assistance CTA Block */}
          <div style={{ marginTop: '4rem', textAlign: 'center', backgroundColor: '#1e1b4b', color: 'white', padding: '2.5rem', borderRadius: '12px', backgroundImage: 'linear-gradient(to bottom right, #0f172a, #1e293b)' }}>
            <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '700' }}>Still have specific queries?</h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', margin: '0.5rem 0 1.5rem 0' }}>
              Our project engineering consultation team is standing by to help evaluate structural scale blueprints.
            </p>
            <button style={{ padding: '0.75rem 1.75rem', backgroundColor: '#f59e0b', color: '#1e1b4b', border: 'none', fontWeight: '700', borderRadius: '4px', cursor: 'pointer', letterSpacing: '0.025em' }}>
              CONTACT OUR ENGINEERS
            </button>
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

export default FAQ;