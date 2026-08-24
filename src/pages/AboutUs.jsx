import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Target, CheckCircle2, ShieldCheck, Leaf, Briefcase, Award, Lightbulb, Users, ThumbsUp, Activity } from 'lucide-react';
import Footer from '../components/Footer';
import VisionariesSection from '../components/VisionariesSection';
import heroImage from '../images/co image.jpg';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const coreValues = [
    { icon: <Award size={24} />, title: "Integrity" },
    { icon: <CheckCircle2 size={24} />, title: "Excellence" },
    { icon: <Briefcase size={24} />, title: "Professionalism" },
    { icon: <Lightbulb size={24} />, title: "Innovation" },
    { icon: <Target size={24} />, title: "Accountability" },
    { icon: <ShieldCheck size={24} />, title: "Safety" },
    { icon: <Users size={24} />, title: "Teamwork" },
    { icon: <ThumbsUp size={24} />, title: "Customer Satisfaction" },
    { icon: <Leaf size={24} />, title: "Sustainability" }
  ];

  return (
    <div style={{ backgroundColor: '#FCF9EE', minHeight: '100vh', paddingTop: '6rem' }}>
      
      {/* Modern Hero Section */}
      <div style={{ padding: '2rem 5%' }}>
        <motion.div 
          initial="hidden" animate="visible" variants={fadeInUp}
          style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'left', marginBottom: '4rem' }}
        >
          <span style={{ color: '#94A3B8', fontWeight: '600', fontSize: '16px' }}>
            About us
          </span>
          <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#0F172A', marginTop: '1rem', lineHeight: '1.2' }}>
            Building <span style={{ color: 'var(--color-primary)' }}>&</span> Design Solutions
          </h1>
          <p style={{ color: '#475569', fontSize: '16px', maxWidth: '800px', margin: '1.5rem 0 0', lineHeight: '1.6' }}>
            Delivering innovative, sustainable, and high-quality construction solutions across Rwanda.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: '1200px', margin: '0 auto' }}
        >
          <div style={{
            height: '500px',
            borderRadius: '24px',
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }} />
        </motion.div>
      </div>

      {/* Company Profile Section */}
      <div style={{ padding: '6rem 5%' }}>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}
        >
          <motion.span variants={fadeInUp} style={{ color: 'var(--color-primary)', fontWeight: '800', letterSpacing: '2px', fontSize: '0.9rem', textTransform: 'uppercase' }}>
            Our Profile
          </motion.span>
          <motion.h2 variants={fadeInUp} style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0F172A', marginTop: '1rem', marginBottom: '2rem' }}>
            A Legacy of Excellence
          </motion.h2>
          <motion.p variants={fadeInUp} style={{ fontSize: '1.15rem', color: '#475569', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            NTD BUILD & DESIGN SOLUTION Ltd is a Rwandan-owned construction company dedicated to delivering innovative, sustainable, and high-quality construction solutions. We provide comprehensive services in building construction, civil engineering, infrastructure development, project management, and maintenance.
          </motion.p>
          <motion.p variants={fadeInUp} style={{ fontSize: '1.15rem', color: '#475569', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            Our experienced team combines technical expertise, modern construction practices, and a client-centered approach to deliver projects that meet international standards while supporting Rwanda’s national development agenda.
          </motion.p>
          <motion.p variants={fadeInUp} style={{ fontSize: '1.15rem', color: '#475569', lineHeight: '1.8' }}>
            We are committed to professionalism, integrity, safety, quality, and timely project delivery, making us a trusted partner for public institutions, private companies, non-governmental organizations, and individual clients.
          </motion.p>
        </motion.div>
      </div>

      {/* Vision & Mission (2-Column Floating Cards) */}
      <div style={{ padding: '2rem 5% 6rem' }}>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}
        >
          <motion.div variants={fadeInUp} style={{ background: '#FFFFFF', padding: '3.5rem', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', textAlign: 'left' }}>
            <div style={{ width: '80px', height: '80px', background: 'transparent', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', margin: '0 0 1.5rem', color: '#D32F2F' }}>
              <Eye size={48} strokeWidth={2.5} />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', marginBottom: '1rem' }}>Our Vision</h3>
            <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '16px' }}>
              To become one of Rwanda’s most trusted and innovative construction companies, delivering world-class infrastructure that improves communities and contributes to sustainable national development.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} style={{ background: '#FFFFFF', padding: '3.5rem', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', textAlign: 'left' }}>
            <div style={{ width: '80px', height: '80px', background: 'transparent', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', margin: '0 0 1.5rem', color: '#D32F2F' }}>
              <Target size={48} strokeWidth={2.5} />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', marginBottom: '1rem' }}>Our Mission</h3>
            <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '16px' }}>
              To provide reliable, cost-effective, and sustainable construction services by applying modern engineering practices, skilled workmanship, and efficient project management while exceeding our clients’ expectations.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Core Values (3-Column Grid) */}
      <div style={{ padding: '6rem 5%', background: '#FFFFFF' }}>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          style={{ maxWidth: '1200px', margin: '0 auto' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <motion.span variants={fadeInUp} style={{ color: 'var(--color-primary)', fontWeight: '800', letterSpacing: '2px', fontSize: '0.9rem', textTransform: 'uppercase' }}>
              Our Foundation
            </motion.span>
            <motion.h2 variants={fadeInUp} style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0F172A', marginTop: '1rem' }}>
              Core Values
            </motion.h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {coreValues.map((value, idx) => (
              <motion.div key={idx} variants={fadeInUp} style={{ 
                background: '#F8FAFC', 
                padding: '2rem', 
                borderRadius: '100px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1.5rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                border: '1px solid #F1F5F9'
              }}>
                <div style={{ width: '48px', height: '48px', background: '#FFFFFF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0F172A', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  {value.icon}
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1E293B', margin: 0 }}>{value.title}</h4>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quality, HSE, Sustainability & Commitment (Dark Block) */}
      <div style={{ padding: '8rem 5%', backgroundColor: '#0F172A', color: '#FFFFFF' }}>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}
        >
          <motion.div variants={fadeInUp}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <ShieldCheck size={32} color="var(--color-primary)" />
              <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#FFFFFF' }}>Quality Policy & HSE</h3>
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#CBD5E1', marginBottom: '0.8rem' }}>Quality Policy</h4>
              <p style={{ color: '#94A3B8', lineHeight: '1.8' }}>
                We are committed to delivering defects-free projects that comply with national and international quality standards. We continuously train our staff, optimize our processes, and utilize high-quality materials to ensure durability and aesthetic appeal.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#CBD5E1', marginBottom: '0.8rem' }}>Health, Safety, & Environment (HSE)</h4>
              <p style={{ color: '#94A3B8', lineHeight: '1.8' }}>
                Safety is our priority. We maintain strict safety protocols to protect our workers, subcontractors, clients, and the public. We enforce zero-harm policies on all sites and ensure compliance with occupational health and safety regulations.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <div style={{ marginBottom: '4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <Leaf size={32} color="var(--color-primary)" />
                <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#FFFFFF' }}>Sustainability</h3>
              </div>
              <p style={{ color: '#94A3B8', lineHeight: '1.8' }}>
                As part of our commitment to environmental conservation, we integrate sustainable construction methods, prioritize eco-friendly materials, optimize energy efficiency, and properly manage construction waste.
              </p>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <Activity size={32} color="var(--color-primary)" />
                <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#FFFFFF' }}>Our Commitment</h3>
              </div>
              <p style={{ color: '#94A3B8', lineHeight: '1.8' }}>
                NTD BUILD & DESIGN SOLUTION Ltd remains steadfast in our mission to build structures that inspire, endure, and positively impact communities. We look forward to partnering with you to bring your construction vision to life.
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Led by Visionaries Section */}
      <div style={{ position: 'relative', zIndex: 10, background: '#0F172A' }}>
        <VisionariesSection />
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
