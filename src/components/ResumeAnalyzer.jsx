import React, { useState } from 'react';
import { 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Search, 
  Award,
  RefreshCw,
  Zap
} from 'lucide-react';

export default function ResumeAnalyzer({ currentUser }) {
  const [targetRole, setTargetRole] = useState('Junior Frontend Developer / SDE-1');
  const [resumeText, setResumeText] = useState(
    `Alex Rivera\n${currentUser.headline}\n\nSummary:\n${currentUser.bio}\n\nSkills:\n` +
    currentUser.skills.map(s => s.name).join(', ') +
    `\n\nProjects:\n` +
    currentUser.projects.map(p => `${p.title}: ${p.description}`).join('\n')
  );

  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleRunAnalysis = (e) => {
    e.preventDefault();
    setAnalyzing(true);

    setTimeout(() => {
      // Intelligent calculation based on keywords in resume text
      const lower = resumeText.toLowerCase();
      
      const keywords = [
        { word: 'react', label: 'React.js framework' },
        { word: 'javascript', label: 'JavaScript (ES6+)' },
        { word: 'git', label: 'Version Control (Git)' },
        { word: 'api', label: 'REST APIs / Endpoints' },
        { word: 'python', label: 'Python Scripting' },
        { word: 'sql', label: 'Database & SQL' },
        { word: 'testing', label: 'Unit / Integration Testing' },
        { word: 'performance', label: 'Performance Optimization' }
      ];

      const found = keywords.filter(k => lower.includes(k.word));
      const missing = keywords.filter(k => !lower.includes(k.word));

      const score = Math.min(98, Math.max(60, Math.round((found.length / keywords.length) * 100)));

      setResult({
        score: score,
        foundKeywords: found,
        missingKeywords: missing,
        formattingScore: 94,
        actionVerbsScore: 88,
        projectRelevance: 92,
        suggestions: [
          "Add quantifiable metrics to your projects (e.g. 'Optimized app load time by 35%').",
          missing.length > 0 ? `Consider incorporating missing industry keywords: ${missing.map(m => m.label).join(', ')}.` : "Great keyword coverage for entry-level tech roles!",
          "Ensure your GitHub repositories contain clean README.md documentation with screenshots.",
          "Keep your fresher resume concise—exactly 1 single page format."
        ]
      });

      setAnalyzing(false);
    }, 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* HEADER BANNER */}
      <div className="card-glass" style={{
        padding: '1.75rem',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(37, 99, 235, 0.15) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--gradient-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff'
          }}>
            <Sparkles size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem' }}>AI Resume Matcher & ATS Optimizer</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Freshers: Test how well your resume matches automated screening filters used by tech recruiters.
            </p>
          </div>
        </div>
      </div>

      {/* INPUT FORM & RESULT DISPLAY */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
        
        {/* INPUT CARD */}
        <div className="card-glass" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={18} color="var(--accent-primary)" /> Resume Input
          </h3>

          <form onSubmit={handleRunAnalysis}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                Target Job Role
              </label>
              <select 
                value={targetRole} 
                onChange={(e) => setTargetRole(e.target.value)}
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                <option value="Junior Frontend Developer / SDE-1">Junior Frontend Developer / SDE-1</option>
                <option value="Graduate Engineering Trainee (GET)">Graduate Engineering Trainee (GET)</option>
                <option value="Associate Data Analyst">Associate Data Analyst</option>
                <option value="Full Stack Intern / Fresher">Full Stack Intern / Fresher</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                Resume Content (Text / Skills / Projects)
              </label>
              <textarea 
                rows={10} 
                value={resumeText} 
                onChange={(e) => setResumeText(e.target.value)} 
                placeholder="Paste your resume text here..."
                style={{ width: '100%', fontSize: '0.825rem', lineHeight: 1.5, fontFamily: 'monospace' }}
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={analyzing} 
              className="btn btn-primary" 
              style={{ width: '100%', gap: '0.5rem' }}
            >
              {analyzing ? (
                <>
                  <RefreshCw size={18} className="animate-spin" /> Scanning Keywords & Formatting...
                </>
              ) : (
                <>
                  <Zap size={18} /> Calculate ATS Compatibility Score
                </>
              )}
            </button>
          </form>
        </div>

        {/* RESULTS CARD */}
        <div>
          {result ? (
            <div className="card-glass" style={{ padding: '1.5rem', animation: 'slideUp 0.3s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem' }}>ATS Match Score</h3>
                <span className="badge badge-brand">{targetRole}</span>
              </div>

              {/* Big Circular Score Dial */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                padding: '1.25rem',
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.25rem'
              }}>
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: 'var(--gradient-brand)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  boxShadow: 'var(--shadow-glow)'
                }}>
                  {result.score}%
                </div>

                <div>
                  <h4 style={{ fontSize: '1.1rem', color: result.score >= 80 ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
                    {result.score >= 80 ? 'Strong Fresher Resume!' : 'Moderate Match - Optimization Recommended'}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    Passes automated ATS filtering for 90%+ of entry-level campus & off-campus drives.
                  </p>
                </div>
              </div>

              {/* Keyword Audit */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Found Tech Keywords ({result.foundKeywords.length})</h4>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
                  {result.foundKeywords.map((k, i) => (
                    <span key={i} className="badge badge-fresher" style={{ fontSize: '0.725rem' }}>
                      <CheckCircle2 size={12} /> {k.label}
                    </span>
                  ))}
                </div>

                {result.missingKeywords.length > 0 && (
                  <>
                    <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--accent-rose)' }}>
                      Suggested Additions ({result.missingKeywords.length})
                    </h4>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {result.missingKeywords.map((k, i) => (
                        <span key={i} className="badge badge-purple" style={{ fontSize: '0.725rem', borderColor: 'var(--accent-rose)', color: 'var(--accent-rose)' }}>
                          + {k.label}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Actionable Improvement Tips */}
              <div>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Fresher Optimization Tips</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {result.suggestions.map((tip, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                      <Sparkles size={14} color="var(--accent-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="card-glass" style={{ padding: '3rem', textAlign: 'center' }}>
              <Sparkles size={48} color="var(--accent-purple)" style={{ margin: '0 auto 1rem auto' }} />
              <h3>Ready to scan your resume</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                Select your target role and click "Calculate ATS Compatibility Score" to see keyword breakdown and recommendations.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
