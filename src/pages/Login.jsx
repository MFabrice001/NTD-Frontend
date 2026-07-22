import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/admin');
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 style={{marginBottom: '1.5rem', textAlign: 'center'}}>Admin Portal</h2>
        
        {error && <div className="error-message" style={{color: 'red', marginBottom: '1rem', textAlign: 'center'}}>{error}</div>}
        
        <form onSubmit={handleLogin} className="login-form">
          <div style={{marginBottom: '1.5rem'}}>
            <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 600}}>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
              className="login-input"
            />
          </div>
          
          <div style={{marginBottom: '2rem'}}>
            <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 600}}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
              className="login-input"
            />
          </div>
          
          <button type="submit" className="btn btn-dark" style={{width: '100%', padding: '0.75rem', marginTop: '1rem'}}>
            SIGN IN
          </button>
        </form>
        
        <div style={{marginTop: '1.5rem', textAlign: 'center'}}>
          <button 
            onClick={() => navigate('/')} 
            style={{background: 'none', border: 'none', color: '#6b7280', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.9rem'}}
          >
            &larr; Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
