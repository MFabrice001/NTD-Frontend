import React from 'react';
import { motion } from 'framer-motion';
import img1 from '../images/C image 5.jpeg';
import img2 from '../images/P Engin im.avif';
import img3 from '../images/P image3.jpg';
import img4 from '../images/P image4.jpeg';

// Modern fade & subtle lift variant
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05
    }
  }
};

const images = [
  { src: img1, alt: "Office Building" },
  { src: img2, alt: "Modern Architecture" },
  { src: img3, alt: "Engineering Works" },
  { src: img4, alt: "Luxury Residence" },
];

const SkylineSection = () => {
  return (
    <motion.section 
      className="section"
      initial="hidden"
      whileInView="visible"
      // setting once: false allows re-triggering when scrolling up and down
      viewport={{ once: false, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.div className="section-header" variants={fadeInUp}>
        <motion.span className="badge" variants={fadeInUp}>
          KIGALI'S PREMIER FIRM
        </motion.span>
        <motion.h2 variants={fadeInUp}>
          Defining the Skyline of Modern Rwanda
        </motion.h2>
        <motion.p variants={fadeInUp}>
          Since 2022, NTD BUILD & DESIGN SOLUTIONS has been at the forefront of Rwanda's architectural evolution. We specialize in transforming complex engineering challenges into iconic landmarks that stand the test of time. Our portfolio spans from luxury residential estates to cutting-edge commercial hubs, reflecting our commitment to sustainable development and world-class craftsmanship. By integrating local context with international standards, we don't just build structures—we engineer the future of our communities.
        </motion.p>
      </motion.div>

      <motion.div className="grid-4" variants={containerVariants}>
        {images.map((img, idx) => (
          <motion.div 
            key={idx}
            className="card overflow-hidden rounded-xl"
            variants={fadeInUp}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <motion.img 
              src={img.src} 
              alt={img.alt} 
              className="skyline-img w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default SkylineSection;