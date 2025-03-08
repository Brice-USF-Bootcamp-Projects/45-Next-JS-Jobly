// src/app/dashboard/page.js

'use client';
import { useState, useEffect } from 'react';
import JoblyApi from '../../lib/api';

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        console.log("📡 Fetching user data...");
        const response = await JoblyApi.getUser('testuser'); // Replace with actual user logic
        console.log("🔍 Full User Data:", JSON.stringify(response, null, 2));

        if (!response || !response.user) {
          console.error("❌ No user data returned!");
          setUserInfo(null);
        } else {
          setUserInfo(response.user); // ✅ Extract the "user" object
        }
      } catch (err) {
        console.error('❌ Error fetching user info:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserInfo();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading user data...</div>;
  }

  if (!userInfo) {
    return <div className="text-center mt-10 text-red-500">Error loading user data. Please try again.</div>;
  }

  return (
    <main className="container mx-auto mt-10 p-6 max-w-3xl bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-blue-600 text-center">
        Welcome, {userInfo.firstName || "User"}!
      </h1>

      {/* Profile Section */}
      <div className="mt-6 border p-4 rounded-lg">
        <h3 className="text-xl font-semibold">Profile Information</h3>
        <p className="mt-2"><strong>Username:</strong> {userInfo.username || "N/A"}</p>
        <p><strong>Email:</strong> {userInfo.email || "N/A"}</p>
        <p><strong>Full Name:</strong> {userInfo.firstName || "N/A"} {userInfo.lastName || "N/A"}</p>
      </div>

      {/* Applied Jobs Section */}
      <div className="mt-6 border p-4 rounded-lg">
        <h3 className="text-xl font-semibold">Your Applied Jobs</h3>
        {userInfo.applications && userInfo.applications.length > 0 ? (
          <ul className="mt-2">
            {userInfo.applications.map((job, index) => (
              <li key={index} className="p-2 border-b last:border-none">
                <strong>{job.title}</strong> at <span className="text-blue-500">{job.companyHandle}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No jobs applied yet.</p>
        )}
      </div>
    </main>
  );
}
