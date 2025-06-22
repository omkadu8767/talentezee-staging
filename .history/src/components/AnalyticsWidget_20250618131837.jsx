import React from 'react';
import '../styles/AnalyticsWidget.css';

export default function AnalyticsWidget() {
  return (
    <div className="card">
      <h2>Analytics Overview</h2>
      <div className="metric">Impressions: 12,345</div>
      <div className="metric">Engagements: 2,345</div>
      <div className="metric">Conversions: 234</div>
      <div className="progress">
        <span>Credit Usage</span>
        <progress value="60" max="100"></progress>
      </div>
    </div>
  );
}
