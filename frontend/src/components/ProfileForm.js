// src/components/ProfileForm.js

"use client";
import { useState, useEffect } from "react";

const ProfileForm = ({ user, onUpdate }) => {
  console.log("👤 User received in ProfileForm:", user); // ✅ Debugging

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 Form submitted!");
  
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No auth token found");
  
      // ✅ Manually construct allowed fields
      const requestBody = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: formData.password,
      };
  
      console.log("🚨 DEBUG: Final Request Body BEFORE sending:", JSON.stringify(requestBody, null, 2));
  
      const res = await fetch(`/api/user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "x-username": user.username // ✅ Send username in headers, not body
        },
        body: JSON.stringify(requestBody),
      });
  
      const responseText = await res.text();
      console.log("🔍 Update response:", responseText);
  
      if (!res.ok) {
        throw new Error(`Update failed: ${responseText}`);
      }
  
      const responseData = JSON.parse(responseText);
      onUpdate(responseData.user);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("❌ Profile update error:", err);
      alert("Profile update failed. Please try again.");
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-900 text-sm font-bold mb-2">First Name</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}
            className="w-full p-2 border border-gray-400 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"/>
        </div>
        <div>
          <label className="block text-gray-900 text-sm font-bold mb-2">Last Name</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}
            className="w-full p-2 border border-gray-400 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"/>
        </div>
      </div>
  
      <div>
        <label className="block text-gray-900 text-sm font-bold mb-2">Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange}
          className="w-full p-2 border border-gray-400 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"/>
      </div>
  
      <div>
        <label className="block text-gray-900 text-sm font-bold mb-2">New Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange}
          className="w-full p-2 border border-gray-400 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"/>
      </div>
  
      <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
        Update Profile
      </button>
    </form>
  );
};

export default ProfileForm;
