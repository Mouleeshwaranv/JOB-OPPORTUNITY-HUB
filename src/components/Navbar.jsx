import React, { useState } from 'react';
import { 
  Briefcase, 
  Home, 
  Users, 
  FileText, 
  UserCheck, 
  Search, 
  Moon, 
  Sun, 
  PlusSquare, 
  Bell, 
  Sparkles,
  TrendingUp,
  CheckCircle,
  X
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  theme, 
  toggleTheme, 
  searchQuery, 
  setSearchQuery, 
  onOpenCreatePost,
  currentUser,
  notificationsCount
}) {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: "Interview Invitation", text: "TechCorp invited you for Technical Round 1", time: "10 mins ago", unread: true },
    { id: 2, title: "Profile Impression", text: "Senior Recruiter @ Google viewed your portfolio", time: "1 hour ago", unread: true },
    { id: 3, title: "Job Alert", text: "3 new Fresher GET roles matching your profile were posted", time: "3 hours ago", unread: false }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--bg-glass)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      borderBottom: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-sm)',
      transition: 'background var(--transition-normal)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0.75rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        {/* Logo Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div 
            onClick={() => setActiveTab('feed')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.6rem', 
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
            }}>
              <Briefcase size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ 
                  fontFamily: 'var(--font-family-heading)', 
                  fontWeight: 800, 
                  fontSize: '1.25rem',
                  letterSpacing: '-0.03em',
                  background: 'var(--gradient-brand)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  JOB OPPORTUNITY HUB
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '-2px' }}>
                <span className="badge badge-brand" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>
                  <Sparkles size={10} /> FRESHER PORTAL
                </span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div style={{ position: 'relative', width: '260px', marginLeft: '0.5rem' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search jobs, skills, companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                paddingLeft: '2.3rem',
                paddingRight: '0.75rem',
                fontSize: '0.85rem',
                height: '38px',
                borderRadius: 'var(--radius-full)'
              }}
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          {[
            { id: 'feed', label: 'Home Feed', icon: Home },
            { id: 'jobs', label: 'Fresher Jobs', icon: Briefcase, badge: 'Hiring' },
            { id: 'network', label: 'Network', icon: Users },
            { id: 'tracker', label: 'Tracker', icon: CheckCircle },
            { id: 'resume', label: 'AI Resume', icon: Sparkles, highlight: true },
            { id: 'profile', label: 'My Profile', icon: UserCheck }
          ].map(tab => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`btn btn-ghost ${isActive ? 'active-tab' : ''}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.75rem',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--accent-light)' : 'transparent',
                  borderBottom: isActive ? '2px solid var(--accent-primary)' : '2px solid transparent',
                  position: 'relative'
                }}
              >
                <div style={{ position: 'relative' }}>
                  <IconComponent size={19} color={isActive ? 'var(--accent-primary)' : 'var(--text-secondary)'} />
                  {tab.badge && (
                    <span style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-10px',
                      background: 'var(--accent-emerald)',
                      color: '#ffffff',
                      fontSize: '0.55rem',
                      fontWeight: 700,
                      padding: '0.05rem 0.3rem',
                      borderRadius: 'var(--radius-full)'
                    }}>
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {/* Create Post Action */}
          <button 
            onClick={onOpenCreatePost}
            className="btn btn-primary btn-sm"
            style={{ gap: '0.4rem' }}
          >
            <PlusSquare size={16} />
            <span>Post</span>
          </button>

          {/* Notifications Toggle */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.5rem', borderRadius: 'var(--radius-full)', position: 'relative' }}
              title="Notifications"
            >
              <Bell size={18} />
              {notificationsCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  background: 'var(--accent-rose)',
                  color: '#ffffff',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {notificationsCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="card-glass" style={{
                position: 'absolute',
                right: 0,
                top: '48px',
                width: '320px',
                padding: '1rem',
                zIndex: 200,
                boxShadow: 'var(--shadow-xl)',
                animation: 'slideUp 0.2s ease'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h4 style={{ fontSize: '0.95rem' }}>Notifications</h4>
                  <button onClick={() => setShowNotifications(false)} style={{ color: 'var(--text-muted)' }}>
                    <X size={16} />
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {notifications.map(n => (
                    <div key={n.id} style={{
                      padding: '0.6rem',
                      borderRadius: 'var(--radius-sm)',
                      background: n.unread ? 'var(--accent-light)' : 'var(--bg-tertiary)',
                      borderLeft: n.unread ? '3px solid var(--accent-primary)' : 'none'
                    }}>
                      <div style={{ fontWeight: 600, fontSize: '0.825rem' }}>{n.title}</div>
                      <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>{n.text}</div>
                      <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{n.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme Switcher Button */}
          <button 
            onClick={toggleTheme}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.5rem', borderRadius: 'var(--radius-full)' }}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
          </button>

          {/* User Profile Mini Thumbnail */}
          <div 
            onClick={() => setActiveTab('profile')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              cursor: 'pointer',
              padding: '0.25rem 0.5rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)'
            }}
          >
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-primary)' }}>Alex</span>
              <span style={{ fontSize: '0.65rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>Ready to Hire</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
