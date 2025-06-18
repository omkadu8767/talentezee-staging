import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({ user }) => {
  const features = [
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" stroke="var(--primary-color)" strokeWidth="2"/>
          <path d="M16 24l6 6 12-12" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Smart Talent Matching",
      description: "Our AI-powered system connects you with opportunities that perfectly match your skills and aspirations."
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="8" y="12" width="32" height="24" rx="4" stroke="var(--primary-color)" strokeWidth="2"/>
          <path d="M8 20h32M16 28h8M16 32h12" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: "Credit-Based System",
      description: "Earn and spend credits for premium features, assessments, and exclusive opportunities."
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="20" r="8" stroke="var(--primary-color)" strokeWidth="2"/>
          <path d="M12 40c0-8 5.4-12 12-12s12 4 12 12" stroke="var(--primary-color)" strokeWidth="2"/>
          <circle cx="36" cy="16" r="4" fill="var(--accent-color)"/>
        </svg>
      ),
      title: "Profile Management",
      description: "Build a comprehensive profile showcasing your skills, experience, and achievements."
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="8" y="8" width="32" height="32" rx="4" stroke="var(--primary-color)" strokeWidth="2"/>
          <circle cx="20" cy="20" r="4" fill="var(--accent-color)"/>
          <circle cx="28" cy="28" r="4" fill="var(--primary-color)"/>
          <path d="M20 24l8 4" stroke="var(--primary-color)" strokeWidth="2"/>
        </svg>
      ),
      title: "Raffle System",
      description: "Participate in exclusive raffles and win premium features, courses, and rewards."
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "500+", label: "Companies" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Unlock Your Talent
                <span className="hero-highlight"> Potential</span>
              </h1>
              <p className="hero-description">
                TalentEzee Impact is your gateway to professional growth. 
                Connect with opportunities, build your profile, and make a lasting impact in your career.
              </p>
              <div className="hero-actions">
                {user ? (
                  <Link to="/dashboard" className="btn btn-primary btn-large">
                    Go to Dashboard
                  </Link>
                ) : (
                  <Link to="/auth" className="btn btn-primary btn-large">
                    Get Started Free
                  </Link>
                )}
                <button className="btn btn-ghost btn-large">
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-card floating">
                <div className="hero-card-header">
                  <div className="hero-avatar"></div>
                  <div className="hero-info">
                    <div className="hero-name"></div>
                    <div className="hero-role"></div>
                  </div>
                </div>
                <div className="hero-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '75%'}}></div>
                  </div>
                  <span className="progress-text">Profile Completion</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-background">
          <div className="hero-shape hero-shape-1"></div>
          <div className="hero-shape hero-shape-2"></div>
          <div className="hero-shape hero-shape-3"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats-container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">Why Choose TalentEzee Impact?</h2>
            <p className="features-description">
              Discover the powerful features that make us the preferred platform for talent development
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Career?</h2>
            <p className="cta-description">
              Join thousands of professionals who have already started their journey with TalentEzee Impact
            </p>
            <div className="cta-actions">
              {user ? (
                <Link to="/profile" className="btn btn-primary btn-large">
                  Complete Your Profile
                </Link>
              ) : (
                <>
                  <Link to="/auth" className="btn btn-primary btn-large">
                    Sign Up Now
                  </Link>
                  <Link to="/auth" className="btn btn-ghost btn-large">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;