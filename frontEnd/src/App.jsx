import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import AuthPage from './components/AuthPage';
import './App.css';

function App() {
  const url = "https://talentezee-server.onrender.com";
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('talentezee_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
    }
    setIsLoading(false);
  }, []);


  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('talentezee_user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token);
  };

  const handleLogout = () => {
    setUser(null);
    setCredits(0);
    localStorage.removeItem('talentezee_user');
    localStorage.removeItem('token');
  };

  const updateCredits = (newCredits) => {
    setCredits(newCredits);
  };

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading TalentEzee Impact...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Header 
          user={user} 
          credits={credits} 
          onLogout={handleLogout}
        />
        
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={<Home user={user} />} 
            />
            <Route 
              path="/auth" 
              element={
                user ? 
                <Dashboard 
                  user={user} 
                  setCredits={setCredits}
                  credits={credits}
                  updateCredits={updateCredits}
                  url={url}
                /> : 
                <AuthPage onLogin={handleLogin} url={url}/>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                user ? 
                <Dashboard 
                  user={user} 
                  setCredits={setCredits}
                  credits={credits}
                  updateCredits={updateCredits}
                  url={url}
                /> : 
                <AuthPage onLogin={handleLogin} url={url} />
              } 
            />
            <Route 
              path="/profile" 
              element={
                user ? 
                <Profile 
                  user={user} 
                  credits={credits}
                  updateCredits={updateCredits}
                  url={url}
                /> : 
                <AuthPage onLogin={handleLogin} url={url}/>
              } 
            />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;