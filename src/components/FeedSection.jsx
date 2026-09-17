import React, { useState } from 'react';
import { 
  Heart, 
  MessageSquare, 
  Repeat, 
  Share2, 
  Sparkles, 
  PlusSquare, 
  CheckCircle2, 
  TrendingUp, 
  ExternalLink,
  Code2,
  Briefcase,
  Award,
  BookOpen,
  Send,
  Eye,
  Award as MedalIcon
} from 'lucide-react';

export default function FeedSection({ 
  posts, 
  onLikePost, 
  onAddComment, 
  currentUser, 
  onOpenCreatePost,
  setActiveTab
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedComments, setExpandedComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleCommentSubmit = (postId, e) => {
    e.preventDefault();
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    onAddComment(postId, {
      id: `c_${Date.now()}`,
      author: currentUser.name,
      text: text.trim(),
      timestamp: 'Just now'
    });

    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const categories = ['All', 'Hiring Alert', 'Project Showcase', 'Interview Tips'];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '260px 1fr 300px',
      gap: '1.5rem',
      alignItems: 'start'
    }}>
      {/* LEFT COLUMN: Candidate Quick Stats Widget */}
      <aside className="card-glass" style={{ overflow: 'hidden' }}>
        <div style={{
          height: '70px',
          background: 'var(--gradient-hero)',
          position: 'relative'
        }}>
          {currentUser.isOpenToWork && (
            <span className="badge badge-fresher" style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: '#10b981',
              color: '#ffffff',
              fontSize: '0.65rem'
            }}>
              Open To Work
            </span>
          )}
        </div>

        <div style={{ padding: '0 1rem 1.25rem 1rem', textAlign: 'center', marginTop: '-35px' }}>
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name}
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              border: '3px solid var(--bg-secondary)',
              objectFit: 'cover',
              margin: '0 auto 0.5rem auto'
            }}
          />
          <h3 style={{ fontSize: '1.05rem', lineHeight: 1.2 }}>{currentUser.name}</h3>
          <p style={{ fontSize: '0.785rem', color: 'var(--text-muted)', margin: '0.25rem 0 0.75rem 0' }}>
            {currentUser.headline}
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.5rem',
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1rem'
          }}>
            <MedalIcon size={16} color="var(--accent-emerald)" />
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>
              Fresher Match Index: <strong style={{ color: 'var(--accent-emerald)' }}>{currentUser.matchScoreOverall}%</strong>
            </span>
          </div>

          <div style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            fontSize: '0.8rem',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Profile Views</span>
              <strong style={{ color: 'var(--accent-primary)' }}>{currentUser.profileViews}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Search Appearances</span>
              <strong style={{ color: 'var(--accent-primary)' }}>{currentUser.searchAppearances}</strong>
            </div>
          </div>

          <button 
            onClick={() => setActiveTab('profile')}
            className="btn btn-outline btn-sm"
            style={{ width: '100%', marginTop: '1rem' }}
          >
            View Full Profile
          </button>
        </div>
      </aside>

      {/* CENTER COLUMN: Main Feed Stream */}
      <main style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Create Post Card Trigger */}
        <div className="card-glass" style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <button 
              onClick={onOpenCreatePost}
              style={{
                flex: 1,
                textAlign: 'left',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-muted)',
                fontSize: '0.875rem'
              }}
            >
              Share your project showcase, interview tips, or job inquiry...
            </button>
          </div>
          <div style={{
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            marginTop: '0.75rem',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--border-color)'
          }}>
            <button onClick={onOpenCreatePost} className="btn btn-ghost btn-sm" style={{ gap: '0.35rem', color: '#06b6d4' }}>
              <Code2 size={16} /> Show Project
            </button>
            <button onClick={onOpenCreatePost} className="btn btn-ghost btn-sm" style={{ gap: '0.35rem', color: '#10b981' }}>
              <Briefcase size={16} /> Hiring Alert
            </button>
            <button onClick={onOpenCreatePost} className="btn btn-ghost btn-sm" style={{ gap: '0.35rem', color: '#8b5cf6' }}>
              <BookOpen size={16} /> Share Learnings
            </button>
          </div>
        </div>

        {/* Filter Category Chips */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts Stream */}
        {filteredPosts.map(post => (
          <article key={post.id} className="card-glass card-hover-lift" style={{ padding: '1.25rem' }}>
            {/* Post Author Info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <h4 style={{ fontSize: '0.95rem' }}>{post.author.name}</h4>
                    {post.author.verified && (
                      <CheckCircle2 size={14} color="var(--accent-primary)" title="Verified Recruiter / Mentor" />
                    )}
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{post.author.headline}</p>
                  <span style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>{post.timestamp}</span>
                </div>
              </div>

              <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                {post.category}
              </span>
            </div>

            {/* Post Content Body */}
            <div style={{
              fontSize: '0.9rem',
              lineHeight: 1.6,
              color: 'var(--text-primary)',
              whiteSpace: 'pre-line',
              marginBottom: '1rem'
            }}>
              {post.content}
            </div>

            {/* Optional Post Image */}
            {post.image && (
              <div style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                marginBottom: '1rem',
                maxHeight: '380px',
                border: '1px solid var(--border-color)'
              }}>
                <img 
                  src={post.image} 
                  alt="Post attachment" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            )}

            {/* Like & Reaction Metrics Bar */}
            <div style={{
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center',
              padding: '0.5rem 0',
              borderTop: '1px solid var(--border-color)',
              fontSize: '0.775rem',
              color: 'var(--text-muted)'
            }}>
              <span>❤️ {post.likes} Likes</span>
              <span>{post.comments.length} Comments • {post.reposts} Reposts</span>
            </div>

            {/* Action Buttons Row */}
            <div style={{
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '0.5rem',
              marginTop: '0.25rem'
            }}>
              <button 
                onClick={() => onLikePost(post.id)}
                className="btn btn-ghost btn-sm"
                style={{ color: post.isLiked ? 'var(--accent-rose)' : 'var(--text-secondary)' }}
              >
                <Heart size={18} fill={post.isLiked ? 'var(--accent-rose)' : 'none'} />
                <span>{post.isLiked ? 'Liked' : 'Like'}</span>
              </button>

              <button 
                onClick={() => toggleComments(post.id)}
                className="btn btn-ghost btn-sm"
              >
                <MessageSquare size={18} />
                <span>Comment</span>
              </button>

              <button className="btn btn-ghost btn-sm">
                <Repeat size={18} />
                <span>Repost</span>
              </button>

              <button className="btn btn-ghost btn-sm">
                <Share2 size={18} />
                <span>Share</span>
              </button>
            </div>

            {/* Expandable Comments Section */}
            {expandedComments[post.id] && (
              <div style={{
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                {/* Existing Comments */}
                {post.comments.map(c => (
                  <div key={c.id} style={{
                    padding: '0.6rem 0.85rem',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.825rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                      <strong style={{ fontSize: '0.8rem' }}>{c.author}</strong>
                      <span style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>{c.timestamp}</span>
                    </div>
                    <div>{c.text}</div>
                  </div>
                ))}

                {/* Add New Comment Input */}
                <form 
                  onSubmit={(e) => handleCommentSubmit(post.id, e)}
                  style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}
                >
                  <input 
                    type="text" 
                    placeholder="Write a comment..." 
                    value={commentInputs[post.id] || ''}
                    onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                    style={{ flex: 1, fontSize: '0.825rem', height: '36px' }}
                  />
                  <button type="submit" className="btn btn-primary btn-sm">
                    <Send size={14} />
                  </button>
                </form>
              </div>
            )}
          </article>
        ))}
      </main>

      {/* RIGHT COLUMN: Trending News & AI Resume CTA */}
      <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* AI Resume Analyzer Banner Widget */}
        <div className="card-glass" style={{
          padding: '1.25rem',
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
          border: '1px solid rgba(37, 99, 235, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Sparkles size={20} color="var(--accent-primary)" />
            <h4 style={{ fontSize: '0.95rem' }}>Fresher ATS Resume Check</h4>
          </div>
          <p style={{ fontSize: '0.785rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
            Check if your resume scores high enough for 2025 SDE-1 and GET hiring filters.
          </p>
          <button 
            onClick={() => setActiveTab('resume')}
            className="btn btn-primary btn-sm"
            style={{ width: '100%' }}
          >
            Analyze My Resume Now
          </button>
        </div>

        {/* Trending Fresher News Widget */}
        <div className="card-glass" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <TrendingUp size={18} color="var(--accent-primary)" />
            <h4 style={{ fontSize: '0.95rem' }}>Trending Fresher Insights</h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {[
              { title: "Off-Campus Hiring Drives 2025", readers: "14.2k Freshers Reading", topic: "Campus Hiring" },
              { title: "Top React vs Next.js Questions for SDE-1", readers: "9.8k Freshers Reading", topic: "Tech Prep" },
              { title: "Average Entry-Level Package Hits 7.2 LPA", readers: "22.1k Freshers Reading", topic: "Industry Trends" },
              { title: "How to Build a Portfolio that Recruiters Love", readers: "11.5k Freshers Reading", topic: "Career Advice" }
            ].map((news, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                <span className="badge badge-brand" style={{ width: 'fit-content', fontSize: '0.625rem', padding: '0.05rem 0.35rem' }}>
                  {news.topic}
                </span>
                <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer' }}>
                  {news.title}
                </span>
                <span style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>{news.readers}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
