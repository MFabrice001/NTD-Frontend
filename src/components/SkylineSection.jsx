import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import imgStadium from '../images/P image3.jpg';

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

const SkylineSection = () => {
  const navigate = useNavigate();

  return (
    <section id="about-us" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '85vh', backgroundColor: '#FFFFFF' }}>

      {/* Left Column (White Background with Text) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={containerVariants}
        style={{
          order: 2,
          padding: '2rem 10% 8rem 4%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <motion.div variants={fadeInUp} style={{ marginBottom: '1.5rem' }}>
          <span style={{
            fontSize: '0.95rem',
            fontWeight: '600',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: '#111'
          }}>
            ABOUT US
          </span>
        </motion.div>

        <motion.h2 variants={fadeInUp} style={{
          fontSize: '3.5rem',
          fontWeight: '300',
          lineHeight: '1.2',
          color: '#111',
          marginBottom: '2rem'
        }}>
          Defining the Skyline of Modern Rwanda
        </motion.h2>

        <motion.p variants={fadeInUp} style={{ marginBottom: '1.5rem', fontSize: '1.05rem', color: '#222', lineHeight: '1.8' }}>
          NTD BUILD& DESIGN SOLUTION Ltd is a Rwandan-owned construction company dedicated to delivering innovative, sustainable, and high-quality construction solutions. We provide comprehensive services in building construction, civil engineering, infrastructure development, project management, and maintenance.
        </motion.p>

        <motion.p variants={fadeInUp} style={{ marginBottom: '3rem', fontSize: '1.05rem', color: '#222', lineHeight: '1.8' }}>
          Our experienced team combines technical expertise, modern construction practices, and a client-centered approach to deliver projects that meet international standards while supporting Rwanda’s national development agenda. We are committed to professionalism, integrity, safety, quality, and timely project delivery, making us a trusted partner for public institutions, private companies, non-governmental organizations, and individual clients.
        </motion.p>

        <motion.div variants={fadeInUp} style={{ position: 'relative', zIndex: 10 }}>
          <button
            className="btn btn-dark"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2.5rem',
              borderRadius: '30px',
              fontWeight: '600',
              fontSize: '0.85rem',
              letterSpacing: '1px',
              backgroundColor: '#000000',
              color: '#ffffff'
            }}
            onClick={() => navigate('/about')}
          >
            READ MORE <ArrowRight size={16} />
          </button>
        </motion.div>

        {/* Diagonal Stripes Accent matching screenshot */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '400px',
            height: '400px',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          {/* Black corner */}
          <polygon points="100,55 55,100 100,100" fill="#000000" />
          {/* Gold stripe */}
          <polygon points="100,15 15,100 45,100 100,45" fill="#D6AC42" />
        </svg>
      </motion.div>

      {/* Image Column (Shifted to Left) */}
      <div style={{ order: 1, width: '100%', height: '100%', position: 'relative', paddingTop: '2rem' }}>
        <img
          src={imgStadium}
          alt="Skyline of Modern Rwanda"
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopRightRadius: '24px' }}
        />
      </div>

      {/* Mobile Responsiveness */}
      <style>{`
        @media (max-width: 900px) {
          section[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          section[style*="grid-template-columns: 1fr 1fr"] > div:last-child {
            height: 400px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default SkylineSection;