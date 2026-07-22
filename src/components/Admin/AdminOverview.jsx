import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Building2, Users, FileText } from 'lucide-react';

const AdminOverview = ({ token }) => {
  const [stats, setStats] = useState({ projects: 0, team: 0, blogs: 0 });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch counts from endpoints
    const fetchStats = async () => {
      try {
        const [projRes, teamRes, blogRes] = await Promise.all([
          fetch('http://localhost:8080/api/public/projects'),
          fetch('http://localhost:8080/api/public/team-members'),
          fetch('http://localhost:8080/api/public/blogs')
        ]);
        
        
        const projData = projRes.ok ? await projRes.json() : [];
        const blogData = blogRes.ok ? await blogRes.json() : [];
        const teamData = teamRes.ok ? await teamRes.json() : [];

        setStats({
          projects: projData.length,
          team: teamData.length,
          blogs: blogData.length,
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
    { name: 'Blogs', count: stats.blogs, fill: '#f59e0b' }
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
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem'}}>
        <div className="premium-admin-card" style={{display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid #3b82f6'}}>
          <div style={{background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', padding: '1rem', borderRadius: '12px', color: '#3b82f6', boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.5)'}}>
            <Building2 size={24} />
          </div>
          <div>
            <h3 style={{fontSize: '1.75rem', margin: 0, fontWeight: '800', color: 'var(--color-dark)'}}>{stats.projects}</h3>
            <p style={{margin: 0, color: 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Total Projects</p>
          </div>
        </div>

        <div className="premium-admin-card" style={{display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid #10b981'}}>
          <div style={{background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)', padding: '1rem', borderRadius: '12px', color: '#10b981', boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.5)'}}>
            <Users size={24} />
          </div>
          <div>
            <h3 style={{fontSize: '1.75rem', margin: 0, fontWeight: '800', color: 'var(--color-dark)'}}>{stats.team}</h3>
            <p style={{margin: 0, color: 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Team Members</p>
          </div>
        </div>

        <div className="premium-admin-card" style={{display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid #f59e0b'}}>
          <div style={{background: 'linear-gradient(135deg, #fffbeb, #fef3c7)', padding: '1rem', borderRadius: '12px', color: '#f59e0b', boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.5)'}}>
            <FileText size={24} />
          </div>
          <div>
            <h3 style={{fontSize: '1.75rem', margin: 0, fontWeight: '800', color: 'var(--color-dark)'}}>{stats.blogs}</h3>
            <p style={{margin: 0, color: 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Blog Posts</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem'}}>
        {/* Bar Chart: Content Distribution */}
        <div className="premium-admin-card">
          <h3 style={{marginBottom: '1rem', color: 'var(--color-dark)', fontSize: '1.1rem', fontWeight: '700'}}>Content Distribution</h3>
          <div style={{height: '220px'}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart: Visitor Traffic */}
        <div className="premium-admin-card">
          <h3 style={{marginBottom: '1rem', color: 'var(--color-dark)', fontSize: '1.1rem', fontWeight: '700'}}>Visitor Traffic (This Week)</h3>
          <div style={{height: '220px'}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                <Line type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: 'white'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
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
