import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Search, 
  Filter, 
  Sparkles, 
  Building2, 
  CheckCircle2, 
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
  Bookmark
} from 'lucide-react';
import JobDetailModal from './JobDetailModal.jsx';

export default function JobsSection({ 
  jobs, 
  appliedJobIds, 
  onApplyJob, 
  currentUser, 
  searchQuery, 
  setSearchQuery 
}) {
  const [selectedJob, setSelectedJob] = useState(null);
  const [workModeFilter, setWorkModeFilter] = useState('All');
  const [experienceFilter, setExperienceFilter] = useState('All');
  const [minMatchFilter, setMinMatchFilter] = useState(false);

  // Filter Jobs logic
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.badges.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesMode = workModeFilter === 'All' || job.workMode === workModeFilter;
    
    const matchesExp = experienceFilter === 'All'
      || (experienceFilter === 'Freshers Only' && (job.experience.includes('0 Years') || job.experience.includes('Freshers')))
      || (experienceFilter === 'Internships' && job.experience.includes('Internship'))
      || (experienceFilter === '0-1 Year' && job.experience.includes('0-1'));

    const matchesMatchScore = !minMatchFilter || job.matchScore >= 85;

    return matchesSearch && matchesMode && matchesExp && matchesMatchScore;
  });

  return (
    <div>
      {/* Header Banner */}
      <div className="card-glass" style={{
        padding: '1.75rem',
        marginBottom: '1.5rem',
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(6, 182, 212, 0.12) 100%)',
        border: '1px solid rgba(37, 99, 235, 0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-brand"><Sparkles size={12} /> Fresher Special</span>
              <span className="badge badge-fresher">Batch 2024 - 2026</span>
            </div>
            <h2 style={{ fontSize: '1.5rem', letterSpacing: '-0.02em' }}>
              Find Entry-Level & Fresher Opportunities
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
              Explore jobs where companies actively hire freshers based on skills, projects, and learning enthusiasm.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{jobs.length}+</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified Fresher Roles</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Filter Sidebar + Jobs List */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '260px 1fr',
        gap: '1.5rem',
        alignItems: 'start'
      }}>
        {/* FILTER SIDEBAR */}
        <aside className="card-glass" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <SlidersHorizontal size={18} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '1rem' }}>Filters</h3>
          </div>

          {/* Search Box inside Filter */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Role or Keyword
            </label>
            <div style={{ position: 'relative' }}>
              <Search size={15} style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="React, Java, GET..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', paddingLeft: '2rem', fontSize: '0.825rem', height: '36px' }}
              />
            </div>
          </div>

          {/* Match Score Toggle Filter */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              padding: '0.6rem',
              background: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Sparkles size={14} color="var(--accent-emerald)" /> High Match (&gt;85%)
              </span>
              <input 
                type="checkbox" 
                checked={minMatchFilter}
                onChange={(e) => setMinMatchFilter(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: 'var(--accent-primary)' }}
              />
            </label>
          </div>

          {/* Work Mode Filter */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
              Work Mode
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {['All', 'Remote', 'Hybrid', 'On-site'].map(mode => (
                <button
                  key={mode}
                  onClick={() => setWorkModeFilter(mode)}
                  style={{
                    textAlign: 'left',
                    padding: '0.4rem 0.6rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    fontWeight: workModeFilter === mode ? 700 : 500,
                    background: workModeFilter === mode ? 'var(--accent-light)' : 'transparent',
                    color: workModeFilter === mode ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    border: 'none'
                  }}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Filter */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
              Experience Level
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {['All', 'Freshers Only', 'Internships', '0-1 Year'].map(exp => (
                <button
                  key={exp}
                  onClick={() => setExperienceFilter(exp)}
                  style={{
                    textAlign: 'left',
                    padding: '0.4rem 0.6rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    fontWeight: experienceFilter === exp ? 700 : 500,
                    background: experienceFilter === exp ? 'var(--accent-light)' : 'transparent',
                    color: experienceFilter === exp ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    border: 'none'
                  }}
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* JOBS LIST GRID */}
        <main style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Showing <strong style={{ color: 'var(--text-primary)' }}>{filteredJobs.length}</strong> jobs
            </div>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="card-glass" style={{ padding: '3rem', textAlign: 'center' }}>
              <Building2 size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto' }} />
              <h3>No jobs found matching your filters</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.35rem' }}>
                Try adjusting your search criteria or resetting filters.
              </p>
              <button 
                onClick={() => { setWorkModeFilter('All'); setExperienceFilter('All'); setSearchQuery(''); setMinMatchFilter(false); }}
                className="btn btn-secondary btn-sm"
                style={{ marginTop: '1rem' }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredJobs.map(job => {
              const isApplied = appliedJobIds.includes(job.id);
              return (
                <article key={job.id} className="card-glass card-hover-lift" style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    
                    <div style={{ display: 'flex', gap: '1rem', flex: 1, minWidth: '280px' }}>
                      <img 
                        src={job.logo} 
                        alt={job.company} 
                        style={{
                          width: '54px',
                          height: '54px',
                          borderRadius: 'var(--radius-md)',
                          objectFit: 'cover',
                          border: '1px solid var(--border-color)',
                          padding: '2px'
                        }}
                      />

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <h3 style={{ fontSize: '1.1rem', cursor: 'pointer' }} onClick={() => setSelectedJob(job)}>
                            {job.title}
                          </h3>
                        </div>

                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                          {job.company}
                        </div>

                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.85rem',
                          fontSize: '0.785rem',
                          color: 'var(--text-muted)',
                          marginTop: '0.4rem',
                          flexWrap: 'wrap'
                        }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                            <MapPin size={14} /> {job.location}
                          </span>
                          <span className={`badge ${job.workMode === 'Remote' ? 'badge-remote' : 'badge-purple'}`}>
                            {job.workMode}
                          </span>
                          <span style={{ fontWeight: 600, color: 'var(--accent-emerald)' }}>
                            💰 {job.salary}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right side: Match score & actions */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.6rem' }}>
                      <div className="match-score-badge">
                        <Sparkles size={13} /> {job.matchScore}% Match
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          onClick={() => setSelectedJob(job)}
                          className="btn btn-secondary btn-sm"
                        >
                          View Details
                        </button>

                        <button 
                          onClick={() => onApplyJob(job.id)}
                          disabled={isApplied}
                          className={`btn btn-sm ${isApplied ? 'btn-success' : 'btn-primary'}`}
                          style={{ minWidth: '110px' }}
                        >
                          {isApplied ? (
                            <>
                              <CheckCircle2 size={14} /> Applied
                            </>
                          ) : (
                            'Quick Apply'
                          )}
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Fresher Badges Footer Row */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    marginTop: '1rem',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border-color)',
                    fontSize: '0.75rem'
                  }}>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {job.badges.map((badge, bIdx) => (
                        <span key={bIdx} className="badge badge-brand" style={{ fontSize: '0.675rem' }}>
                          {badge}
                        </span>
                      ))}
                    </div>
                    <span style={{ color: 'var(--text-muted)' }}>Posted {job.postedDate}</span>
                  </div>
                </article>
              );
            })
          )}
        </main>
      </div>

      {/* Detail Modal */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          isOpen={Boolean(selectedJob)}
          onClose={() => setSelectedJob(null)}
          onApply={onApplyJob}
          isApplied={appliedJobIds.includes(selectedJob.id)}
          currentUser={currentUser}
        />
      )}
    </div>
  );
}
