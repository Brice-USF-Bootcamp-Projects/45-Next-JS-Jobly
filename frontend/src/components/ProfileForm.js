// src/components/ProfileForm.js

"use client";
import { useState, useEffect } from "react";

const ProfileForm = ({ user, onUpdate }) => {
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
    try {
      const res = await fetch(`/api/user`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Update failed");
      const updatedUser = await res.json();
      onUpdate(updatedUser);
    } catch (err) {
      console.error("Profile update error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-gray-100 rounded-lg text-gray-700">
      <label>First Name:</label>
      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="p-2 border rounded w-full" />
      
      <label>Last Name:</label>
      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="p-2 border rounded w-full" />

      <label>Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} className="p-2 border rounded w-full" />

      <label>Password:</label>
      <input type="password" name="password" value={formData.password} onChange={handleChange} className="p-2 border rounded w-full" />

      <button type="submit" className="p-2 bg-blue-500 text-white rounded">Update Profile</button>
    </form>
  );
};

export default ProfileForm;
