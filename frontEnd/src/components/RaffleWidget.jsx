import React, { useEffect, useState } from 'react';

const RaffleWidget = ({ userId, url }) => {
  const [tickets, setTickets] = useState(0);

  const fetchTickets = async () => {
    try {
      const res = await fetch(`${url}/api/raffle/status?userId=${userId}`);
      const data = await res.json();
      setTickets(data.tickets || 0);
    } catch (err) {
      console.error('Error fetching raffle tickets:', err);
    }
  };

  useEffect(() => {
    if (userId) fetchTickets();
  }, [userId]);

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: '#fff3cd',
      color: '#856404',
      padding: '12px 20px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      zIndex: 1000,
      fontWeight: 'bold',
    }}>
      🎟️ Raffle Tickets: {tickets}
    </div>
  );
};

export default RaffleWidget;