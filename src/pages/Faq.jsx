import React, { useState, useEffect, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, CheckCircle2, Building2, Clock, DollarSign, Leaf, PhoneCall, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';



const CATEGORIES = [
  'All',
  'Architectural Design',
  'Engineering & Construction',
  'Project Timelines & Cost',
  'Sustainability',
  'Client Process'
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openItems, setOpenItems] = useState([]);
  const [adminFaqs, setAdminFaqs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/faqs`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load FAQs');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          // Format admin FAQs to include category (defaulting to Architectural Design or parsing if stored)
          const formatted = data.map(item => ({
            id: `admin-${item.id}`,
            category: item.question?.includes('[') ? item.question.split(']')[0].replace('[', '').trim() : 'Architectural Design',
            question: item.question?.includes(']') ? item.question.split(']')[1].trim() : item.question,
            answer: item.answer,
            isAdmin: true
          }));
          setAdminFaqs(formatted);
        }
      })
      .catch(err => console.error('Error fetching admin FAQs:', err));
  }, []);

  const toggleAccordion = (id) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter(item => item !== id));
    } else {
      setOpenItems([...openItems, id]);
    }
  };

  const filteredFAQs = useMemo(() => {
    return adminFaqs.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch = !query || 
        item.question.toLowerCase().includes(query) || 
        item.answer.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory, adminFaqs]);

  return (
    <div className="faq-page">
      {/* Hero Header */}
      <div className="faq-hero">
        <span style={{fontSize: '0.85rem', fontWeight: '700', letterSpacing: '2px', color: 'var(--color-primary)', textTransform: 'uppercase'}}>
          Knowledge & Transparency
        </span>
        <h1 style={{marginTop: '0.5rem'}}>Frequently Asked Questions</h1>
        <p>
          Everything you need to know about our architectural commissions, engineering standards, project timelines, and engagement process.
        </p>
      </div>

      {/* Interactive Search Bar */}
      <div className="faq-search-container">
        <div className="faq-search-box">
          <Search size={20} color="#64748b" style={{marginRight: '0.5rem'}} />
          <input 
            type="text" 
            className="faq-search-input" 
            placeholder="Search questions by topic, engineering standard, or keyword..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')} 
              style={{background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '0.25rem'}}
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="faq-categories-bar">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`faq-category-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat === 'Architectural Design' && <Building2 size={15} />}
            {cat === 'Engineering & Construction' && <CheckCircle2 size={15} />}
            {cat === 'Project Timelines & Cost' && <Clock size={15} />}
            {cat === 'Sustainability' && <Leaf size={15} />}
            {cat === 'Client Process' && <HelpCircle size={15} />}
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion Questions List */}
      <div className="faq-accordion-container">
        {filteredFAQs.length === 0 ? (
          <div style={{textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0'}}>
            <HelpCircle size={48} color="#9ca3af" style={{margin: '0 auto 1rem'}} />
            <h3 style={{fontSize: '1.4rem', color: 'var(--color-dark)', marginBottom: '0.5rem'}}>
              No questions found
            </h3>
            <p style={{color: '#64748b', maxWidth: '450px', margin: '0 auto'}}>
              We couldn't find an answer matching your search. Please try another keyword or contact our engineering team directly.
            </p>
          </div>
        ) : (
          filteredFAQs.map(item => {
            const isOpen = openItems.includes(item.id);
            return (
              <div 
                key={item.id} 
                className={`faq-accordion-item ${isOpen ? 'open' : ''}`}
              >
                <div 
                  className="faq-accordion-header"
                  onClick={() => toggleAccordion(item.id)}
                >
                  <div className="faq-question-left">
                    <span className="faq-category-badge">{item.category}</span>
                    <span className="faq-question-title">{item.question}</span>
                  </div>
                  <div className="faq-accordion-toggle-icon">
                    <ChevronDown size={20} />
                  </div>
                </div>

                {isOpen && (
                  <div className="faq-accordion-body">
                    <p style={{margin: 0}}>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still Have Questions Heading ABOVE the Blue Frame */}
      <h2 className="faq-cta-section-title">Still Have Questions?</h2>

      {/* Blue Frame Call-to-Action Banner */}
      <div className="faq-cta-banner">
        <p>
          Our principal architects and structural engineers are ready to discuss your custom project vision, evaluate your site, or answer any technical inquiries.
        </p>
        <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center'}}>
          <button 
            className="btn" 
            style={{background: 'var(--color-primary)', color: 'white', padding: '0.85rem 2rem', fontWeight: '700', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '0.5rem'}}
            onClick={() => navigate('/contact')}
          >
            Schedule Consultation <ArrowRight size={18} />
          </button>
          <button 
            className="btn" 
            style={{background: 'rgba(255,255,255,0.15)', color: 'white', padding: '0.85rem 2rem', fontWeight: '700', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: '0.5rem'}}
            onClick={() => navigate('/contact')}
          >
            <PhoneCall size={18} /> Call Kigali Office
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
