import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Building2, 
  Plus, 
  Edit3, 
  Sparkles,
  TrendingUp,
  FileCheck,
  ChevronRight
} from 'lucide-react';

export default function ApplicationTracker({ applications, onUpdateApplicationStatus, onAddApplication }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newApp, setNewApp] = useState({ jobTitle: '', company: '', status: 'Applied', notes: '' });

  const statusColors = {
    Applied: { bg: 'var(--accent-light)', text: 'var(--accent-primary)', border: 'var(--accent-primary)' },
    Screening: { bg: 'rgba(245, 158, 11, 0.15)', text: '#d97706', border: '#f59e0b' },
    Interviewing: { bg: 'rgba(139, 92, 246, 0.15)', text: '#7c3aed', border: '#8b5cf6' },
    Offer: { bg: 'rgba(16, 185, 129, 0.15)', text: '#059669', border: '#10b981' }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newApp.jobTitle || !newApp.company) return;

    onAddApplication({
      id: `app_${Date.now()}`,
      jobTitle: newApp.jobTitle,
      company: newApp.company,
      appliedDate: new Date().toISOString().split('T')[0],
      status: newApp.status,
      nextStep: 'Application submitted',
      matchScore: 90,
      notes: newApp.notes || 'Tracked off-campus application'
    });

    setNewApp({ jobTitle: '', company: '', status: 'Applied', notes: '' });
    setShowAddForm(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* HEADER BANNER */}
      <div className="card-glass" style={{
        padding: '1.5rem',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(37, 99, 235, 0.12) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.25)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
            <FileCheck size={20} color="var(--accent-emerald)" />
            <h2 style={{ fontSize: '1.4rem' }}>Fresher Application Tracker</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Track your active job applications, interview schedules, and response stages in one organized place.
          </p>
        </div>

        <button onClick={() => setShowAddForm(!showAddForm)} className="btn btn-primary" style={{ gap: '0.4rem' }}>
          <Plus size={18} /> Add Application
        </button>
      </div>

      {/* ADD NEW APPLICATION FORM */}
      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="card-glass" style={{ padding: '1.25rem', background: 'var(--bg-tertiary)' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Track External / Off-Campus Application</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <input 
              type="text" 
              placeholder="Job Title (e.g. SDE-1)" 
              value={newApp.jobTitle} 
              onChange={(e) => setNewApp({ ...newApp, jobTitle: e.target.value })}
              required
            />
            <input 
              type="text" 
              placeholder="Company Name" 
              value={newApp.company} 
              onChange={(e) => setNewApp({ ...newApp, company: e.target.value })}
              required
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <select 
              value={newApp.status} 
              onChange={(e) => setNewApp({ ...newApp, status: e.target.value })}
            >
              <option value="Applied">Applied</option>
              <option value="Screening">Screening</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
            </select>
            <input 
              type="text" 
              placeholder="Notes / Interview Date" 
              value={newApp.notes} 
              onChange={(e) => setNewApp({ ...newApp, notes: e.target.value })}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <button type="button" onClick={() => setShowAddForm(false)} className="btn btn-secondary btn-sm">Cancel</button>
            <button type="submit" className="btn btn-primary btn-sm">Save Record</button>
          </div>
        </form>
      )}

      {/* APPLICATIONS LIST / CARDS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {applications.map(app => (
          <div key={app.id} className="card-glass card-hover-lift" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                  <h3 style={{ fontSize: '1.1rem' }}>{app.jobTitle}</h3>
                  <span className="match-score-badge" style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem' }}>
                    {app.matchScore}% Match
                  </span>
                </div>
                
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {app.company}
                </div>

                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.785rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={14} /> Applied on {app.appliedDate}
                  </span>
                  <span>Notes: {app.notes}</span>
                </div>
              </div>

              {/* Status Selector */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                <select 
                  value={app.status}
                  onChange={(e) => onUpdateApplicationStatus(app.id, e.target.value)}
                  style={{
                    fontSize: '0.825rem',
                    fontWeight: 700,
                    padding: '0.4rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    background: (statusColors[app.status] || statusColors.Applied).bg,
                    color: (statusColors[app.status] || statusColors.Applied).text,
                    border: `1px solid ${(statusColors[app.status] || statusColors.Applied).border}`,
                    cursor: 'pointer'
                  }}
                >
                  <option value="Applied">Status: Applied</option>
                  <option value="Screening">Status: Screening</option>
                  <option value="Interviewing">Status: Interviewing</option>
                  <option value="Offer">Status: Offer Received</option>
                </select>

                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  Next: {app.nextStep || 'Awaiting update'}
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
