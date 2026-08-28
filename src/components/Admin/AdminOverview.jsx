import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Building2, Users, FileText, Mail, DollarSign, Activity, TrendingUp, Download, Plus } from 'lucide-react';

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

  const sparkline1 = [{v: 10}, {v: 12}, {v: 11}, {v: 15}, {v: 14}, {v: 18}, {v: 20}];
  const sparkline2 = [{v: 5}, {v: 8}, {v: 6}, {v: 9}, {v: 11}, {v: 10}, {v: 12}];
  const sparkline3 = [{v: 2}, {v: 3}, {v: 4}, {v: 4}, {v: 5}, {v: 6}, {v: 8}];
  const sparkline4 = [{v: 20}, {v: 18}, {v: 19}, {v: 15}, {v: 14}, {v: 12}, {v: 10}];

  const revenueData = [
    { name: 'Jan', revenue: 40000, expenses: 28000 },
    { name: 'Feb', revenue: 55000, expenses: 32000 },
    { name: 'Mar', revenue: 48000, expenses: 30000 },
    { name: 'Apr', revenue: 75000, expenses: 38000 },
    { name: 'May', revenue: 95000, expenses: 40000 },
    { name: 'Jun', revenue: 105000, expenses: 42000 },
    { name: 'Jul', revenue: 115000, expenses: 45000 },
    { name: 'Aug', revenue: 100000, expenses: 46000 },
    { name: 'Sep', revenue: 110000, expenses: 50000 },
    { name: 'Oct', revenue: 128000, expenses: 52000 },
    { name: 'Nov', revenue: 140000, expenses: 54000 },
    { name: 'Dec', revenue: 155000, expenses: 58000 },
  ];

  const trafficData = [
    { name: 'Projects', value: stats.projects || 1, color: '#7C3AED' },
    { name: 'Team', value: stats.team || 1, color: '#06B6D4' },
    { name: 'Blogs', value: stats.blogs || 1, color: '#10B981' },
    { name: 'Messages', value: stats.messages || 1, color: '#F59E0B' },
  ];

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div style={{ paddingBottom: '2rem' }}>
      {/* Header Area */}
      <div className="admin-header" style={{ marginBottom: '2rem' }}>
        <h1 style={{fontSize: '1.75rem', fontWeight: '700', color: '#f1f5f9', margin: '0 0 0.25rem', letterSpacing: '-0.5px'}}>Dashboard Overview</h1>
        <p style={{color: '#64748b', margin: 0, fontSize: '0.9rem'}}>Welcome back to your premium command center.</p>
      </div>

      {/* Metric Cards */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem'}}>
        {/* Card 1: Revenue */}
        <div className="premium-admin-card" style={{ padding: '1.25rem 0 0 0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '0 1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(124, 58, 237, 0.1)', color: '#A78BFA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 size={18} />
              </div>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <TrendingUp size={12} /> 12.5%
              </div>
            </div>
            <p style={{margin: '0 0 0.25rem', color: '#64748b', fontSize: '0.85rem', fontWeight: '500'}}>Total Projects</p>
            <h3 style={{fontSize: '1.75rem', margin: '0 0 0.5rem', fontWeight: '700', color: '#f1f5f9', letterSpacing: '-0.5px'}}>{stats.projects}</h3>
            <p style={{margin: '0', color: '#64748b', fontSize: '0.75rem'}}>Total active projects</p>
          </div>
          <div style={{ height: '60px', marginTop: 'auto' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkline1}>
                <defs>
                  <linearGradient id="sparkPurple" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.2}/>
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#7C3AED" fill="url(#sparkPurple)" strokeWidth={2} isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 2: Active Users */}
        <div className="premium-admin-card" style={{ padding: '1.25rem 0 0 0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '0 1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.1)', color: '#22D3EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={18} />
              </div>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <TrendingUp size={12} /> 8.2%
              </div>
            </div>
            <p style={{margin: '0 0 0.25rem', color: '#64748b', fontSize: '0.85rem', fontWeight: '500'}}>Team Members</p>
            <h3 style={{fontSize: '1.75rem', margin: '0 0 0.5rem', fontWeight: '700', color: '#f1f5f9', letterSpacing: '-0.5px'}}>{stats.team}</h3>
            <p style={{margin: '0', color: '#64748b', fontSize: '0.75rem'}}>Registered members</p>
          </div>
          <div style={{ height: '60px', marginTop: 'auto' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkline2}>
                <defs>
                  <linearGradient id="sparkCyan" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.2}/>
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#06B6D4" fill="url(#sparkCyan)" strokeWidth={2} isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 3: Subscriptions */}
        <div className="premium-admin-card" style={{ padding: '1.25rem 0 0 0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '0 1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={18} />
              </div>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <TrendingUp size={12} /> 23.1%
              </div>
            </div>
            <p style={{margin: '0 0 0.25rem', color: '#64748b', fontSize: '0.85rem', fontWeight: '500'}}>Published Blogs</p>
            <h3 style={{fontSize: '1.75rem', margin: '0 0 0.5rem', fontWeight: '700', color: '#f1f5f9', letterSpacing: '-0.5px'}}>{stats.blogs}</h3>
            <p style={{margin: '0', color: '#64748b', fontSize: '0.75rem'}}>Live articles</p>
          </div>
          <div style={{ height: '60px', marginTop: 'auto' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkline3}>
                <defs>
                  <linearGradient id="sparkEmerald" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.2}/>
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#10B981" fill="url(#sparkEmerald)" strokeWidth={2} isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 4: Churn Rate */}
        <div className="premium-admin-card" style={{ padding: '1.25rem 0 0 0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '0 1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={18} />
              </div>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <TrendingUp size={12} /> 0.3%
              </div>
            </div>
            <p style={{margin: '0 0 0.25rem', color: '#64748b', fontSize: '0.85rem', fontWeight: '500'}}>Unread Messages</p>
            <h3 style={{fontSize: '1.75rem', margin: '0 0 0.5rem', fontWeight: '700', color: '#f1f5f9', letterSpacing: '-0.5px'}}>{stats.messages}</h3>
            <p style={{margin: '0', color: '#64748b', fontSize: '0.75rem'}}>Pending review</p>
          </div>
          <div style={{ height: '60px', marginTop: 'auto' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkline4}>
                <defs>
                  <linearGradient id="sparkAmber" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.2}/>
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#F59E0B" fill="url(#sparkAmber)" strokeWidth={2} isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1.5rem'}}>
        {/* Dual Area Chart: Revenue Overview */}
        <div className="premium-admin-card" style={{ height: '420px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <h3 style={{fontSize: '1.05rem', color: '#f1f5f9', margin: '0 0 0.25rem'}}>Revenue Overview</h3>
              <p style={{color: '#64748b', fontSize: '0.85rem', margin: 0}}>Monthly revenue vs expenses</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['7D', '30D', '90D', '1Y'].map((filter, i) => (
                <button key={filter} style={{ background: filter === '1Y' ? 'var(--orbit-primary)' : 'transparent', color: filter === '1Y' ? 'white' : '#64748b', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' }}>
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.4}/>
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="expArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.4}/>
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip contentStyle={{borderRadius: '8px', border: '1px solid var(--orbit-border)', background: 'var(--orbit-surface)', color: '#f1f5f9'}} formatter={(value) => `$${(value/1000).toFixed(0)}k`} />
                <Area type="monotone" dataKey="revenue" stroke="#7C3AED" fill="url(#revArea)" strokeWidth={3} dot={false} activeDot={{r: 6, fill: '#0B0F19', stroke: '#7C3AED', strokeWidth: 2}} />
                <Area type="monotone" dataKey="expenses" stroke="#06B6D4" fill="url(#expArea)" strokeWidth={3} dot={false} activeDot={{r: 6, fill: '#0B0F19', stroke: '#06B6D4', strokeWidth: 2}} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', borderTop: '1px solid var(--orbit-border)', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.85rem' }}>
                <span style={{ width: '12px', height: '2px', background: '#7C3AED', display: 'inline-block' }}></span> Revenue
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.85rem' }}>
                <span style={{ width: '12px', height: '2px', background: '#06B6D4', display: 'inline-block' }}></span> Expenses
              </div>
            </div>
            <div style={{ color: '#64748b', fontSize: '0.85rem' }}>
              Net profit: <span style={{ color: '#10B981', fontWeight: '600' }}>$87k</span> this month
            </div>
          </div>
        </div>

        {/* Traffic Sources Donut Chart */}
        <div className="premium-admin-card" style={{ height: '420px', display: 'flex', flexDirection: 'column' }}>
          <div>
            <h3 style={{fontSize: '1.05rem', color: '#f1f5f9', margin: '0 0 0.25rem'}}>Traffic Sources</h3>
            <p style={{color: '#64748b', fontSize: '0.85rem', margin: 0}}>Last 30 days</p>
          </div>
          <div style={{ height: '180px', margin: '1rem 0' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={trafficData} innerRadius={55} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{borderRadius: '8px', border: '1px solid var(--orbit-border)', background: 'var(--orbit-surface)', color: '#f1f5f9'}} itemStyle={{color: '#f1f5f9'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
            {trafficData.map(source => (
              <div key={source.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '80px', color: '#94a3b8' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: source.color, display: 'inline-block' }}></span> {source.name}
                </div>
                <div style={{ flex: 1, margin: '0 1rem', height: '4px', background: 'var(--orbit-surface2)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${source.value}%`, background: source.color, borderRadius: '2px' }}></div>
                </div>
                <div style={{ color: '#f1f5f9', width: '30px', textAlign: 'right' }}>{source.value}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="premium-admin-card" style={{marginTop: '1rem'}}>
        <h3 style={{marginBottom: '0.75rem', color: '#f1f5f9', fontSize: '1.05rem', fontWeight: '700'}}>Recent Activity</h3>
        <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{borderBottom: '1px solid var(--orbit-border)'}}>
              <th style={{padding: '0.75rem 0.5rem', color: '#64748b', fontWeight: '600', fontSize: '0.85rem'}}>Event</th>
              <th style={{padding: '0.75rem 0.5rem', color: '#64748b', fontWeight: '600', fontSize: '0.85rem'}}>Date</th>
              <th style={{padding: '0.75rem 0.5rem', color: '#64748b', fontWeight: '600', fontSize: '0.85rem'}}>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan="3" style={{padding: '1rem', color: '#64748b'}}>Loading activity...</td></tr> : recentActivity.map((activity, idx) => (
              <tr key={idx} style={{borderBottom: '1px solid var(--orbit-border)', transition: 'background 0.2s'}}>
                <td style={{padding: '1rem 0.5rem', color: '#f1f5f9', fontSize: '0.9rem'}}>{activity.description}</td>
                <td style={{padding: '1rem 0.5rem', color: '#64748b', fontSize: '0.85rem'}}>{activity.date}</td>
                <td style={{padding: '1rem 0.5rem'}}>
                  <span style={{
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '50px', 
                    fontSize: '0.75rem', 
                    fontWeight: '600',
                    background: activity.status === 'Completed' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                    color: activity.status === 'Completed' ? '#10B981' : '#F59E0B'
                  }}>
                    {activity.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOverview;
