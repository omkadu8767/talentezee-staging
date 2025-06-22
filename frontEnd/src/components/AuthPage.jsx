import React, { useState } from 'react';
import axios from 'axios'; 
import './AuthPage.css';

const AuthPage = ({ onLogin, url}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return false;
    }

    if (!isLogin && !formData.name) {
      setError('Name is required for registration');
      return false;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? 'api/auth/login' : 'api/auth/register';

      // Step 1: Register or login
      const response = await axios.post(`${url}/${endpoint}`, {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      const data = response.data;

      // Step 2: If it's a new registration, call enroll API
      if (!isLogin) {
        await axios.post(`${url}/api/enroll`, {
          userId: data.user.id,
          platform: 'TalentEzee' // or use a variable if dynamic
        });
      }

      // Step 3: Set logged-in state
      onLogin({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        token: data.token
      });

    } catch (err) {
      isLogin(false);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Simulate Google OAuth flow
      setIsLoading(true);
      setTimeout(() => {
        onLogin({
          id: 2,
          name: 'Google User',
          email: 'user@gmail.com',
          token: 'google-token-' + Date.now()
        });
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      setError('Google login failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleLinkedInLogin = async () => {
    try {
      // Simulate LinkedIn OAuth flow
      setIsLoading(true);
      setTimeout(() => {
        onLogin({
          id: 3,
          name: 'LinkedIn User',
          email: 'user@linkedin.com',
          token: 'linkedin-token-' + Date.now()
        });
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      setError('LinkedIn login failed. Please try again.');
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setError('');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>TalentEzee Impact</h1>
          <p>{isLogin ? 'Welcome back!' : 'Join TalentEzee today'}</p>
        </div>

        <div className="auth-tabs">
          <button 
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
          <button 
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required={!isLogin}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required={!isLogin}
              />
            </div>
          )}

          <button 
            type="submit" 
            className="auth-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-text">
                <span className="spinner-small"></span>
                {isLogin ? 'Signing In...' : 'Creating Account...'}
              </span>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>or continue with</span>
        </div>

        <div className="social-auth">
          <button 
            className="social-btn google-btn"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <span className="social-icon">🔍</span>
            Continue with Google
          </button>
          
          <button 
            className="social-btn linkedin-btn"
            onClick={handleLinkedInLogin}
            disabled={isLoading}
          >
            <span className="social-icon">💼</span>
            Continue with LinkedIn
          </button>
        </div>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button" 
              className="auth-switch-btn"
              onClick={switchMode}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
          
          {isLogin && (
            <p>
              <button type="button" className="forgot-password-btn">
                Forgot your password?
              </button>
            </p>
          )}
        </div>

        <div className="auth-benefits">
          <h3>Why choose TalentEzee?</h3>
          <ul>
            <li>✨ AI-powered job matching</li>
            <li>📄 Smart resume optimization</li>
            <li>🎯 Personalized career insights</li>
            <li>🤝 Direct recruiter connections</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;