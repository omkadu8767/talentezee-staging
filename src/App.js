import React from 'react';
import CampaignForm from './components/CampaignForm';
import AnalyticsWidget from './components/AnalyticsWidget';
import RaffleWidget from './components/RaffleWidget';
import './styles/variables.css';
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      <h1>TalentEzee Campaign Dashboard</h1>
      <CampaignForm />
      <AnalyticsWidget />
      <RaffleWidget />
    </div>
  );
}

