// src/app/jobs/page.js

'use client';
import { useState, useEffect } from 'react';
import JoblyApi from '../../lib/api';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      setError(null); // Reset error before fetching

      try {
        console.log("📡 API Request: Fetching jobs with search:", search);
        const response = await JoblyApi.getJobs(search);
        console.log("🔍 API Response for Jobs:", response);

        if (!response || !Array.isArray(response)) {
          console.error("❌ Unexpected response format:", response);
          setError("Failed to load jobs. Please try again.");
          setJobs([]); // Ensure it's an empty array
        } else {
          setJobs(response);
        }
      } catch (err) {
        console.error("❌ API Error:", err);
        setError("Failed to fetch jobs.");
        setJobs([]); // Prevent .map() errors
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [search]);

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Jobs</h1>

      <input
        type="text"
        placeholder="Search for jobs"
        className="mt-4 p-2 w-full border rounded-md"
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p className="mt-4 text-gray-500">Loading jobs...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && jobs.length === 0 && <p className="text-gray-500">No jobs found.</p>}

      <ul className="mt-4">
        {jobs.map((job) => (
          <li key={job.id} className="p-4 border rounded-md mb-2">
            <h2 className="font-bold">{job.title}</h2>
            <p>{job.companyHandle}</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">Apply</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
