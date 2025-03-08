// src/app/page.js

'use client'
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import { useState } from 'react';

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to <span className="text-blue-600">Jobly</span></h1>
        <p className="text-gray-600 mb-6">Find your dream job with ease.</p>

        <div className="flex flex-col space-y-4">
          <button 
            onClick={() => setShowLogin(true)}
            className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
          >
            Login
          </button>
          
          <button 
            onClick={() => setShowRegister(true)}
            className="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg transition-all"
          >
            Register
          </button>
        </div>
      </div>

      {showLogin && <LoginModal setShowLogin={setShowLogin} />}
      {showRegister && <RegisterModal setShowRegister={setShowRegister} />}
    </div>
  );
}

