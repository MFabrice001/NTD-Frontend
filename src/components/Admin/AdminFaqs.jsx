import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, HelpCircle, Check, X, AlertCircle } from 'lucide-react';

const CATEGORIES = [
  'Architectural Design',
  'Engineering & Construction',
  'Project Timelines & Cost',
  'Sustainability',
  'Client Process'
];

const AdminFaqs = ({ token }) => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);

  const [formData, setFormData] = useState({
    category: 'Architectural Design',
    question: '',
    answer: ''
  });

  const [submitting, setSubmitting] = useState(false);

  const fetchFaqs = () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/faqs`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch FAQs');
        return res.json();
      })
      .then(data => {
        setFaqs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading faqs:', err);
        setError('Failed to load FAQs.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const openNewModal = () => {
    setEditingFaq(null);
    setFormData({
      category: 'Architectural Design',
      question: '',
      answer: ''
    });
    setShowModal(true);
  };

  const openEditModal = (faq) => {
    setEditingFaq(faq);
    let cat = 'Architectural Design';
    let qText = faq.question || '';
    if (qText.startsWith('[') && qText.includes(']')) {
      cat = qText.split(']')[0].replace('[', '').trim();
      qText = qText.split(']')[1].trim();
    }
    setFormData({
      category: cat,
      question: qText,
      answer: faq.answer || ''
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) {
      alert('Please fill out both question and answer.');
      return;
    }

    setSubmitting(true);
    const storedQuestion = `[${formData.category}] ${formData.question.trim()}`;
    const payload = {
      question: storedQuestion,
      answer: formData.answer.trim()
    };

    const url = editingFaq
      ? `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/faqs/${editingFaq.id}`
      : `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/faqs`;

    const method = editingFaq ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to save FAQ.');
      }

      setShowModal(false);
      fetchFaqs();
    } catch (err) {
      console.error('Save FAQ error:', err);
      alert('Error saving FAQ.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/faqs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Failed to delete');
      setFaqs(faqs.filter(item => item.id !== id));
    } catch (err) {
      console.error('Delete FAQ error:', err);
      alert('Failed to delete FAQ.');
    }
  };

  return (
    <div className="admin-section">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <div>
          <h2 style={{fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-dark)', margin: 0}}>
            Knowledge Base & FAQ Studio
          </h2>
          <p style={{color: '#64748b', margin: '0.35rem 0 0'}}>
            Manage public FAQ entries, categorize inquiries, and publish architectural & engineering answers.
          </p>
        </div>
        <button 
          className="btn" 
          onClick={openNewModal}
          style={{background: 'var(--color-primary)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700}}
        >
          <Plus size={18} /> New FAQ Question
        </button>
      </div>

      {loading ? (
        <div className="loading-state">Loading FAQs...</div>
      ) : error ? (
        <div className="error-state">{error}</div>
      ) : faqs.length === 0 ? (
        <div style={{textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0'}}>
          <HelpCircle size={48} color="#9ca3af" style={{margin: '0 auto 1rem'}} />
          <h3>No Custom FAQs Created Yet</h3>
          <p style={{color: '#64748b', maxWidth: '450px', margin: '0.5rem auto 1.5rem'}}>
            Add your first custom FAQ entry to display it at the top of your public Knowledge Base!
          </p>
          <button 
            className="btn btn-dark"
            onClick={openNewModal}
            style={{padding: '0.65rem 1.5rem', borderRadius: '30px'}}
          >
            Create First FAQ
          </button>
        </div>
      ) : (
        <div style={{background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden'}}>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left'}}>
                <th style={{padding: '1rem 1.5rem', fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase'}}>Category</th>
                <th style={{padding: '1rem 1.5rem', fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase'}}>Question</th>
                <th style={{padding: '1rem 1.5rem', fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase'}}>Answer Snippet</th>
                <th style={{padding: '1rem 1.5rem', fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', textAlign: 'right'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {faqs.map(faq => {
                let cat = 'Architectural Design';
                let qText = faq.question || '';
                if (qText.startsWith('[') && qText.includes(']')) {
                  cat = qText.split(']')[0].replace('[', '').trim();
                  qText = qText.split(']')[1].trim();
                }

                return (
                  <tr key={faq.id} style={{borderBottom: '1px solid #f1f5f9'}}>
                    <td style={{padding: '1rem 1.5rem'}}>
                      <span style={{background: '#f1f5f9', color: '#475569', padding: '0.25rem 0.65rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700}}>
                        {cat}
                      </span>
                    </td>
                    <td style={{padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--color-dark)'}}>
                      {qText}
                    </td>
                    <td style={{padding: '1rem 1.5rem', color: '#64748b', maxWidth: '350px'}}>
                      {faq.answer?.substring(0, 80)}{faq.answer?.length > 80 ? '...' : ''}
                    </td>
                    <td style={{padding: '1rem 1.5rem', textAlign: 'right'}}>
                      <div style={{display: 'flex', gap: '0.5rem', justifyContent: 'flex-end'}}>
                        <button 
                          onClick={() => openEditModal(faq)}
                          style={{background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.45rem', borderRadius: '8px', cursor: 'pointer', color: '#475569'}}
                          title="Edit Question"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(faq.id)}
                          style={{background: '#fff1f2', border: '1px solid #fecdd3', padding: '0.45rem', borderRadius: '8px', cursor: 'pointer', color: '#e11d48'}}
                          title="Delete Question"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* FAQ Studio Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1.5rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '600px',
            padding: '2rem',
            boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
            position: 'relative'
          }}>
            <button 
              onClick={() => setShowModal(false)}
              style={{position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af'}}
            >
              <X size={22} />
            </button>

            <h3 style={{fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-dark)', margin: '0 0 0.5rem'}}>
              {editingFaq ? 'Edit FAQ Entry' : 'Create New FAQ Entry'}
            </h3>
            <p style={{color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem'}}>
              This answer will be immediately published to the public FAQ Knowledge Base.
            </p>

            <form onSubmit={handleSave}>
              <div style={{marginBottom: '1.25rem'}}>
                <label style={{display: 'block', fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-dark)', marginBottom: '0.4rem'}}>
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '10px',
                    fontSize: '0.95rem',
                    color: 'var(--color-dark)',
                    background: 'white'
                  }}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div style={{marginBottom: '1.25rem'}}>
                <label style={{display: 'block', fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-dark)', marginBottom: '0.4rem'}}>
                  Question Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., What are your commercial seismic safety standards?"
                  value={formData.question}
                  onChange={e => setFormData({ ...formData, question: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '10px',
                    fontSize: '0.95rem',
                    color: 'var(--color-dark)'
                  }}
                />
              </div>

              <div style={{marginBottom: '2rem'}}>
                <label style={{display: 'block', fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-dark)', marginBottom: '0.4rem'}}>
                  Comprehensive Answer *
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Provide an authoritative, detailed answer..."
                  value={formData.answer}
                  onChange={e => setFormData({ ...formData, answer: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '10px',
                    fontSize: '0.95rem',
                    color: 'var(--color-dark)',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div style={{display: 'flex', justifyContent: 'flex-end', gap: '1rem'}}>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowModal(false)}
                  style={{background: '#f1f5f9', color: '#475569', padding: '0.75rem 1.5rem', borderRadius: '30px', fontWeight: 700}}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn"
                  style={{background: 'var(--color-primary)', color: 'white', padding: '0.75rem 2rem', borderRadius: '30px', fontWeight: 700, opacity: submitting ? 0.7 : 1}}
                >
                  {submitting ? 'Publishing...' : 'Publish Question'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFaqs;
