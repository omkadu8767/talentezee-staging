import React, { useState } from 'react';

export default function CampaignForm() {
  const [formData, setFormData] = useState({ name: '', description: '', kpis: '', deadline: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/enrollCampaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignId: 'xyz123', platform: 'TalentEzee' })
      });
      if (!response.ok) throw new Error('Failed to enroll campaign');
      alert('Campaign created and auto-enrolled!');
    } catch (error) {
      alert('Error enrolling campaign');
      console.error(error);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Create Campaign</h2>
      <input name="name" placeholder="Campaign Name" value={formData.name} onChange={handleChange} required />
      <textarea name="description" placeholder="Short Description" value={formData.description} onChange={handleChange} required />
      <input name="kpis" placeholder="KPIs" value={formData.kpis} onChange={handleChange} required />
      <input name="deadline" type="date" value={formData.deadline} onChange={handleChange} required />
      <button type="submit" >Create</button>
    </form>
  );
}