import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import AdminProjects from '../components/Admin/AdminProjects';

import AdminTeam from '../components/Admin/AdminTeam';

import AdminBlogs from '../components/Admin/AdminBlogs';

import AdminOverview from '../components/Admin/AdminOverview';

import AdminReports from '../components/Admin/AdminReports';

import { Menu } from 'lucide-react';



const AdminDashboard = () => {

  const [activeTab, setActiveTab] = useState('dashboard');

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();



  useEffect(() => {

    // Check for authentication

    const token = localStorage.getItem('token');

    if (!token) {

      navigate('/login');

    }

  }, [navigate]);



  const handleLogout = () => {

    localStorage.removeItem('token');

    navigate('/login');

  };



  return (

    <div className="admin-page">

      <div className="admin-sidebar" style={{ width: isSidebarOpen ? '280px' : '80px', transition: 'width 0.3s' }}>

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>

          {isSidebarOpen && <h2 style={{color: 'white', margin: 0}}>Admin Panel</h2>}

          <button

            onClick={() => setIsSidebarOpen(!isSidebarOpen)}

            style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '0.5rem', margin: isSidebarOpen ? '0' : '0 auto'}}

          >

            <Menu size={24} />

          </button>

        </div>



        {isSidebarOpen ? (

          <>

            <ul className="admin-nav">

              <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>Dashboard</li>

              <li className={activeTab === 'projects' ? 'active' : ''} onClick={() => setActiveTab('projects')}>Projects</li>

              <li className={activeTab === 'team' ? 'active' : ''} onClick={() => setActiveTab('team')}>Team Members</li>

              <li className={activeTab === 'blogs' ? 'active' : ''} onClick={() => setActiveTab('blogs')}>Blogs</li>

              <li className={activeTab === 'reports' ? 'active' : ''} onClick={() => setActiveTab('reports')}>Reports</li>

            </ul>

            <div style={{marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>

              <button onClick={() => navigate('/')} className="btn" style={{background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: '100%', padding: '0.5rem'}}>

                &larr; Public Website

              </button>

              <button onClick={handleLogout} className="btn" style={{background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: '100%', padding: '0.5rem'}}>

                Logout

              </button>

            </div>

          </>

        ) : (

          <button onClick={handleLogout} className="btn" style={{marginTop: 'auto', padding: '0.5rem', background: 'transparent', border: 'none', color: 'white'}} title="Logout">

            <span style={{fontSize: '1.5rem'}}>⎋</span>

          </button>

        )}

      </div>

     

      <div className="admin-content">

        {activeTab === 'dashboard' && <AdminOverview token={localStorage.getItem('token')} />}

        {activeTab === 'projects' && <AdminProjects token={localStorage.getItem('token')} />}

        {activeTab === 'team' && <AdminTeam token={localStorage.getItem('token')} />}

        {activeTab === 'blogs' && <AdminBlogs token={localStorage.getItem('token')} />}

        {activeTab === 'reports' && <AdminReports token={localStorage.getItem('token')} />}

      </div>

    </div>

  );

};



export default AdminDashboard;  

