import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, KeyRound, Lock, CheckCircle } from 'lucide-react';

const Login = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Reset Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0); // seconds remaining
  const timerRef = useRef(null);
  const navigate = useNavigate();

  // Start 5-min countdown whenever we enter step 2
  useEffect(() => {
    if (step === 2) {
      setCountdown(5 * 60); // 300 seconds
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setCountdown(0);
    }
    return () => clearInterval(timerRef.current);
  }, [step]);

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/auth/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const text = await response.text();
      let data = {};
      try { data = JSON.parse(text); } catch(e) {}

      if (response.ok) {
        setMessage(data.message || 'OTP sent to your email.');
        setStep(2);
        setCountdown(5 * 60);
      } else {
        if (response.status === 400 || text.includes('User not found')) {
          setError('The email you entered is not registered. Please use a correct admin email.');
        } else {
          setError(data.message || text || 'Failed to send OTP.');
        }
      }
    } catch (err) {
      setError('Network error. Backend might be down.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const text = await response.text();
      let data = {};
      try { data = JSON.parse(text); } catch(e) {}

      if (response.ok) {
        if (data.requiresPasswordReset) {
          setMessage('First login detected. Please reset your password.');
          setStep(3);
        } else {
          localStorage.setItem('token', data.token);
          navigate('/admin');
        }
      } else {
        if (response.status === 400 || text.includes('Invalid') || text.includes('expired')) {
          setError('You used a wrong OTP. Please try again.');
        } else {
          setError(data.message || text || 'Invalid OTP.');
        }
      }
    } catch (err) {
      setError('Network error.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const text = await response.text();
      let data = {};
      try { data = JSON.parse(text); } catch(e) {}

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/admin');
      } else {
        setError(data.message || text || 'Failed to reset password.');
      }
    } catch (err) {
      setError('Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#09090e',
      color: '#f1f5f9',
      padding: '2rem'
    }}>
      
      {/* Awesome Return to Homepage Button */}
      <button 
        onClick={() => navigate('/')} 
        style={{
          position: 'absolute', top: '2rem', left: '2rem',
          background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border)',
          color: 'var(--text-secondary)', padding: '0.75rem 1.5rem', borderRadius: '999px',
          display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer',
          fontWeight: '500', transition: 'all 0.3s ease', backdropFilter: 'blur(10px)'
        }}
        onMouseOver={e => {
          e.currentTarget.style.background = 'var(--color-primary)';
          e.currentTarget.style.color = '#fff';
          e.currentTarget.style.borderColor = 'var(--color-primary)';
        }}
        onMouseOut={e => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          e.currentTarget.style.color = 'var(--text-secondary)';
          e.currentTarget.style.borderColor = 'var(--border)';
        }}
      >
        <ArrowLeft size={18} /> Return to Homepage
      </button>

      <div style={{
        width: '100%', maxWidth: '440px',
        background: '#0f0f17', padding: '2.5rem',
        borderRadius: '16px', border: '1px solid #1e1e2e',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <h2 style={{fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem', color: '#fff'}}>
            Admin Portal
          </h2>
          <p style={{color: 'var(--text-muted)'}}>
            {step === 1 && "Secure access to NTD Build operations."}
            {step === 2 && "Enter the OTP sent to your email."}
            {step === 3 && "Set your new administrator password."}
          </p>
        </div>
        
        {error && <div style={{background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.2)', fontSize: '0.9rem'}}>{error}</div>}
        {message && <div style={{background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.2)', fontSize: '0.9rem'}}>{message}</div>}
        
        {step === 1 && (
          <form onSubmit={handleRequestOtp}>
            <div style={{marginBottom: '1.5rem'}}>
              <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem'}}>
                <Mail size={16} /> Admin Email
              </label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
                placeholder="admin@ntdbuild.com"
                style={{
                  width: '100%', padding: '1rem', borderRadius: '8px',
                  backgroundColor: '#14141e', border: '1px solid #1e1e2e', 
                  color: '#ffffff', fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>
            
            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '1rem', background: 'var(--color-primary)', color: '#fff',
              border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer',
              opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s'
            }}>
              {loading ? 'Sending...' : 'Request OTP'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <div style={{marginBottom: '1.5rem'}}>
              <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem'}}>
                <KeyRound size={16} /> One-Time Password
              </label>
              <input 
                type="text" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
                required
                placeholder="Enter 6-digit OTP"
                style={{
                  width: '100%', padding: '1rem', borderRadius: '8px',
                  backgroundColor: '#14141e', border: '1px solid #1e1e2e', 
                  color: '#ffffff', fontSize: '1.25rem',
                  outline: 'none', letterSpacing: '4px', textAlign: 'center'
                }}
              />
            </div>
            
          {/* Countdown Timer */}
          {(() => {
            const mins = Math.floor(countdown / 60);
            const secs = countdown % 60;
            const expired = countdown === 0;
            const pct = countdown / 300; // 0..1
            const r = 36;
            const circ = 2 * Math.PI * r;
            const dash = circ * pct;
            return (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1.25rem 0' }}>
                {/* Circular ring */}
                <div style={{ position: 'relative', width: 90, height: 90, marginBottom: '0.75rem' }}>
                  <svg width="90" height="90" style={{ transform: 'rotate(-90deg)' }}>
                    {/* Track */}
                    <circle cx="45" cy="45" r={r} fill="none" stroke="#1e1e2e" strokeWidth="6" />
                    {/* Progress */}
                    <circle
                      cx="45" cy="45" r={r} fill="none"
                      stroke={expired ? '#ef4444' : countdown < 60 ? '#f59e0b' : '#10b981'}
                      strokeWidth="6"
                      strokeDasharray={`${dash} ${circ}`}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dasharray 1s linear, stroke 0.5s ease' }}
                    />
                  </svg>
                  <div style={{
                    position: 'absolute', inset: 0, display: 'flex',
                    flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <span style={{
                      fontSize: '1.1rem', fontWeight: '700',
                      color: expired ? '#ef4444' : countdown < 60 ? '#f59e0b' : '#f1f5f9',
                      fontVariantNumeric: 'tabular-nums'
                    }}>
                      {expired ? '0:00' : `${mins}:${String(secs).padStart(2, '0')}`}
                    </span>
                  </div>
                </div>

                {expired ? (
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                      OTP expired. Request a new one.
                    </p>
                    <button
                      type="button"
                      onClick={() => { setStep(1); setOtp(''); setError(''); setMessage(''); }}
                      style={{
                        padding: '0.5rem 1.25rem', background: 'rgba(239,68,68,0.15)',
                        border: '1px solid rgba(239,68,68,0.4)', color: '#ef4444',
                        borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem'
                      }}
                    >
                      ↩ Request New OTP
                    </button>
                  </div>
                ) : (
                  <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                    OTP expires in {mins}m {String(secs).padStart(2, '0')}s
                  </p>
                )}
              </div>
            );
          })()}

            <button type="submit" disabled={loading || countdown === 0} style={{
              width: '100%', padding: '1rem', background: countdown === 0 ? '#1e1e2e' : 'var(--color-primary)', color: countdown === 0 ? '#64748b' : '#fff',
              border: 'none', borderRadius: '8px', fontWeight: '600', cursor: countdown === 0 ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1, transition: 'all 0.2s'
            }}>
              {loading ? 'Verifying...' : 'Verify Access'}
            </button>

          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <div style={{marginBottom: '1.5rem'}}>
              <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem'}}>
                <Lock size={16} /> New Password
              </label>
              <input 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                required
                placeholder="Set a strong password"
                style={{
                  width: '100%', padding: '1rem', borderRadius: '8px',
                  backgroundColor: '#14141e', border: '1px solid #1e1e2e', 
                  color: '#ffffff', fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>
            
            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '1rem', background: 'var(--color-primary)', color: '#fff',
              border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer',
              opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
            }}>
              {loading ? 'Saving...' : <><CheckCircle size={18} /> Complete Setup & Login</>}
            </button>
          </form>
        )}
        
      </div>
    </div>
  );
};

export default Login;
