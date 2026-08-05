import React from 'react';
import { useNavigate } from 'react-router-dom';

const LegacySection = () => {
  const navigate = useNavigate();

  return (
    <section className="legacy-section">
      <h2>Ready to Build Your Legacy?</h2>
      <p>From structural foundations to architectural finishes, let's discuss your next landmark project.</p>
      <div className="legacy-btns">
        <button className="btn btn-primary" onClick={() => navigate('/quote')}>Get a Free Quote</button>
        <button className="btn btn-outline" style={{border: '1px solid rgba(255,255,255,0.2)'}} onClick={() => navigate('/services')}>Partner With Us</button>
      </div>
    </section>
  );
};

export default LegacySection;
