// src/app/dashboard/page.js

'use client'
import { useState, useEffect } from 'react';
import JoblyApi from '../../lib/api';

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState(null); // State to hold user info
  const [loading, setLoading] = useState(true);   // Loading state

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        // Fetch the logged-in user's info (use a username or token)
        const user = await JoblyApi.getUser('testuser'); // Replace 'testuser' with the actual logged-in user
        setUserInfo(user);
      } catch (err) {
        console.error('Error fetching user info:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserInfo();  // Fetch the user info when the page is loaded
  }, []);  // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (!userInfo) {
    return <div>Error loading user data. Please try again later.</div>;
  }

  return (
    <main className="container">
      <h1 className="text-primary">Welcome to your Dashboard, {userInfo.firstName}!</h1>

      {/* Display user profile information */}
      <div>
        <h3>Profile Information:</h3>
        <p><strong>Username:</strong> {userInfo.username}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Full Name:</strong> {userInfo.firstName} {userInfo.lastName}</p>
      </div>

      {/* Placeholder for future job-related information */}
      <div>
        <h3>Your Applied Jobs</h3>
        <p>No jobs applied yet.</p>
      </div>
    </main>
  );
}
