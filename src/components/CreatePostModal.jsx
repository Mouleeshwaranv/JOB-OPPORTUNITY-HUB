import React, { useState } from 'react';
import { X, Image, Tag, Send, Sparkles, Code2, Award, Briefcase } from 'lucide-react';

export default function CreatePostModal({ isOpen, onClose, onSubmitPost, currentUser }) {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Project Showcase');
  const [imageUrl, setImageUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newPost = {
      id: `post_${Date.now()}`,
      author: {
        name: currentUser.name,
        headline: currentUser.headline,
        avatar: currentUser.avatar,
        verified: false
      },
      category: category,
      timestamp: 'Just now',
      content: content,
      image: imageUrl || null,
      likes: 0,
      comments: [],
      reposts: 0,
      isLiked: false
    };

    onSubmitPost(newPost);
    setContent('');
    setImageUrl('');
    setShowImageInput(false);
    onClose();
  };

  const categories = [
    { id: 'Project Showcase', icon: Code2, label: 'Project Showcase' },
    { id: 'Hiring Alert', icon: Briefcase, label: 'Hiring / Referral' },
    { id: 'Certification', icon: Award, label: 'Certification' },
    { id: 'Learnings', icon: Sparkles, label: 'Fresher Learnings' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.15rem' }}>
            <Sparkles size={20} color="var(--accent-primary)" /> Create Post
          </h3>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: '0.25rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* User Mini Profile Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{currentUser.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{currentUser.headline}</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Post Category Picker */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {categories.map(cat => {
              const IconComp = cat.icon;
              const isSelected = category === cat.id;
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    border: isSelected ? '1.5px solid var(--accent-primary)' : '1px solid var(--border-color)',
                    background: isSelected ? 'var(--accent-light)' : 'var(--bg-tertiary)',
                    color: isSelected ? 'var(--accent-primary)' : 'var(--text-secondary)'
                  }}
                >
                  <IconComp size={14} />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Content Textarea */}
          <textarea
            rows={5}
            placeholder="Share your latest project, fresher interview experience, GitHub repo, or job inquiry..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: '100%',
              resize: 'vertical',
              fontSize: '0.925rem',
              marginBottom: '1rem',
              padding: '0.85rem'
            }}
            required
          />

          {/* Optional Image URL Input */}
          {showImageInput && (
            <div style={{ marginBottom: '1rem' }}>
              <input 
                type="url" 
                placeholder="Paste Image URL (e.g. https://images.unsplash.com/...)"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                style={{ width: '100%', fontSize: '0.85rem' }}
              />
            </div>
          )}

          {/* Action Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button 
              type="button" 
              onClick={() => setShowImageInput(!showImageInput)}
              className="btn btn-secondary btn-sm"
              style={{ gap: '0.4rem' }}
            >
              <Image size={16} />
              <span>{showImageInput ? 'Remove Image' : 'Add Image URL'}</span>
            </button>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="button" onClick={onClose} className="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" style={{ gap: '0.4rem' }}>
                <Send size={16} />
                Publish Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
