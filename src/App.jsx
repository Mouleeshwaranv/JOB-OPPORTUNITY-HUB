import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import FeedSection from './components/FeedSection.jsx';
import JobsSection from './components/JobsSection.jsx';
import ProfileSection from './components/ProfileSection.jsx';
import ResumeAnalyzer from './components/ResumeAnalyzer.jsx';
import ApplicationTracker from './components/ApplicationTracker.jsx';
import NetworkSection from './components/NetworkSection.jsx';
import CreatePostModal from './components/CreatePostModal.jsx';

import { 
  initialCurrentUser, 
  initialJobs, 
  initialPosts, 
  mockNetwork, 
  mockApplicationTracker 
} from './data/mockData.js';

export default function App() {
  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('joh_theme') || 'dark';
  });

  // Active Tab Routing State
  const [activeTab, setActiveTab] = useState('feed');
  const [searchQuery, setSearchQuery] = useState('');

  // Core Data States
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('joh_user');
    return saved ? JSON.parse(saved) : initialCurrentUser;
  });

  const [jobs, setJobs] = useState(initialJobs);
  const [appliedJobIds, setAppliedJobIds] = useState(['job_01']);
  const [posts, setPosts] = useState(initialPosts);
  const [applications, setApplications] = useState(mockApplicationTracker);

  // Modals & Notifications
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync Theme to HTML Root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('joh_theme', theme);
  }, [theme]);

  // Persist Profile
  useEffect(() => {
    localStorage.setItem('joh_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Job Application Action
  const handleApplyJob = (jobId) => {
    if (appliedJobIds.includes(jobId)) return;
    
    setAppliedJobIds([...appliedJobIds, jobId]);

    const targetJob = jobs.find(j => j.id === jobId);
    if (targetJob) {
      const newApp = {
        id: `app_${Date.now()}`,
        jobTitle: targetJob.title,
        company: targetJob.company,
        appliedDate: new Date().toISOString().split('T')[0],
        status: 'Applied',
        nextStep: 'Awaiting recruiter review',
        matchScore: targetJob.matchScore,
        notes: 'Submitted via Quick Apply on Job Opportunity Hub'
      };
      setApplications([newApp, ...applications]);
    }

    showToast('🎉 Application successfully submitted! Track status in Application Tracker.');
  };

  // Post Actions
  const handleCreatePost = (newPost) => {
    setPosts([newPost, ...posts]);
    showToast('🚀 Your post has been published to the fresher feed!');
  };

  const handleLikePost = (postId) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          isLiked: !p.isLiked,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1
        };
      }
      return p;
    }));
  };

  const handleAddComment = (postId, commentObj) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, commentObj]
        };
      }
      return p;
    }));
    showToast('Comment added!');
  };

  // Application Tracker Actions
  const handleUpdateApplicationStatus = (appId, newStatus) => {
    setApplications(applications.map(app => {
      if (app.id === appId) {
        return { ...app, status: newStatus };
      }
      return app;
    }));
    showToast(`Application status updated to "${newStatus}"!`);
  };

  const handleAddApplication = (newAppObj) => {
    setApplications([newAppObj, ...applications]);
    showToast('New application record added to tracker!');
  };

  return (
    <div className="app-container">
      {/* Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={toggleTheme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenCreatePost={() => setIsCreatePostOpen(true)}
        currentUser={currentUser}
        notificationsCount={2}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 2000,
          background: 'var(--bg-glass)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--accent-primary)',
          color: 'var(--text-primary)',
          padding: '0.85rem 1.35rem',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-xl)',
          fontWeight: 600,
          fontSize: '0.95rem',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          {toastMessage}
        </div>
      )}

      {/* Main Page View Container */}
      <main className="main-content">
        {activeTab === 'feed' && (
          <FeedSection
            posts={posts}
            onLikePost={handleLikePost}
            onAddComment={handleAddComment}
            currentUser={currentUser}
            onOpenCreatePost={() => setIsCreatePostOpen(true)}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'jobs' && (
          <JobsSection
            jobs={jobs}
            appliedJobIds={appliedJobIds}
            onApplyJob={handleApplyJob}
            currentUser={currentUser}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileSection
            currentUser={currentUser}
            onUpdateProfile={setCurrentUser}
          />
        )}

        {activeTab === 'resume' && (
          <ResumeAnalyzer
            currentUser={currentUser}
          />
        )}

        {activeTab === 'tracker' && (
          <ApplicationTracker
            applications={applications}
            onUpdateApplicationStatus={handleUpdateApplicationStatus}
            onAddApplication={handleAddApplication}
          />
        )}

        {activeTab === 'network' && (
          <NetworkSection
            mockNetwork={mockNetwork}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onSubmitPost={handleCreatePost}
        currentUser={currentUser}
      />
    </div>
  );
}
