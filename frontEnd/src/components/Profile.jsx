import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = ({ user, credits, updateCredits, url }) => {
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    location: '',
    title: '',
    summary: '',
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    profilePicture: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    fetchProfileData();
  }, [user]);

  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${url}/api/user/profile/data/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      

      if (response.ok) {
        const data = await response.json();
        setProfileData({ ...profileData, ...data.profile });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleArrayAdd = (field, item) => {
    setProfileData({
      ...profileData,
      [field]: [...profileData[field], { ...item, id: Date.now() }]
    });
  };

  const handleArrayRemove = (field, id) => {
    setProfileData({
      ...profileData,
      [field]: profileData[field].filter(item => item.id !== id)
    });
  };

  const handleArrayUpdate = (field, id, updatedItem) => {
    setProfileData({
      ...profileData,
      [field]: profileData[field].map(item => 
        item.id === id ? { ...item, ...updatedItem } : item
      )
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/user/profile/post/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(profileData)
      });

      if (response.ok) {
        setIsEditing(false);
        alert('Profile updated successfully!');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again.');
    }
  };

  const handleAIOptimize = async () => {
    if (credits < 10) {
      alert('You need at least 10 credits to use AI optimization.');
      return;
    }

    try {
      const response = await fetch('/api/ai/optimize-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ userId: user.id, profileData })
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData({ ...profileData, ...data.optimizedProfile });
        updateCredits(credits - 10);
        alert('Profile optimized using AI!');
      }
    } catch (error) {
      console.error('Error optimizing profile:', error);
      alert('Error optimizing profile. Please try again.');
    }
  };

  const addSkill = (skill) => {
    if (skill && !profileData.skills.includes(skill)) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, skill]
      });
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  if (isLoading) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-picture">
            {profileData.profilePicture ? (
              <img src={profileData.profilePicture} alt="Profile" />
            ) : (
              <div className="default-avatar">
                {profileData.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="profile-details">
            <h1>{profileData.name}</h1>
            <p className="profile-title">{profileData.title}</p>
            <p className="profile-location">📍 {profileData.location}</p>
          </div>
        </div>
        <div className="profile-actions">
          {!isEditing ? (
            <>
              <button className="btn-edit" onClick={() => setIsEditing(true)}>
                ✏️ Edit Profile
              </button>
              <button className="btn-ai-optimize" onClick={handleAIOptimize}>
                🤖 AI Optimize (10 credits)
              </button>
            </>
          ) : (
            <>
              <button className="btn-save" onClick={handleSave}>
                💾 Save Changes
              </button>
              <button className="btn-cancel" onClick={() => setIsEditing(false)}>
                ❌ Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <div className="profile-tabs">
        <button 
          className={`tab ${activeTab === 'basic' ? 'active' : ''}`}
          onClick={() => setActiveTab('basic')}
        >
          Basic Info
        </button>
        <button 
          className={`tab ${activeTab === 'experience' ? 'active' : ''}`}
          onClick={() => setActiveTab('experience')}
        >
          Experience
        </button>
        <button 
          className={`tab ${activeTab === 'education' ? 'active' : ''}`}
          onClick={() => setActiveTab('education')}
        >
          Education
        </button>
        <button 
          className={`tab ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          Skills
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'basic' && (
          <div className="tab-content">
            <h2>Basic Information</h2>
            <div className="form-group">
              <label>Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              ) : (
                <p>{profileData.name}</p>
              )}
            </div>
            
            <div className="form-group">
              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              ) : (
                <p>{profileData.email}</p>
              )}
            </div>

            <div className="form-group">
              <label>Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              ) : (
                <p>{profileData.phone}</p>
              )}
            </div>

            <div className="form-group">
              <label>Location</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              ) : (
                <p>{profileData.location}</p>
              )}
            </div>

            <div className="form-group">
              <label>Professional Title</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              ) : (
                <p>{profileData.title}</p>
              )}
            </div>

            <div className="form-group">
              <label>Professional Summary</label>
              {isEditing ? (
                <textarea
                  value={profileData.summary}
                  onChange={(e) => handleInputChange('summary', e.target.value)}
                  rows="4"
                />
              ) : (
                <p>{profileData.summary}</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="tab-content">
            <div className="section-header">
              <h2>Work Experience</h2>
              {isEditing && (
                <button 
                  className="btn-add"
                  onClick={() => handleArrayAdd('experience', {
                    company: '',
                    position: '',
                    startDate: '',
                    endDate: '',
                    description: ''
                  })}
                >
                  + Add Experience
                </button>
              )}
            </div>
            
            {profileData.experience.map((exp) => (
              <div key={exp.id} className="experience-item">
                {isEditing ? (
                  <div className="experience-form">
                    <input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => handleArrayUpdate('experience', exp.id, { company: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Position"
                      value={exp.position}
                      onChange={(e) => handleArrayUpdate('experience', exp.id, { position: e.target.value })}
                    />
                    <div className="date-inputs">
                      <input
                        type="month"
                        placeholder="Start Date"
                        value={exp.startDate}
                        onChange={(e) => handleArrayUpdate('experience', exp.id, { startDate: e.target.value })}
                      />
                      <input
                        type="month"
                        placeholder="End Date"
                        value={exp.endDate}
                        onChange={(e) => handleArrayUpdate('experience', exp.id, { endDate: e.target.value })}
                      />
                    </div>
                    <textarea
                      placeholder="Description"
                      value={exp.description}
                      onChange={(e) => handleArrayUpdate('experience', exp.id, { description: e.target.value })}
                      rows="3"
                    />
                    <button 
                      className="btn-remove"
                      onClick={() => handleArrayRemove('experience', exp.id)}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="experience-display">
                    <h3>{exp.position}</h3>
                    <h4>{exp.company}</h4>
                    <p className="experience-dates">{exp.startDate} - {exp.endDate}</p>
                    <p className="experience-description">{exp.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'education' && (
          <div className="tab-content">
            <div className="section-header">
              <h2>Education</h2>
              {isEditing && (
                <button 
                  className="btn-add"
                  onClick={() => handleArrayAdd('education', {
                    institution: '',
                    degree: '',
                    startDate: '',
                    endDate: ''
                  })}
                >
                  + Add Education
                </button>
              )}
            </div>
            
            {profileData.education.map((edu) => (
              <div key={edu.id} className="education-item">
                {isEditing ? (
                  <div className="education-form">
                    <input
                      type="text"
                      placeholder="Institution"
                      value={edu.institution}
                      onChange={(e) => handleArrayUpdate('education', edu.id, { institution: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) => handleArrayUpdate('education', edu.id, { degree: e.target.value })}
                    />
                    <div className="date-inputs">
                      <input
                        type="text"
                        placeholder="Start Year"
                        value={edu.startDate}
                        onChange={(e) => handleArrayUpdate('education', edu.id, { startDate: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="End Year"
                        value={edu.endDate}
                        onChange={(e) => handleArrayUpdate('education', edu.id, { endDate: e.target.value })}
                      />
                    </div>
                    <button 
                      className="btn-remove"
                      onClick={() => handleArrayRemove('education', edu.id)}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="education-display">
                    <h3>{edu.degree}</h3>
                    <h4>{edu.institution}</h4>
                    <p className="education-dates">{edu.startDate} - {edu.endDate}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="tab-content">
            <h2>Skills & Certifications</h2>
            
            <div className="skills-section">
              <h3>Skills</h3>
              {isEditing && (
                <div className="skill-input">
                  <input
                    type="text"
                    placeholder="Add a skill"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addSkill(e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
              )}
              <div className="skills-list">
                {profileData.skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                    {isEditing && (
                      <button onClick={() => removeSkill(skill)}>×</button>
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div className="certifications-section">
              <div className="section-header">
                <h3>Certifications</h3>
                {isEditing && (
                  <button 
                    className="btn-add"
                    onClick={() => handleArrayAdd('certifications', {
                      name: '',
                      issuer: '',
                      date: ''
                    })}
                  >
                    + Add Certification
                  </button>
                )}
              </div>
              
              {profileData.certifications.map((cert) => (
                <div key={cert.id} className="certification-item">
                  {isEditing ? (
                    <div className="certification-form">
                      <input
                        type="text"
                        placeholder="Certification Name"
                        value={cert.name}
                        onChange={(e) => handleArrayUpdate('certifications', cert.id, { name: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="Issuing Organization"
                        value={cert.issuer}
                        onChange={(e) => handleArrayUpdate('certifications', cert.id, { issuer: e.target.value })}
                      />
                      <input
                        type="month"
                        placeholder="Date Obtained"
                        value={cert.date}
                        onChange={(e) => handleArrayUpdate('certifications', cert.id, { date: e.target.value })}
                      />
                      <button 
                        className="btn-remove"
                        onClick={() => handleArrayRemove('certifications', cert.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="certification-display">
                      <h4>{cert.name}</h4>
                      <p>{cert.issuer} • {cert.date}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;