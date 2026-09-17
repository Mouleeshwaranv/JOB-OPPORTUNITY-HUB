import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  Send, 
  Calendar, 
  Bookmark,
  Award,
  Users
} from 'lucide-react';

export default function JobDetailModal({ 
  job, 
  isOpen, 
  onClose, 
  onApply, 
  isApplied, 
  currentUser 
}) {
  const [saved, setSaved] = useState(false);

  if (!isOpen || !job) return null;

  // Simple skill match algorithm
  const userSkillNames = currentUser.skills.map(s => s.name.toLowerCase());
  const requiredKeywords = job.requirements.join(' ').toLowerCase();
  const matchingSkills = currentUser.skills.filter(s => 
    requiredKeywords.includes(s.name.toLowerCase()) || 
    (s.name.toLowerCase().includes('react') && requiredKeywords.includes('frontend'))
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '750px', padding: 0 }}>
        {/* Header Hero Area */}
        <div style={{
          background: 'var(--gradient-hero)',
          padding: '1.75rem',
          position: 'relative',
          color: '#ffffff'
        }}>
          <button 
            onClick={onClose} 
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <img 
              src={job.logo} 
              alt={job.company} 
              style={{
                width: '64px',
                height: '64px',
                borderRadius: 'var(--radius-md)',
                objectFit: 'cover',
                background: '#ffffff',
                padding: '4px',
                boxShadow: 'var(--shadow-md)'
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <h2 style={{ color: '#ffffff', fontSize: '1.35rem' }}>{job.title}</h2>
                <span className="match-score-badge" style={{ background: '#ffffff', color: '#059669' }}>
                  <Sparkles size={14} /> {job.matchScore}% Match
                </span>
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                {job.company} • {job.batchTarget}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem' }}>
          {/* Quick Metrics Pills */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '0.75rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={18} color="var(--accent-primary)" />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Location</div>
                <div style={{ fontSize: '0.825rem', fontWeight: 600 }}>{job.location} ({job.workMode})</div>
              </div>
            </div>

            <div style={{ padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <DollarSign size={18} color="var(--accent-emerald)" />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Package</div>
                <div style={{ fontSize: '0.825rem', fontWeight: 600 }}>{job.salary}</div>
              </div>
            </div>

            <div style={{ padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Briefcase size={18} color="var(--accent-purple)" />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Experience</div>
                <div style={{ fontSize: '0.825rem', fontWeight: 600 }}>{job.experience}</div>
              </div>
            </div>

            <div style={{ padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={18} color="var(--accent-cyan)" />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Applicants</div>
                <div style={{ fontSize: '0.825rem', fontWeight: 600 }}>{job.applicantsCount} Freshers</div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            {job.badges.map((b, i) => (
              <span key={i} className="badge badge-brand">{b}</span>
            ))}
          </div>

          {/* Job Description */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Job Overview</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {job.description}
            </p>
          </div>

          {/* Requirements & Skill Match Analysis */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h4 style={{ fontSize: '1rem' }}>Key Requirements</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                ✓ {matchingSkills.length} of your profile skills match!
              </span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {job.requirements.map((req, index) => (
                <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem' }}>
                  <CheckCircle2 size={16} color="var(--accent-emerald)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recruiter Contact */}
          {job.recruiter && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.85rem',
              background: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem'
            }}>
              <img 
                src={job.recruiter.avatar} 
                alt={job.recruiter.name} 
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Hiring Manager: {job.recruiter.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{job.recruiter.title}</div>
              </div>
            </div>
          )}

          {/* Bottom Action Row */}
          <div style={{
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1rem'
          }}>
            <button 
              onClick={() => setSaved(!saved)}
              className="btn btn-secondary"
              style={{ gap: '0.4rem' }}
            >
              <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
              <span>{saved ? 'Saved' : 'Save Job'}</span>
            </button>

            <button 
              onClick={() => onApply(job.id)}
              disabled={isApplied}
              className={`btn ${isApplied ? 'btn-success' : 'btn-primary'}`}
              style={{ gap: '0.4rem', minWidth: '180px' }}
            >
              {isApplied ? (
                <>
                  <CheckCircle2 size={18} /> Application Submitted
                </>
              ) : (
                <>
                  <Send size={18} /> One-Click Quick Apply
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
