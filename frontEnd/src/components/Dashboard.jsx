import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import StripeModal from './StripeModal'; 
import RaffleWidget from './RaffleWidget';

const Dashboard = ({ user, setCredits, credits, updateCredits, url }) => {
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({
    totalApplications: 100,
    activeJobs: 10,
    profileViews: 5,
    responseRate: 30,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      const activitiesResponse = await fetch(`${url}/api/user/activities/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const statsResponse = await fetch(`${url}/api/user/stats/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (activitiesResponse.ok) {
        const activitiesData = await activitiesResponse.json();
        setActivities(activitiesData.activities || []);
      }

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData.stats);
        setCredits(statsData.stats.credits)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = async (action) => {
    try {
      const response = await fetch(`${url}/api/user/quick-action`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ action, userId: user.id })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.creditsUsed) {
          updateCredits(credits - data.creditsUsed);
        }
        await fetch(`${url}/api/raffle/award`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user.id, action })
        })
        .then(res => res.json())
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error performing quick action:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'application':
        return '📄';
      case 'interview':
        return '🎤';
      case 'profile_view':
        return '👀';
      case 'message':
        return '💬';
      default:
        return '📋';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#28a745';
      case 'pending':
        return '#ffc107';
      case 'rejected':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user.name}!</h1>
        <p>Here's what's happening with your job search</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">{stats.totalApplications}</div>
          <div className="stat-label">Total Applications</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.activeJobs}</div>
          <div className="stat-label">Active Job Searches</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.profileViews}</div>
          <div className="stat-label">Profile Views</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.responseRate}%</div>
          <div className="stat-label">Response Rate</div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <button 
              className="action-btn primary"
              onClick={() => handleQuickAction('search_jobs')}
            >
              🔍 Search New Jobs
            </button>
            <button 
              className="action-btn secondary"
              onClick={() => handleQuickAction('update_profile')}
            >
              ✏️ Update Profile
            </button>
            <button 
              className="action-btn tertiary"
              onClick={() => handleQuickAction('generate_resume')}
            >
              📄 Generate Resume
            </button>
            <button 
              className="action-btn quaternary"
              onClick={() => handleQuickAction('practice_interview')}
            >
              🎭 Practice Interview
            </button>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">{activity.title}</div>
                    <div className="activity-date">{formatDate(activity.date)}</div>
                  </div>
                  <div 
                    className="activity-status"
                    style={{ backgroundColor: getStatusColor(activity.status) }}
                  >
                    {activity.status}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-activities">
                <p>No recent activities. Start by searching for jobs or updating your profile!</p>
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Credits Overview</h2>
          <div className="credits-section">
            <div className="credits-display">
              <span className="credits-number">{credits}</span>
              <span className="credits-label">Credits Available</span>
            </div>
            <div className="credits-info">
              <p>Use credits for premium features like AI resume optimization, interview coaching, and personalized job matching.</p>
              <button
                className="btn-purchase-credits"
                onClick={() => setShowStripeModal(true)}
              >
                💳 Purchase More Credits
              </button>
              {showStripeModal && (
                <StripeModal userId={user.id} onClose={() => setShowStripeModal(false)} setCredits={setCredits}/>
              )}
            </div>
          </div>
        </div>
      </div>
      <RaffleWidget userId={user.id} url={url} />
    </div>
  );
};

export default Dashboard;