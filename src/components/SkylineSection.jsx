import React from 'react';
import img1 from '../images/C image 5.jpeg';
import img2 from '../images/P Engin im.avif';
import img3 from '../images/P image3.jpg';
import img4 from '../images/P image4.jpeg';

const SkylineSection = () => {
  return (
    <section className="section">
      <div className="section-header">
        <span className="badge">KIGALI'S PREMIER FIRM</span>
        <h2>Defining the Skyline of Modern Rwanda</h2>
        <p>Since 2022, NTD BUILD & DESIGN SOLUTIONS has been at the forefront of Rwanda's architectural evolution. We specialize in transforming complex engineering challenges into iconic landmarks that stand the test of time. Our portfolio spans from luxury residential estates to cutting-edge commercial hubs, reflecting our commitment to sustainable development and world-class craftsmanship. By integrating local context with international standards, we don't just build structures—we engineer the future of our communities.</p>
      </div>
      <div className="grid-4">
        <div className="card">
          <img src={img1} alt="Office Building" className="skyline-img" />
        </div>
        <div className="card">
          <img src={img2} alt="Modern Architecture" className="skyline-img" />
        </div>
        <div className="card">
          <img src={img3} alt="Engineering Works" className="skyline-img" />
        </div>
        <div className="card">
          <img src={img4} alt="Luxury Residence" className="skyline-img" />
        </div>
      </div>
    </section>
  );
};

export default SkylineSection;
