import { useState } from 'react';

const API_URL = 'http://localhost:5000/api/auth';

export default function AuthScreen({ onLogin, initialMode = 'login' }) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!isLogin && !form.name.trim()) e.name = 'Full Name is required';
    if (!form.email.trim()) e.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email';
    
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';

    if (!isLogin && form.password !== form.confirmPassword) {
      e.confirmPassword = 'Passwords do not match';
    }
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) return setErrors(v);

    setIsLoading(true);
    setErrors({});

    try {
      const endpoint = isLogin ? '/login' : '/register';
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      // Save token to localStorage for persistence
      localStorage.setItem('token', data.token);
      onLogin(data.user);
    } catch (err) {
      setErrors({ server: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const update = (field, val) => {
    setForm({ ...form, [field]: val });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
    if (errors.server) setErrors({ ...errors, server: '' });
  };

  return (
    <div className="auth-screen">
      <div className="auth-header">
        <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
        <p>{isLogin ? 'Sign in to continue booking events' : 'Join us and explore amazing events'}</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {errors.server && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', padding: '12px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px', border: '1px solid rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {errors.server}
          </div>
        )}

        {!isLogin && (
          <div className="input-group">
            <input
              type="text"
              placeholder=" "
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className={errors.name ? 'input-error' : ''}
              autoComplete="off"
            />
            <label>Full Name</label>
            <span className="input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </span>
            {errors.name && <div className="error-text">{errors.name}</div>}
          </div>
        )}
        <div className="input-group">
          <input
            type="email"
            placeholder=" "
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className={errors.email ? 'input-error' : ''}
            autoComplete="off"
          />
          <label>Email Address</label>
          <span className="input-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </span>
          {errors.email && <div className="error-text">{errors.email}</div>}
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder=" "
            value={form.password}
            onChange={(e) => update('password', e.target.value)}
            className={errors.password ? 'input-error' : ''}
            autoComplete="off"
          />
          <label>Password</label>
          <span className="input-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </span>
          {errors.password && <div className="error-text">{errors.password}</div>}
        </div>
        
        {isLogin && (
          <div style={{ textAlign: 'right', marginTop: '-8px' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '13px', cursor: 'pointer' }}>Forgot Password?</span>
          </div>
        )}

        {!isLogin && (
          <div className="input-group">
            <input
              type="password"
              placeholder=" "
              value={form.confirmPassword}
              onChange={(e) => update('confirmPassword', e.target.value)}
              className={errors.confirmPassword ? 'input-error' : ''}
              autoComplete="off"
            />
            <label>Confirm Password</label>
            <span className="input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </span>
            {errors.confirmPassword && <div className="error-text">{errors.confirmPassword}</div>}
          </div>
        )}

        <button type="submit" className="btn-gradient" style={{ marginTop: '12px' }} disabled={isLoading}>
          {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
        </button>
      </form>

      <div className="auth-footer">
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <span onClick={() => { setIsLogin(!isLogin); setErrors({}); }}>
          {isLogin ? 'Register' : 'Login'}
        </span>
      </div>
    </div>
  );
}
