import React from 'react';

const SkylineSection = () => {
  return (
    <section className="section">
      <div className="section-header">
        <span className="badge">KIGALI'S PREMIER FIRM</span>
        <h2>Defining the Skyline of Modern Rwanda</h2>
        <p>Since 2012, NTD Construction has been at the forefront of Rwanda's architectural evolution. We specialize in transforming complex engineering challenges into iconic landmarks that stand the test of time.</p>
      </div>
      <div className="grid-2">
        <div className="card">
           <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" alt="Office Building" className="skyline-img" />
        </div>
        <div className="card">
           <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" alt="Modern Architecture" className="skyline-img" />
        </div>
      </div>
    </section>
  );
};

export default SkylineSection;
