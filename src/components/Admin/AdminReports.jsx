import React, { useState, useEffect } from 'react';
import { Download, Filter } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AdminReports = ({ token }) => {
  const [metrics, setMetrics] = useState({
    users: 0,
    projects: 0,
    blogs: 0,
    messages: 0,
    visits: 0
  });
  
  const [adminName, setAdminName] = useState('System Administrator');
  const [loading, setLoading] = useState(true);

  // Filters state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportType, setReportType] = useState('Overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { 'Authorization': `Bearer ${token}` };
        
        // Fetch Profile for Signature
        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/profile`, { headers })
          .then(res => res.json())
          .then(data => { if(data.fullName) setAdminName(data.fullName); })
          .catch(() => {});

        // Fetch metrics
        const [projRes, blogRes, msgRes, visitRes, teamRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/projects`),
          fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/blogs`),
          fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/contact-messages`, { headers }),
          fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/analytics/visits/count`, { headers }),
          fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/team-members`)
        ]);
        
        const projects = projRes.ok ? await projRes.json() : [];
        const blogs = blogRes.ok ? await blogRes.json() : [];
        const messages = msgRes.ok ? await msgRes.json() : [];
        const visitsCount = visitRes.ok ? await visitRes.json() : 0;
        const team = teamRes.ok ? await teamRes.json() : [];

        setMetrics({
          users: team.length,
          projects: projects.length,
          blogs: blogs.length,
          messages: messages.length,
          visits: visitsCount
        });

      } catch (e) {
        console.error("Failed to fetch report data", e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [token]);

  const generatePDF = () => {
    const doc = new jsPDF();

    // 1. Header (Logo & Company Info)
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("NTD", 20, 20); // Placeholder for logo text
    
    doc.setFontSize(14);
    doc.text("NTD BUILD & DESIGN SOLUTIONS", 60, 20);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("P.O. Box 1234, Kigali, Rwanda", 60, 26);
    doc.text("Email: ntdbuilddesignsolution@gmail.com", 60, 32);

    // 2. Report Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("SYSTEM OVERVIEW REPORT", 105, 55, { align: 'center', underline: true });

    doc.setFontSize(11);
    doc.setFont("helvetica", "italic");
    const periodText = `Period: ${startDate ? new Date(startDate).toLocaleDateString() : 'First Day'} to ${endDate ? new Date(endDate).toLocaleDateString() : 'Present'}`;
    doc.text(periodText, 105, 63, { align: 'center' });

    // 3. Table
    doc.autoTable({
      startY: 70,
      head: [['No.', 'Metric', 'Value']],
      body: [
        ['1', 'Total Team Members', metrics.users.toString()],
        ['2', 'Total Projects', metrics.projects.toString()],
        ['3', 'Total Blogs Uploaded', metrics.blogs.toString()],
        ['4', 'Received Messages', metrics.messages.toString()],
        ['5', 'Total Site Visits', metrics.visits.toString()]
      ],
      theme: 'grid',
      headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], lineWidth: 0.1, lineColor: [0, 0, 0] },
      bodyStyles: { textColor: [0, 0, 0], lineWidth: 0.1, lineColor: [0, 0, 0] },
      styles: { halign: 'left' }
    });

    const finalY = doc.lastAutoTable.finalY + 15;

    // 4. Footer notices
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("This report is for admin only.", 105, finalY, { align: 'center' });

    // Signatures
    doc.setFontSize(11);
    doc.text("Delivered by System Administrator", 20, finalY + 20);
    doc.text(adminName, 140, finalY + 20);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, finalY + 30);
    doc.text("Signature: ___________________", 140, finalY + 30);

    // Bottom copyright
    doc.setFontSize(10);
    doc.text("©2026 NTD BUILD. All rights reserved", 105, 280, { align: 'center' });

    // Save
    doc.save("NTD_System_Report.pdf");
  };

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>System Reports</h1>
          <p style={{color: '#6b7280', margin: 0}}>Filter and generate PDF reports of system activity.</p>
        </div>
        <button className="btn" style={{background: "var(--orbit-primary)", color: "#f1f5f9", border: "none", display: 'flex', alignItems: 'center', gap: '0.5rem'}} onClick={generatePDF}>
          <Download size={18} />
          Generate PDF Report
        </button>
      </div>

      <div className="premium-admin-card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={18} /> Filters
        </h3>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 500 }}>Report Type</label>
            <select 
              value={reportType} 
              onChange={e => setReportType(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--orbit-border)', background: 'var(--orbit-surface)', color: 'var(--orbit-text)' }}
            >
              <option value="Overview">System Overview</option>
              <option value="Messages">Received Messages</option>
              <option value="Blogs">Blogs Uploaded</option>
              <option value="Projects">Projects</option>
            </select>
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 500 }}>Date From</label>
            <input 
              type="date" 
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--orbit-border)', background: 'var(--orbit-surface)', color: 'var(--orbit-text)' }}
            />
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 500 }}>Date To</label>
            <input 
              type="date" 
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--orbit-border)', background: 'var(--orbit-surface)', color: 'var(--orbit-text)' }}
            />
          </div>
        </div>
      </div>

      <div className="premium-admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? <p style={{ padding: '2rem' }}>Loading report data...</p> : (
          <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{background: 'var(--orbit-surface2)', borderBottom: '1px solid var(--orbit-border)'}}>
                <th style={{padding: '1rem 1.5rem'}}>No.</th>
                <th style={{padding: '1rem 1.5rem'}}>Metric</th>
                <th style={{padding: '1rem 1.5rem'}}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{borderBottom: '1px solid var(--orbit-border)'}}>
                <td style={{padding: '1rem 1.5rem', fontWeight: '500'}}>1</td>
                <td style={{padding: '1rem 1.5rem'}}>Total Team Members</td>
                <td style={{padding: '1rem 1.5rem', fontWeight: 'bold'}}>{metrics.users}</td>
              </tr>
              <tr style={{borderBottom: '1px solid var(--orbit-border)'}}>
                <td style={{padding: '1rem 1.5rem', fontWeight: '500'}}>2</td>
                <td style={{padding: '1rem 1.5rem'}}>Total Projects</td>
                <td style={{padding: '1rem 1.5rem', fontWeight: 'bold'}}>{metrics.projects}</td>
              </tr>
              <tr style={{borderBottom: '1px solid var(--orbit-border)'}}>
                <td style={{padding: '1rem 1.5rem', fontWeight: '500'}}>3</td>
                <td style={{padding: '1rem 1.5rem'}}>Total Blogs Uploaded</td>
                <td style={{padding: '1rem 1.5rem', fontWeight: 'bold'}}>{metrics.blogs}</td>
              </tr>
              <tr style={{borderBottom: '1px solid var(--orbit-border)'}}>
                <td style={{padding: '1rem 1.5rem', fontWeight: '500'}}>4</td>
                <td style={{padding: '1rem 1.5rem'}}>Received Messages</td>
                <td style={{padding: '1rem 1.5rem', fontWeight: 'bold'}}>{metrics.messages}</td>
              </tr>
              <tr style={{borderBottom: '1px solid var(--orbit-border)'}}>
                <td style={{padding: '1rem 1.5rem', fontWeight: '500'}}>5</td>
                <td style={{padding: '1rem 1.5rem'}}>Total Site Visits</td>
                <td style={{padding: '1rem 1.5rem', fontWeight: 'bold'}}>{metrics.visits}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminReports;
