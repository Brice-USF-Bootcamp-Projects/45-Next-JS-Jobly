// src/app/page.js

'use client'
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import { useState } from 'react';

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div>
      <h1>Welcome to Jobly</h1>
      <button onClick={() => setShowLogin(true)}>Login</button>
      <button onClick={() => setShowRegister(true)}>Register</button>

      {showLogin && <LoginModal setShowLogin={setShowLogin} />}
      {showRegister && <RegisterModal setShowRegister={setShowRegister} />}
    </div>
  );
}
