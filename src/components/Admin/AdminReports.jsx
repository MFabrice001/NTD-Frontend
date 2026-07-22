import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

const AdminReports = ({ token }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from a specific /api/admin/audit-logs endpoint.
    // For now, we will simulate a report by fetching projects and blogs and combining them into an activity feed.
    const fetchReportData = async () => {
      try {
        const [projRes, blogRes] = await Promise.all([
          fetch('http://localhost:8080/api/public/projects'),
          fetch('http://localhost:8080/api/public/blogs')
        ]);
        
        const projects = projRes.ok ? await projRes.json() : [];
        const blogs = blogRes.ok ? await blogRes.json() : [];
        
        // Map into a unified format for the report table
        const combined = [
          ...projects.map(p => ({ id: `p-${p.id}`, type: 'Project Added', details: p.title, date: new Date().toISOString() })), // Mock date since project doesn't have createdAt
          ...blogs.map(b => ({ id: `b-${b.id}`, type: 'Blog Published', details: b.title, date: b.createdAt }))
        ];
        
        // Sort by date newest first
        combined.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        setLogs(combined);
      } catch (e) {
        console.error("Failed to fetch report data", e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReportData();
  }, []);

  const handleDownloadCSV = () => {
    // Mock CSV download functionality
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Date,Action,Details\n"
      + logs.map(e => `${new Date(e.date).toLocaleDateString()},${e.type},"${e.details}"`).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "nd_system_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>System Reports</h1>
          <p style={{color: '#6b7280', margin: 0}}>Review recent system activity and export data.</p>
        </div>
        <button className="btn btn-dark" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}} onClick={handleDownloadCSV}>
          <Download size={18} />
          Export to CSV
        </button>
      </div>

      <div className="admin-card">
        {loading ? <p>Loading report data...</p> : (
          <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{borderBottom: '2px solid #eee'}}>
                <th style={{padding: '1rem 0'}}>Date</th>
                <th>Action Type</th>
                <th>Details</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? <tr><td colSpan="4" style={{padding: '1rem 0'}}>No activity found to report.</td></tr> : null}
              {logs.map(log => (
                <tr key={log.id} style={{borderBottom: '1px solid #eee'}}>
                  <td style={{padding: '1rem 0', color: '#6b7280'}}>
                    {new Date(log.date).toLocaleString()}
                  </td>
                  <td>
                    <span style={{
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '999px', 
                      fontSize: '0.75rem', 
                      fontWeight: 600,
                      backgroundColor: log.type.includes('Project') ? '#eff6ff' : '#fffbeb',
                      color: log.type.includes('Project') ? '#3b82f6' : '#f59e0b'
                    }}>
                      {log.type}
                    </span>
                  </td>
                  <td style={{fontWeight: '500'}}>{log.details}</td>
                  <td style={{color: '#10b981', fontWeight: 'bold'}}>Completed</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminReports;
