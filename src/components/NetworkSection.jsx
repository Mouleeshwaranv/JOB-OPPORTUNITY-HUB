import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare, 
  Send, 
  Building2, 
  Award,
  BookOpen
} from 'lucide-react';

export default function NetworkSection({ mockNetwork, onShowToast }) {
  const [connectedIds, setConnectedIds] = useState([]);
  const [referralSentIds, setReferralSentIds] = useState([]);

  const handleConnect = (id, name) => {
    if (connectedIds.includes(id)) return;
    setConnectedIds([...connectedIds, id]);
    onShowToast(`Connection request sent to ${name}!`);
  };

  const handleRequestReferral = (id, name) => {
    if (referralSentIds.includes(id)) return;
    setReferralSentIds([...referralSentIds, id]);
    onShowToast(`Referral request & portfolio message sent to ${name}!`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* HEADER BANNER */}
      <div className="card-glass" style={{
        padding: '1.75rem',
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(37, 99, 235, 0.15) 100%)',
        border: '1px solid rgba(6, 182, 212, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
          <Users size={22} color="var(--accent-cyan)" />
          <h2 style={{ fontSize: '1.4rem' }}>Fresher Network & Mentorship Hub</h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Connect directly with verified tech recruiters actively hiring freshers, and request referrals from alumni mentors.
        </p>
      </div>

      {/* NETWORK GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {mockNetwork.map(person => {
          const isConnected = connectedIds.includes(person.id);
          const isReferralSent = referralSentIds.includes(person.id);

          return (
            <div key={person.id} className="card-glass card-hover-lift" style={{ padding: '1.25rem', textAlign: 'center' }}>
              <img 
                src={person.avatar} 
                alt={person.name} 
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  margin: '0 auto 0.75rem auto',
                  border: '3px solid var(--border-color)'
                }}
              />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                <h3 style={{ fontSize: '1.05rem' }}>{person.name}</h3>
                <CheckCircle2 size={16} color="var(--accent-primary)" title="Verified Partner" />
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0.75rem 0' }}>
                {person.role}
              </p>

              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                🤝 {person.mutualConnections} Mutual Connections
              </div>

              {/* Tag / Role Badges */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                {person.isRecruiter && <span className="badge badge-brand">Active Recruiter</span>}
                {person.isMentor && <span className="badge badge-purple">Alumni Mentor</span>}
                {person.offersReferrals && <span className="badge badge-fresher">Offers Referrals</span>}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button 
                  onClick={() => handleConnect(person.id, person.name)}
                  disabled={isConnected}
                  className={`btn btn-sm ${isConnected ? 'btn-secondary' : 'btn-primary'}`}
                  style={{ width: '100%', gap: '0.35rem' }}
                >
                  <UserCheck size={14} />
                  {isConnected ? 'Connection Requested' : 'Connect'}
                </button>

                <button 
                  onClick={() => handleRequestReferral(person.id, person.name)}
                  disabled={isReferralSent}
                  className="btn btn-outline btn-sm"
                  style={{ width: '100%', gap: '0.35rem' }}
                >
                  <Send size={14} />
                  {isReferralSent ? 'Referral Requested' : 'Request Referral / Message'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
