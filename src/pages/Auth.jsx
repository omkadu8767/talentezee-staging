import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
  const [user, setUser] = useState({ name: '', email: '', social: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  const [credits, setCredits] = useState(0);
  const [raffleTickets, setRaffleTickets] = useState(0);
  const userId = 'user123'; 

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    console.log('Logging in user:', user);
    setLoggedIn(true);

    await axios.post('/api/enroll', { userId, platform: 'TalentEzee' });
    setCredits(100);
    const res = await axios.get(`/api/raffle-status?userId=${userId}`);
    setRaffleTickets(res.data.tickets || 1);
    await axios.post('/api/raffle-award', { userId, reward: 'signup_bonus' });
  };

  const handleTopUp = () => {
    setCredits(prev => prev + 1);
    alert('€1 top-up successful!');
  };

  return (
    <div className="page auth">
      <div className="auth-box">
        <h2>{loggedIn ? 'Welcome Back' : 'Login / Sign Up'}</h2>
        {!loggedIn && (
          <>
            <input name="name" placeholder="Name" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="social" placeholder="Social Handle" onChange={handleChange} />
            <button onClick={handleLogin}>Login</button>
          </>
        )}

        {loggedIn && (
          <>
            <div className="status">
              <p>Credits: €{credits}</p>
              <p>Raffle Tickets: {raffleTickets}</p>
            </div>
            <button className="stripe-btn" onClick={handleTopUp}>Top Up €1</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;

