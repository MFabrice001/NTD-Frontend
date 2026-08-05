import React from 'react';
import Footer from '../components/Footer';
import LandmarksSection from '../components/LandmarksSection';

const Portfolio = () => {
  return (
    <div className="portfolio-page">
      <div className="faq-hero" style={{paddingBottom: '2rem'}}>
        <span style={{fontSize: '0.85rem', fontWeight: '700', letterSpacing: '2px', color: 'var(--color-primary)', textTransform: 'uppercase'}}>
          Our Work
        </span>
        <h1 style={{marginTop: '0.5rem'}}>Engineering Portfolio</h1>
        <p>
          Explore a selection of our most recent structural achievements and architectural landmarks across Rwanda.
        </p>
      </div>
      
      <div style={{paddingTop: '0'}}>
        <LandmarksSection />
      </div>

      <Footer />
    </div>
  );
};

export default Portfolio;
