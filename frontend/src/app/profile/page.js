// src/app/profile/page.js

"use client";
import { useState, useEffect } from "react";
import JoblyApi from "../../lib/api";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import
import ProfileForm from "../../components/ProfileForm"; // ✅ Use ProfileForm component

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        console.log("🔥 Fetching user profile...");

        const token = localStorage.getItem("token");
        if (!token) throw new Error("No auth token found");

        // ✅ Decode JWT to get the username
        const decoded = jwtDecode(token);
        console.log("🔍 Decoded token:", decoded);
        if (!decoded.username) throw new Error("No username found in token");

        const username = decoded.username; // ✅ Extract username dynamically
        console.log("✅ Extracted Username:", username);

        // ✅ Fetch user profile using the username
        const userData = await JoblyApi.getUser(username);
        console.log("✅ User data received:", userData);
        setUser(userData);
      } catch (err) {
        console.error("❌ Error fetching user:", err);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading profile...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Edit Profile</h1>
      {error && <p className="text-red-500">{error}</p>}
      {user ? <ProfileForm user={user} onUpdate={setUser} /> : <p>No user data found.</p>}
    </div>
  );
};

export default ProfilePage;
