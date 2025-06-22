import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => (
  <header className="header">
    <div className="logo">TalentEzee</div>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/auth">Login</Link>
    </nav>
  </header>
);

export default Header;
