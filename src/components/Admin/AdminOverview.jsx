import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Building2, Users, FileText, Mail } from 'lucide-react';

const AdminOverview = ({ token }) => {
  const [stats, setStats] = useState({ projects: 0, team: 0, blogs: 0, messages: 0 });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch counts from endpoints
    const fetchStats = async () => {
      try {
        const [projRes, teamRes, blogRes, msgRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/projects`),
          fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/team-members`),
          fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/blogs`),
          fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/contact-messages`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);
        
        const projData = projRes.ok ? await projRes.json() : [];
        const blogData = blogRes.ok ? await blogRes.json() : [];
        const teamData = teamRes.ok ? await teamRes.json() : [];
        const msgData = msgRes.ok ? await msgRes.json() : [];

        setStats({
          projects: projData.length,
          team: teamData.length,
          blogs: blogData.length,
          messages: msgData.length,
        });

        // Combine into recent activity feed
        const combined = [
          ...projData.map(p => ({ id: `p-${p.id}`, type: 'Project Added', details: p.title, date: new Date().toISOString() })), // Mock date
          ...blogData.map(b => ({ id: `b-${b.id}`, type: 'Blog Published', details: b.title, date: b.createdAt }))
        ];
        
        combined.sort((a, b) => new Date(b.date) - new Date(a.date));
        setRecentActivity(combined.slice(0, 5)); // Show only top 5 recent

      } catch (e) {
        console.error("Failed to fetch overview stats", e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  const barData = [
    { name: 'Projects', count: stats.projects, fill: '#3b82f6' },
    { name: 'Team', count: stats.team, fill: '#10b981' },
    { name: 'Blogs', count: stats.blogs, fill: '#f59e0b' },
    { name: 'Messages', count: stats.messages, fill: '#8b5cf6' }
  ];

  // Mock data for a "Visitor Traffic" style line chart
  const lineData = [
    { name: 'Mon', visitors: 120 },
    { name: 'Tue', visitors: 200 },
    { name: 'Wed', visitors: 150 },
    { name: 'Thu', visitors: 280 },
    { name: 'Fri', visitors: 220 },
    { name: 'Sat', visitors: 300 },
    { name: 'Sun', visitors: 400 },
  ];

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div>
      <div className="admin-header" style={{marginBottom: '1.5rem'}}>
        <h1 style={{fontSize: '1.8rem', fontWeight: '800', background: 'linear-gradient(90deg, var(--color-dark), var(--color-primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Dashboard Overview</h1>
        <p style={{color: '#6b7280', margin: 0, fontSize: '0.9rem'}}>Welcome back to your premium command center.</p>
      </div>

      {/* Metric Cards */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem'}}>
        {/* Dark Hero Card */}
        <div className="premium-admin-card" style={{ background: '#1E293B', color: 'white', position: 'relative', overflow: 'hidden', borderRadius: '24px', padding: '1.5rem', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
          <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '700' }}>
            ● Live
          </div>
          <h3 style={{fontSize: '2.5rem', margin: '0 0 0.5rem', fontWeight: '800', color: 'white', letterSpacing: '-1px'}}>{stats.projects}</h3>
          <p style={{margin: '0 0 1.5rem', color: '#94A3B8', fontSize: '0.9rem', fontWeight: '500'}}>Total Projects</p>
          <div style={{ color: '#38BDF8', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            ↗ +12% from last month
          </div>
          {/* Decorative Spark Logo Element */}
          <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', color: 'rgba(56, 189, 248, 0.95)' }}>
            <Building2 size={120} strokeWidth={1} />
          </div>
        </div>

        {/* Standard White Cards */}
        <div className="premium-admin-card" style={{ borderRadius: '24px', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{fontSize: '2.5rem', margin: '0 0 0.5rem', fontWeight: '800', color: '#0B130F', letterSpacing: '-1px'}}>{stats.team}</h3>
          <p style={{margin: '0 0 1.5rem', color: '#6C7E75', fontSize: '0.9rem', fontWeight: '500'}}>Team Members</p>
          <div style={{ color: '#22C55E', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            ↗ +4% from last month
          </div>
        </div>

        <div className="premium-admin-card" style={{ borderRadius: '24px', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{fontSize: '2.5rem', margin: '0 0 0.5rem', fontWeight: '800', color: '#0B130F', letterSpacing: '-1px'}}>{stats.blogs}</h3>
          <p style={{margin: '0 0 1.5rem', color: '#6C7E75', fontSize: '0.9rem', fontWeight: '500'}}>Published Blogs</p>
          <div style={{ color: '#22C55E', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            ↗ +2 new this week
          </div>
        </div>

        <div className="premium-admin-card" style={{ borderRadius: '24px', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{fontSize: '2.5rem', margin: '0 0 0.5rem', fontWeight: '800', color: '#0B130F', letterSpacing: '-1px'}}>{stats.messages}</h3>
          <p style={{margin: '0 0 1.5rem', color: '#6C7E75', fontSize: '0.9rem', fontWeight: '500'}}>Unread Messages</p>
          <div style={{ color: '#EF4444', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            ↘ -10% from last month
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem'}}>
        {/* Bar Chart: Content Distribution */}
        <div className="premium-admin-card" style={{ height: '350px', background: '#FFFFFF', padding: '1.5rem' }}>
          <h3 style={{fontSize: '1.1rem', marginBottom: '1.5rem', color: '#0B130F'}}>Overview Metrics</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E9EFEF" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6C7E75', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#6C7E75', fontSize: 12}} dx={-10} />
              <Tooltip cursor={{fill: '#F4F6F5'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}} />
              <Bar dataKey="count" fill="#B4F105" radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart: Visitor Traffic */}
        <div className="premium-admin-card" style={{ height: '350px', background: '#FFFFFF', padding: '1.5rem' }}>
          <h3 style={{fontSize: '1.1rem', marginBottom: '1.5rem', color: '#0B130F'}}>Traffic Trends</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E9EFEF" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6C7E75', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#6C7E75', fontSize: 12}} dx={-10} />
              <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}} />
              <Line type="monotone" dataKey="visitors" stroke="#051C12" strokeWidth={3} dot={{r: 4, fill: '#B4F105', strokeWidth: 2}} activeDot={{r: 6}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="premium-admin-card" style={{marginTop: '1.5rem'}}>
        <h3 style={{marginBottom: '1rem', color: 'var(--color-dark)', fontSize: '1.1rem', fontWeight: '700'}}>Recent Activity</h3>
        <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{borderBottom: '2px solid #eee'}}>
              <th style={{padding: '0.75rem 0', color: '#6b7280', fontSize: '0.85rem', textTransform: 'uppercase'}}>Date</th>
              <th style={{color: '#6b7280', fontSize: '0.85rem', textTransform: 'uppercase'}}>Action</th>
              <th style={{color: '#6b7280', fontSize: '0.85rem', textTransform: 'uppercase'}}>Details</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.length === 0 ? <tr><td colSpan="3" style={{padding: '1rem 0'}}>No recent activity.</td></tr> : null}
            {recentActivity.map(activity => (
              <tr key={activity.id} style={{borderBottom: '1px solid #f9fafb'}}>
                <td style={{padding: '1rem 0', color: '#6b7280', fontSize: '0.9rem'}}>
                  {new Date(activity.date).toLocaleDateString()}
                </td>
                <td>
                  <span style={{
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '999px', 
                    fontSize: '0.75rem', 
                    fontWeight: 600,
                    backgroundColor: activity.type.includes('Project') ? '#eff6ff' : '#fffbeb',
                    color: activity.type.includes('Project') ? '#3b82f6' : '#f59e0b'
                  }}>
                    {activity.type}
                  </span>
                </td>
                <td style={{fontWeight: '500', color: 'var(--color-dark)', fontSize: '0.95rem'}}>{activity.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOverview;
