import React, { useState, useEffect } from 'react';
import { Download, Filter, Calendar, RotateCcw } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import logoImg from '../../images/88567.png';

const AdminReports = ({ token }) => {
  const [metrics, setMetrics] = useState({
    users: 0,
    projects: 0,
    blogs: 0,
    messages: 0,
    visits: 0
  });

  const [rawData, setRawData] = useState({
    users: [],
    projects: [],
    blogs: [],
    messages: [],
    totalVisits: 0
  });
  
  const [adminName, setAdminName] = useState('Musengimana Fabrice');
  const [loading, setLoading] = useState(true);

  // Filters state - dates are 100% optional (defaults to all-time)
  const [dateMode, setDateMode] = useState('all'); // 'all' or 'custom'
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportType, setReportType] = useState('Overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = token || localStorage.getItem('token');
        const headers = authToken ? { 'Authorization': `Bearer ${authToken}` } : {};
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
        
        // Fetch Profile for Signature Name
        if (authToken) {
          fetch(`${apiUrl}/api/admin/profile`, { headers })
            .then(res => res.ok ? res.json() : null)
            .then(data => {
              if (data && data.fullName) setAdminName(data.fullName);
            })
            .catch(() => {});
        }

        // Fetch metrics & raw data
        const [projRes, blogRes, msgRes, visitRes, teamRes] = await Promise.all([
          fetch(`${apiUrl}/api/public/projects`).catch(() => ({ ok: false })),
          fetch(`${apiUrl}/api/public/blogs`).catch(() => ({ ok: false })),
          fetch(`${apiUrl}/api/admin/contact-messages`, { headers }).catch(() => ({ ok: false })),
          fetch(`${apiUrl}/api/admin/analytics/visits/count`, { headers }).catch(() => ({ ok: false })),
          fetch(`${apiUrl}/api/public/team-members`).catch(() => ({ ok: false }))
        ]);
        
        const projects = projRes.ok ? await projRes.json() : [];
        const blogs = blogRes.ok ? await blogRes.json() : [];
        const messages = msgRes.ok ? await msgRes.json() : [];
        const visitsCount = visitRes.ok ? await visitRes.json() : 0;
        const team = teamRes.ok ? await teamRes.json() : [];

        setRawData({
          users: Array.isArray(team) ? team : [],
          projects: Array.isArray(projects) ? projects : [],
          blogs: Array.isArray(blogs) ? blogs : [],
          messages: Array.isArray(messages) ? messages : [],
          totalVisits: typeof visitsCount === 'number' ? visitsCount : 0
        });

      } catch (e) {
        console.error("Failed to fetch report data", e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [token]);

  const filterByDate = (items) => {
    // If in "all" mode, return all items without any date filtering
    if (dateMode === 'all' || (!startDate && !endDate)) return items;
    
    return items.filter(item => {
      if (!item.createdAt) return true;
      
      const itemDate = new Date(item.createdAt);
      itemDate.setHours(0, 0, 0, 0); 
      
      let isValid = true;
      if (startDate) {
        const sDate = new Date(startDate);
        sDate.setHours(0, 0, 0, 0);
        if (itemDate < sDate) isValid = false;
      }
      if (endDate) {
        const eDate = new Date(endDate);
        eDate.setHours(23, 59, 59, 999);
        if (itemDate > eDate) isValid = false;
      }
      return isValid;
    });
  };

  useEffect(() => {
    setMetrics({
      users: filterByDate(rawData.users || []).length,
      projects: filterByDate(rawData.projects || []).length,
      blogs: filterByDate(rawData.blogs || []).length,
      messages: filterByDate(rawData.messages || []).length,
      visits: rawData.totalVisits || 0
    });
  }, [dateMode, startDate, endDate, rawData]);

  const resetToAllTime = () => {
    setDateMode('all');
    setStartDate('');
    setEndDate('');
  };

  const generatePDF = async () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // 1. Company Logo (Official NTD Build Logo)
    try {
      const img = await new Promise((resolve) => {
        const imageObj = new Image();
        imageObj.src = logoImg;
        if (imageObj.complete) {
          resolve(imageObj);
        } else {
          imageObj.onload = () => resolve(imageObj);
          imageObj.onerror = () => resolve(null);
        }
      });

      if (img) {
        doc.addImage(img, 'PNG', 20, 16, 34, 26);
      } else {
        // Fallback in case image loading fails
        doc.setFillColor(235, 246, 240);
        doc.circle(37, 29, 12, 'F');
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(60, 70, 85);
        doc.text("NTD", 37, 33.5, { align: 'center' });
      }
    } catch (err) {
      console.warn("Failed to render logo in PDF:", err);
    }

    // 2. Company Info (Right of Logo)
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("NTD BUILD & DESIGN SOLUTIONS", 62, 26);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("P.O. Box 2461, Kigali, Rwanda", 62, 33);
    doc.text("Website: www.ntdbuild.com", 62, 39);

    // 3. Report Title (Underlined)
    let title = "SYSTEM OVERVIEW REPORT";
    if (reportType === 'Messages') title = "RECEIVED MESSAGES REPORT";
    else if (reportType === 'Blogs') title = "BLOGS UPLOADED REPORT";
    else if (reportType === 'Projects') title = "PROJECTS REPORT";

    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.setTextColor(0, 0, 0);
    doc.text(title, 105, 62, { align: 'center' });

    // Underline beneath the title
    const titleWidth = doc.getTextWidth(title);
    doc.setLineWidth(0.4);
    doc.setDrawColor(0, 0, 0);
    doc.line(105 - (titleWidth / 2), 64.5, 105 + (titleWidth / 2), 64.5);

    // 4. Build Table Head & Body based on Report Type
    let head = [['No.', 'Metric', 'Value']];
    let body = [];
    let columnStyles = {
      0: { halign: 'center', cellWidth: 25 },
      1: { halign: 'left', cellWidth: 95 },
      2: { halign: 'left', cellWidth: 50 }
    };

    if (reportType === 'Overview') {
      body = [
        ['1', 'Total Team Members', metrics.users.toString()],
        ['2', 'Total Projects', metrics.projects.toString()],
        ['3', 'Total Blogs Uploaded', metrics.blogs.toString()],
        ['4', 'Received Messages', metrics.messages.toString()],
        ['5', 'Total Site Visits', metrics.visits.toString()]
      ];
    } else if (reportType === 'Messages') {
      head = [['No.', 'Sender Name', 'Email', 'Date']];
      columnStyles = {
        0: { halign: 'center', cellWidth: 20 },
        1: { halign: 'left', cellWidth: 50 },
        2: { halign: 'left', cellWidth: 65 },
        3: { halign: 'left', cellWidth: 35 }
      };
      const filtered = filterByDate(rawData.messages || []);
      body = filtered.map((m, idx) => [
        (idx + 1).toString(),
        `${m.firstName || ''} ${m.lastName || ''}`.trim() || 'Anonymous',
        m.email || 'N/A',
        m.createdAt ? new Date(m.createdAt).toLocaleDateString() : 'N/A'
      ]);
      if (body.length === 0) {
        body = [['-', 'No messages recorded', '', '']];
      }
    } else if (reportType === 'Blogs') {
      head = [['No.', 'Blog Title', 'Author', 'Date']];
      columnStyles = {
        0: { halign: 'center', cellWidth: 20 },
        1: { halign: 'left', cellWidth: 80 },
        2: { halign: 'left', cellWidth: 40 },
        3: { halign: 'left', cellWidth: 30 }
      };
      const filtered = filterByDate(rawData.blogs || []);
      body = filtered.map((b, idx) => [
        (idx + 1).toString(),
        b.title || 'Untitled',
        b.author || 'Admin',
        b.createdAt ? new Date(b.createdAt).toLocaleDateString() : 'N/A'
      ]);
      if (body.length === 0) {
        body = [['-', 'No blogs recorded', '', '']];
      }
    } else if (reportType === 'Projects') {
      head = [['No.', 'Project Title', 'Category', 'Date']];
      columnStyles = {
        0: { halign: 'center', cellWidth: 20 },
        1: { halign: 'left', cellWidth: 80 },
        2: { halign: 'left', cellWidth: 40 },
        3: { halign: 'left', cellWidth: 30 }
      };
      const filtered = filterByDate(rawData.projects || []);
      body = filtered.map((p, idx) => [
        (idx + 1).toString(),
        p.title || 'Untitled',
        p.category || 'Architecture',
        p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'N/A'
      ]);
      if (body.length === 0) {
        body = [['-', 'No projects recorded', '', '']];
      }
    }

    // 5. Render Table using autoTable
    const tableOptions = {
      startY: 73,
      margin: { left: 20, right: 20 },
      head: head,
      body: body,
      theme: 'grid',
      styles: {
        font: 'helvetica',
        fontSize: 10,
        textColor: [0, 0, 0],
        lineWidth: 0.2,
        lineColor: [0, 0, 0],
        cellPadding: { top: 3.5, bottom: 3.5, left: 4, right: 4 }
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
        lineWidth: 0.2,
        lineColor: [0, 0, 0]
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        lineWidth: 0.2,
        lineColor: [0, 0, 0]
      },
      columnStyles: columnStyles
    };

    if (typeof doc.autoTable === 'function') {
      doc.autoTable(tableOptions);
    } else {
      autoTable(doc, tableOptions);
    }

    const finalY = (doc.lastAutoTable && doc.lastAutoTable.finalY) ? doc.lastAutoTable.finalY : 135;

    // 6. Notice below Table (Centered, Bold)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text("This report is for admin only.", 105, finalY + 12, { align: 'center' });

    // 7. Subtle Horizontal Divider Line
    const dividerY = finalY + 20;
    doc.setDrawColor(215, 220, 228);
    doc.setLineWidth(0.3);
    doc.line(20, dividerY, 190, dividerY);

    // 8. Signatures Block
    const now = new Date();
    const formattedDate = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

    // Left Signature
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text("Delivered by System Administrator", 35, dividerY + 10);
    doc.text(`Date: ${formattedDate}`, 35, dividerY + 20);

    // Right Signature
    doc.text(adminName || "Musengimana Fabrice", 135, dividerY + 10);
    doc.text("Signature: ", 135, dividerY + 20);

    // 9. Copyright Footer
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("©2026 NTD Build & Design Solutions. All rights reserved", 105, 280, { align: 'center' });

    // 10. Download PDF
    doc.save(`NTD_${reportType}_Report.pdf`);
  };

  const filteredMessages = filterByDate(rawData.messages || []);
  const filteredBlogs = filterByDate(rawData.blogs || []);
  const filteredProjects = filterByDate(rawData.projects || []);

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>System Reports</h1>
          <p style={{ color: '#6b7280', margin: 0 }}>Generate one-click reports or filter optionally by date.</p>
        </div>
        <button 
          className="btn" 
          style={{ 
            background: "var(--orbit-primary)", 
            color: "#f1f5f9", 
            border: "none", 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            padding: '0.65rem 1.25rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 600
          }} 
          onClick={generatePDF}
        >
          <Download size={18} />
          Generate PDF Report
        </button>
      </div>

      <div className="premium-admin-card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={18} /> Report Options
          </h3>
          
          {/* Quick Period Selector */}
          <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--orbit-surface2)', padding: '0.25rem', borderRadius: '8px', border: '1px solid var(--orbit-border)' }}>
            <button
              type="button"
              onClick={resetToAllTime}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: 600,
                background: dateMode === 'all' ? 'var(--orbit-primary)' : 'transparent',
                color: dateMode === 'all' ? '#ffffff' : 'var(--orbit-text)'
              }}
            >
              All Time (Default)
            </button>
            <button
              type="button"
              onClick={() => setDateMode('custom')}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: 600,
                background: dateMode === 'custom' ? 'var(--orbit-primary)' : 'transparent',
                color: dateMode === 'custom' ? '#ffffff' : 'var(--orbit-text)'
              }}
            >
              Custom Date Range (Optional)
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: 1, minWidth: '220px' }}>
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

          {dateMode === 'custom' ? (
            <>
              <div style={{ flex: 1, minWidth: '180px' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 500 }}>
                  Date From <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>(Optional)</span>
                </label>
                <input 
                  type="date" 
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--orbit-border)', background: 'var(--orbit-surface)', color: 'var(--orbit-text)' }}
                />
              </div>
              <div style={{ flex: 1, minWidth: '180px' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 500 }}>
                  Date To <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>(Optional)</span>
                </label>
                <input 
                  type="date" 
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--orbit-border)', background: 'var(--orbit-surface)', color: 'var(--orbit-text)' }}
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={resetToAllTime}
                  title="Clear date filter and include all records"
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--orbit-border)',
                    background: 'var(--orbit-surface2)',
                    color: 'var(--orbit-text)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.85rem'
                  }}
                >
                  <RotateCcw size={14} /> Clear
                </button>
              </div>
            </>
          ) : (
            <div style={{ flex: 2, minWidth: '220px', padding: '0.75rem 1rem', background: 'var(--orbit-surface2)', borderRadius: '8px', border: '1px dashed var(--orbit-border)', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.85rem' }}>
              <Calendar size={16} />
              <span><strong>All-Time data:</strong> All records are included automatically. No date input needed.</span>
            </div>
          )}
        </div>
      </div>

      <div className="premium-admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <p style={{ padding: '2rem' }}>Loading report data...</p>
        ) : (
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--orbit-surface2)', borderBottom: '1px solid var(--orbit-border)' }}>
                {reportType === 'Overview' && (
                  <>
                    <th style={{ padding: '1rem 1.5rem', width: '80px' }}>No.</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Metric</th>
                    <th style={{ padding: '1rem 1.5rem', width: '160px' }}>Value</th>
                  </>
                )}
                {reportType === 'Messages' && (
                  <>
                    <th style={{ padding: '1rem 1.5rem', width: '80px' }}>No.</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Sender Name</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Email</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Date</th>
                  </>
                )}
                {reportType === 'Blogs' && (
                  <>
                    <th style={{ padding: '1rem 1.5rem', width: '80px' }}>No.</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Blog Title</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Author</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Date</th>
                  </>
                )}
                {reportType === 'Projects' && (
                  <>
                    <th style={{ padding: '1rem 1.5rem', width: '80px' }}>No.</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Project Title</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Category</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Date</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {reportType === 'Overview' && (
                <>
                  <tr style={{ borderBottom: '1px solid var(--orbit-border)' }}>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>1</td>
                    <td style={{ padding: '1rem 1.5rem' }}>Total Team Members</td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 'bold' }}>{metrics.users}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--orbit-border)' }}>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>2</td>
                    <td style={{ padding: '1rem 1.5rem' }}>Total Projects</td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 'bold' }}>{metrics.projects}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--orbit-border)' }}>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>3</td>
                    <td style={{ padding: '1rem 1.5rem' }}>Total Blogs Uploaded</td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 'bold' }}>{metrics.blogs}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--orbit-border)' }}>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>4</td>
                    <td style={{ padding: '1rem 1.5rem' }}>Received Messages</td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 'bold' }}>{metrics.messages}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--orbit-border)' }}>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>5</td>
                    <td style={{ padding: '1rem 1.5rem' }}>Total Site Visits</td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 'bold' }}>{metrics.visits}</td>
                  </tr>
                </>
              )}

              {reportType === 'Messages' && (
                filteredMessages.length === 0 ? (
                  <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No messages recorded.</td></tr>
                ) : (
                  filteredMessages.map((m, idx) => (
                    <tr key={m.id || idx} style={{ borderBottom: '1px solid var(--orbit-border)' }}>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>{idx + 1}</td>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: 'bold' }}>{`${m.firstName || ''} ${m.lastName || ''}`.trim() || 'Anonymous'}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>{m.email || 'N/A'}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>{m.createdAt ? new Date(m.createdAt).toLocaleDateString() : 'N/A'}</td>
                    </tr>
                  ))
                )
              )}

              {reportType === 'Blogs' && (
                filteredBlogs.length === 0 ? (
                  <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No blogs recorded.</td></tr>
                ) : (
                  filteredBlogs.map((b, idx) => (
                    <tr key={b.id || idx} style={{ borderBottom: '1px solid var(--orbit-border)' }}>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>{idx + 1}</td>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: 'bold' }}>{b.title || 'Untitled'}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>{b.author || 'Admin'}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>{b.createdAt ? new Date(b.createdAt).toLocaleDateString() : 'N/A'}</td>
                    </tr>
                  ))
                )
              )}

              {reportType === 'Projects' && (
                filteredProjects.length === 0 ? (
                  <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No projects recorded.</td></tr>
                ) : (
                  filteredProjects.map((p, idx) => (
                    <tr key={p.id || idx} style={{ borderBottom: '1px solid var(--orbit-border)' }}>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>{idx + 1}</td>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: 'bold' }}>{p.title || 'Untitled'}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>{p.category || 'Architecture'}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'N/A'}</td>
                    </tr>
                  ))
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminReports;
