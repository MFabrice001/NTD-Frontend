import React from 'react';

const VisionariesSection = () => {
  return (
    <section className="section section-bg-blue">
      <div className="section-header">
        <h2>Led by Visionaries in Engineering</h2>
        <p>Our leadership team combines local expertise with global standards to deliver unmatched quality.</p>
        <button className="btn btn-primary" style={{marginTop: '1.5rem'}}>Join Our Team 👥</button>
      </div>
      <div className="grid-2">
        <div className="team-card">
          <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" alt="Jean-Pierre" className="team-img" />
          <div className="team-info">
            <h4>Jean-Pierre Nkurunziza</h4>
            <p className="role">Chief Executive Officer</p>
            <p className="quote">"Our mission is to build infrastructure that serves generations and creates opportunities for all Rwandans."</p>
          </div>
        </div>
        <div className="team-card">
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" alt="Amina" className="team-img" />
          <div className="team-info">
            <h4>Amina Uwimana</h4>
            <p className="role">Lead Architect</p>
            <p className="quote">"Design is not just aesthetic; it is the structural dialogue between people and their environment."</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionariesSection;
