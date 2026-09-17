import React, { useState } from 'react';
import { 
  UserCheck, 
  MapPin, 
  GraduationCap, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink, 
  Github, 
  Award, 
  Plus, 
  Code2, 
  Star, 
  Edit3,
  BookOpen
} from 'lucide-react';

export default function ProfileSection({ currentUser, onUpdateProfile }) {
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState(currentUser.bio);
  
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '', techStack: '', githubUrl: '', liveDemo: '' });

  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');

  const handleToggleOpenToWork = () => {
    onUpdateProfile({
      ...currentUser,
      isOpenToWork: !currentUser.isOpenToWork
    });
  };

  const handleSaveBio = () => {
    onUpdateProfile({
      ...currentUser,
      bio: bioText
    });
    setIsEditingBio(false);
  };

  const handleAddProjectSubmit = (e) => {
    e.preventDefault();
    if (!newProject.title) return;

    const projectObj = {
      id: `p_${Date.now()}`,
      title: newProject.title,
      description: newProject.description,
      techStack: newProject.techStack.split(',').map(s => s.trim()).filter(Boolean),
      githubUrl: newProject.githubUrl || '#',
      liveDemo: newProject.liveDemo || '#',
      stars: 1
    };

    onUpdateProfile({
      ...currentUser,
      projects: [projectObj, ...currentUser.projects]
    });

    setNewProject({ title: '', description: '', techStack: '', githubUrl: '', liveDemo: '' });
    setShowAddProject(false);
  };

  const handleAddSkillSubmit = (e) => {
    e.preventDefault();
    if (!newSkillName) return;

    const skillObj = {
      name: newSkillName.trim(),
      rating: 85,
      verified: true,
      level: 'Intermediate'
    };

    onUpdateProfile({
      ...currentUser,
      skills: [...currentUser.skills, skillObj]
    });

    setNewSkillName('');
    setShowAddSkill(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* PROFILE HEADER HERO CARD */}
      <div className="card-glass" style={{ overflow: 'hidden' }}>
        <div style={{
          height: '160px',
          background: 'var(--gradient-hero)',
          position: 'relative'
        }}>
          <button 
            onClick={handleToggleOpenToWork}
            className={`btn btn-sm ${currentUser.isOpenToWork ? 'btn-success' : 'btn-secondary'}`}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <CheckCircle2 size={14} />
            {currentUser.isOpenToWork ? 'Status: Open to Work (Active)' : 'Status: Not Looking'}
          </button>
        </div>

        <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', position: 'relative' }}>
          <div style={{
            display: 'flex',
            justify: 'space-between',
            alignItems: 'flex-end',
            marginTop: '-60px',
            marginBottom: '1rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              style={{
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                border: '4px solid var(--bg-secondary)',
                objectFit: 'cover',
                boxShadow: 'var(--shadow-lg)'
              }}
            />

            <div className="match-score-badge" style={{ padding: '0.4rem 0.85rem' }}>
              <Sparkles size={16} /> Fresher Match Index: {currentUser.matchScoreOverall}%
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: '1.5rem' }}>{currentUser.name}</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--accent-primary)', fontWeight: 600, marginTop: '0.15rem' }}>
              {currentUser.headline}
            </p>
            <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.825rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <MapPin size={14} /> {currentUser.location}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <GraduationCap size={14} /> {currentUser.college}
              </span>
            </div>
          </div>

          {/* BIO SECTION */}
          <div style={{ marginTop: '1.25rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <h4 style={{ fontSize: '0.95rem' }}>About Me</h4>
              {!isEditingBio && (
                <button onClick={() => setIsEditingBio(true)} className="btn btn-ghost btn-sm" style={{ padding: '0.2rem 0.5rem' }}>
                  <Edit3 size={14} /> Edit
                </button>
              )}
            </div>

            {isEditingBio ? (
              <div>
                <textarea 
                  rows={3} 
                  value={bioText} 
                  onChange={(e) => setBioText(e.target.value)} 
                  style={{ width: '100%', fontSize: '0.875rem', marginBottom: '0.5rem' }}
                />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={handleSaveBio} className="btn btn-primary btn-sm">Save</button>
                  <button onClick={() => setIsEditingBio(false)} className="btn btn-secondary btn-sm">Cancel</button>
                </div>
              </div>
            ) : (
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {currentUser.bio}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* TWO COLUMN CONTENT: SKILLS & PROJECTS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        {/* SKILLS & ASSESSMENTS */}
        <section className="card-glass" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
              <Sparkles size={18} color="var(--accent-primary)" /> Verified Skills
            </h3>
            <button onClick={() => setShowAddSkill(!showAddSkill)} className="btn btn-outline btn-sm">
              <Plus size={14} /> Add Skill
            </button>
          </div>

          {showAddSkill && (
            <form onSubmit={handleAddSkillSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input 
                type="text" 
                placeholder="e.g. TypeScript, Docker, SQL"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                style={{ flex: 1, fontSize: '0.825rem', height: '34px' }}
                required
              />
              <button type="submit" className="btn btn-primary btn-sm">Add</button>
            </form>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {currentUser.skills.map((skill, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem', fontSize: '0.85rem' }}>
                  <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    {skill.name}
                    {skill.verified && <CheckCircle2 size={13} color="var(--accent-emerald)" title="Verified Assessment" />}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{skill.rating}%</span>
                </div>
                <div style={{ height: '6px', width: '100%', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${skill.rating}%`,
                    background: 'var(--gradient-brand)',
                    borderRadius: 'var(--radius-full)',
                    transition: 'width 0.5s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION & CERTIFICATIONS */}
        <section className="card-glass" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <GraduationCap size={20} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '1.1rem' }}>Education & Credentials</h3>
          </div>

          <div style={{ marginBottom: '1.25rem', padding: '0.85rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{currentUser.college}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', marginTop: '0.15rem' }}>{currentUser.degree}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>Cumulative GPA: {currentUser.gpa}</div>
          </div>

          <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>Certifications</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {currentUser.certifications.map((cert, cIdx) => (
              <div key={cIdx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.825rem' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{cert.title}</div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{cert.issuer} • {cert.year}</div>
                </div>
                <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>{cert.badge}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* PROJECTS SHOWCASE */}
      <section className="card-glass" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem' }}>
              <Code2 size={20} color="var(--accent-primary)" /> Project Showcase
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
              Freshers stand out through impactful projects. Highlight your repositories & live demos here.
            </p>
          </div>

          <button onClick={() => setShowAddProject(!showAddProject)} className="btn btn-primary btn-sm">
            <Plus size={16} /> Add Project
          </button>
        </div>

        {/* Add Project Form */}
        {showAddProject && (
          <form onSubmit={handleAddProjectSubmit} className="card-glass" style={{ padding: '1rem', marginBottom: '1.25rem', background: 'var(--bg-tertiary)' }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>New Project Details</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <input 
                type="text" 
                placeholder="Project Title" 
                value={newProject.title} 
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                required
              />
              <textarea 
                rows={2} 
                placeholder="Brief Description" 
                value={newProject.description} 
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              />
              <input 
                type="text" 
                placeholder="Tech Stack (comma separated: React, Python, SQL)" 
                value={newProject.techStack} 
                onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
              />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="url" 
                  placeholder="GitHub URL" 
                  value={newProject.githubUrl} 
                  onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                  style={{ flex: 1 }}
                />
                <input 
                  type="url" 
                  placeholder="Live Demo URL" 
                  value={newProject.liveDemo} 
                  onChange={(e) => setNewProject({ ...newProject, liveDemo: e.target.value })}
                  style={{ flex: 1 }}
                />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setShowAddProject(false)} className="btn btn-secondary btn-sm">Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Save Project</button>
              </div>
            </div>
          </form>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {currentUser.projects.map(p => (
            <div key={p.id} className="card-glass card-hover-lift" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1rem' }}>{p.title}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-amber)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <Star size={12} fill="currentColor" /> {p.stars}
                  </span>
                </div>

                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.85rem' }}>
                  {p.description}
                </p>

                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {p.techStack.map((tech, tIdx) => (
                    <span key={tIdx} className="badge badge-brand" style={{ fontSize: '0.675rem' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                <a href={p.githubUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ flex: 1, gap: '0.3rem' }}>
                  <Github size={14} /> Code
                </a>
                <a href={p.liveDemo} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm" style={{ flex: 1, gap: '0.3rem' }}>
                  <ExternalLink size={14} /> Live Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
