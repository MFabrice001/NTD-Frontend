import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import AdminProjects from '../components/Admin/AdminProjects';

import AdminTeam from '../components/Admin/AdminTeam';

import AdminBlogs from '../components/Admin/AdminBlogs';
import AdminFaqs from '../components/Admin/AdminFaqs';
import AdminOverview from '../components/Admin/AdminOverview';

import AdminReports from '../components/Admin/AdminReports';
import AdminMessages from '../components/Admin/AdminMessages';
import { Menu, Mail, LayoutDashboard, FolderKanban, Users, FileText, HelpCircle, BarChart2 } from 'lucide-react';



const AdminDashboard = () => {

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();



  useEffect(() => {

    // Check for authentication
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      navigate('/login');
      return;
    }
    setToken(storedToken);

    // Verify the token is still valid by making a test request
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/contact-messages`, {
      headers: { 'Authorization': `Bearer ${storedToken}` }
    }).then(res => {
      if (res.status === 403 || res.status === 401) {
        // Token is expired or invalid — force re-login
        localStorage.removeItem('token');
        navigate('/login');
      }
    }).catch(() => {});

  }, [navigate]);



  const handleLogout = () => {

    localStorage.removeItem('token');

    navigate('/login');

  };



  return (

    <div className="admin-page">
      <div className="admin-sidebar" style={{ width: isSidebarOpen ? '260px' : '70px', transition: 'width 0.25s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          {isSidebarOpen && <h2 style={{ color: 'white', margin: 0, fontSize: '1.3rem' }}>Admin Panel</h2>}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '0.5rem', margin: isSidebarOpen ? '0' : '0 auto' }}
          >
            <Menu size={22} />
          </button>

        </div>



        {isSidebarOpen ? (

          <>
            <ul className="admin-nav" style={{ gap: '0.25rem' }}>
              <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
                Dashboard
              </li>
              <li className={activeTab === 'messages' ? 'active' : ''} onClick={() => setActiveTab('messages')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Contact Messages</span>
              </li>
              <li className={activeTab === 'projects' ? 'active' : ''} onClick={() => setActiveTab('projects')}>
                Projects
              </li>
              <li className={activeTab === 'team' ? 'active' : ''} onClick={() => setActiveTab('team')}>
                Team Members
              </li>
              <li className={activeTab === 'blogs' ? 'active' : ''} onClick={() => setActiveTab('blogs')}>
                Blogs
              </li>
              <li className={activeTab === 'faqs' ? 'active' : ''} onClick={() => setActiveTab('faqs')}>
                FAQs
              </li>
              <li className={activeTab === 'reports' ? 'active' : ''} onClick={() => setActiveTab('reports')}>
                Reports
              </li>
            </ul>
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <button onClick={() => navigate('/')} className="btn" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: '100%', padding: '0.5rem', fontSize: '0.85rem' }}>
                &larr; Public Website

              </button>
              <button onClick={handleLogout} className="btn" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: '100%', padding: '0.5rem', fontSize: '0.85rem' }}>
                Logout

              </button>

            </div>

          </>

        ) : (
          <button onClick={handleLogout} className="btn" style={{ marginTop: 'auto', padding: '0.5rem', background: 'transparent', border: 'none', color: 'white' }} title="Logout">
            <span style={{ fontSize: '1.5rem' }}>⎋</span>
          </button>

        )}

      </div>

      <div className="admin-content">

        {activeTab === 'dashboard' && <AdminOverview token={token} />}
        {activeTab === 'messages' && <AdminMessages token={token} />}
        {activeTab === 'projects' && <AdminProjects token={token} />}

        {activeTab === 'team' && <AdminTeam token={token} />}

        {activeTab === 'blogs' && <AdminBlogs token={token} />}
        {activeTab === 'faqs' && <AdminFaqs token={token} />}
        {activeTab === 'reports' && <AdminReports token={token} />}

      </div>

    </div>

  );

};



export default AdminDashboard;

