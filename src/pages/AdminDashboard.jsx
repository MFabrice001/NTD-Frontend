import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import AdminProjects from '../components/Admin/AdminProjects';

import AdminTeam from '../components/Admin/AdminTeam';

import AdminBlogs from '../components/Admin/AdminBlogs';
import AdminFaqs from '../components/Admin/AdminFaqs';
import AdminOverview from '../components/Admin/AdminOverview';

import AdminReports from '../components/Admin/AdminReports';
import AdminMessages from '../components/Admin/AdminMessages';
import AdminServices from '../components/Admin/AdminServices';
import AdminProfile from '../components/Admin/AdminProfile';
import { Menu, Mail, LayoutDashboard, FolderKanban, Users, FileText, HelpCircle, BarChart2, Search, Bell, Maximize, Plus, User, Layers, Settings } from 'lucide-react';



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
      <div className="orbit-glow-bg"></div>
      <div className="admin-sidebar" style={{ width: isSidebarOpen ? '250px' : '70px', transition: 'width 0.25s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          {isSidebarOpen && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ color: '#38BDF8' }}><Menu size={24} /></div>
              <h2 style={{ color: 'white', margin: 0, fontSize: '1.35rem', fontWeight: '700' }}>NTD Admin</h2>
            </div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{ background: 'none', border: 'none', color: '#879A91', cursor: 'pointer', padding: '0.5rem', margin: isSidebarOpen ? '0' : '0 auto' }}
          >
            <Menu size={22} />
          </button>
        </div>



        {isSidebarOpen ? (

          <>
            <div style={{ overflowY: 'auto', flex: 1, paddingRight: '0.5rem', margin: '0 -0.5rem', paddingLeft: '0.5rem' }}>
              {/* Menu Group */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ color: '#64748b', fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', paddingLeft: '0.75rem' }}>Overview</div>
                <ul className="admin-nav" style={{ gap: '0.25rem' }}>
                  <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <LayoutDashboard size={18} /> <span>Dashboard</span>
                  </li>
                </ul>
              </div>

              {/* Components Group */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ color: '#64748b', fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', paddingLeft: '0.75rem' }}>Apps</div>
                <ul className="admin-nav" style={{ gap: '0.25rem' }}>
                  <li className={activeTab === 'services' ? 'active' : ''} onClick={() => setActiveTab('services')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Layers size={18} /> <span>Services</span>
                  </li>
                  <li className={activeTab === 'projects' ? 'active' : ''} onClick={() => setActiveTab('projects')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <FolderKanban size={18} /> <span>Projects</span>
                  </li>
                  <li className={activeTab === 'blogs' ? 'active' : ''} onClick={() => setActiveTab('blogs')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <FileText size={18} /> <span>Blogs</span>
                  </li>
                </ul>
              </div>

              {/* Pages Group */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ color: '#64748b', fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', paddingLeft: '0.75rem' }}>Settings</div>
                <ul className="admin-nav" style={{ gap: '0.25rem' }}>
                  <li className={activeTab === 'messages' ? 'active' : ''} onClick={() => setActiveTab('messages')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Mail size={18} /> <span>Contact Messages</span>
                    </div>
                  </li>
                  <li className={activeTab === 'team' ? 'active' : ''} onClick={() => setActiveTab('team')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Users size={18} /> <span>Team Members</span>
                  </li>
                  <li className={activeTab === 'faqs' ? 'active' : ''} onClick={() => setActiveTab('faqs')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <HelpCircle size={18} /> <span>FAQs</span>
                  </li>
                  <li className={activeTab === 'reports' ? 'active' : ''} onClick={() => setActiveTab('reports')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <BarChart2 size={18} /> <span>Reports</span>
                  </li>
                  <li className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Settings size={18} /> <span>Profile</span>
                  </li>
                </ul>
              </div>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'var(--orbit-surface2)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--orbit-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38BDF8' }}>
                  <User size={20} />
                </div>
                <div>
                  <div style={{ color: '#f1f5f9', fontWeight: '500', fontSize: '0.85rem' }}>Administrator</div>
                  <div style={{ color: '#64748b', fontSize: '0.75rem' }}>admin@ntd.rw</div>
                </div>
              </div>
              <button onClick={() => navigate('/')} style={{ background: 'transparent', border: 'none', color: '#879A91', textAlign: 'left', padding: '0.25rem 0', fontSize: '0.85rem', cursor: 'pointer' }}>
                &larr; Return to Website
              </button>
              <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: '#EF4444', textAlign: 'left', padding: '0.25rem 0', fontSize: '0.85rem', cursor: 'pointer' }}>
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
        {/* TOP NAVBAR */}
        <header className="admin-top-navbar" style={{ justifyContent: 'flex-end' }}>
          
          <div className="admin-action-icons">
            <button className="admin-action-btn" title="Fullscreen">
              <Maximize size={20} />
            </button>
            <button className="admin-action-btn" title="Notifications">
              <Bell size={20} />
            </button>
            <div
              onClick={() => setActiveTab('profile')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: '0.5rem', paddingLeft: '1rem', borderLeft: '1px solid var(--orbit-border)', cursor: 'pointer' }}
              title="Go to Profile"
            >
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', border: '2px solid var(--orbit-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', fontSize: '0.9rem' }}>
                A
              </div>
              <div style={{ fontWeight: '500', color: '#f1f5f9', fontSize: '0.85rem' }}>Administrator</div>
            </div>
          </div>
        </header>

        {/* MAIN VIEW */}
        <div className="admin-main-view">
          {activeTab === 'dashboard' && <AdminOverview token={token} />}
          {activeTab === 'messages' && <AdminMessages token={token} />}
          {activeTab === 'services' && <AdminServices token={token} />}
          {activeTab === 'projects' && <AdminProjects token={token} />}
          {activeTab === 'team' && <AdminTeam token={token} />}

          {activeTab === 'blogs' && <AdminBlogs token={token} />}
          {activeTab === 'faqs' && <AdminFaqs token={token} />}
          {activeTab === 'reports' && <AdminReports token={token} />}
          {activeTab === 'profile' && <AdminProfile token={token} />}
        </div>
      </div>
    </div>
  );

};



export default AdminDashboard;

