import React, { useEffect, useRef } from 'react';
import SkylineSection from '../components/SkylineSection';
import ExcellenceSection from '../components/ExcellenceSection';
import LandmarksSection from '../components/LandmarksSection';
import VisionariesSection from '../components/VisionariesSection';
import PerspectivesSection from '../components/PerspectivesSection';
import LegacySection from '../components/LegacySection';
import Footer from '../components/Footer';

const Home = () => {
  const bgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const scrolled = window.scrollY;
        // Move background slower than foreground for parallax effect
        bgRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-bg" ref={bgRef}></div>
        <div className="hero-overlay"></div>
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span>BUILDING</span>
              <span className="highlight">RWANDA'S</span>
              <span>FUTURE</span>
            </h1>
            <p className="hero-subtitle">
              Precision-engineered infrastructure and world-class architectural solutions, crafted for the heart of Africa.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary">OUR PORTFOLIO &rarr;</button>
              <button className="btn btn-outline">CONTACT ENGINEERING</button>
            </div>
          </div>
          
          <div className="hero-stats-banner">
            <div className="stat-item">
              <h3 className="highlight">6+</h3>
              <p>YEARS EXPERIENCE</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <h3 className="highlight">30+</h3>
              <p>PROJECTS DONE</p>
            </div>
          </div>
        </div>
        
        {/* Wavy SVG shape divider matching the Kolla design */}
        <div className="wave-container">
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="wave1">
              <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.05)" />
            </g>
            <g className="wave2">
              <use href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.1)" />
            </g>
            <g className="wave3">
              <use href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.2)" />
            </g>
            <g className="wave4">
              <use href="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
          </svg>
        </div>
      </section>

      <SkylineSection />
      <ExcellenceSection />
      <LandmarksSection />
      <VisionariesSection />
      <PerspectivesSection />
      <LegacySection />
      <Footer />
    </div>
  );
};

export default Home;
