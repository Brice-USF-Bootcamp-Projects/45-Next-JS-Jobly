// src/app/jobs/page.js

'use client'
import { useState, useEffect } from 'react';
import JoblyApi from '../../lib/api';
import JobList from '../../components/JobList';  // Import JobList to display jobs
import SearchForm from '../../components/SearchForm';  // Import SearchForm to handle searching

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);        // State to hold the list of jobs
  const [loading, setLoading] = useState(true); // State for loading status
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Fetch jobs when the component is mounted or when searchTerm changes
  useEffect(() => {
    async function fetchJobs() {
      setLoading(true); // Set loading state to true before fetching data
      try {
        const jobList = await JoblyApi.getJobs(searchTerm); // Fetch jobs using searchTerm
        setJobs(jobList);  // Set the jobs state with the fetched data
      } catch (err) {
        console.error('Error fetching jobs:', err); // Handle errors
      } finally {
        setLoading(false); // Set loading to false after fetching is complete
      }
    }

    fetchJobs(); // Call the fetchJobs function
  }, [searchTerm]); // Re-run when searchTerm changes

  // Handle changes to the search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Update searchTerm with the input value
  };

  // Render loading or jobs list based on loading state
  if (loading) {
    return <div>Loading jobs...</div>;
  }

  return (
    <main className="container">
      <h1 className="text-primary">Jobs</h1>

      {/* Search Form */}
      <SearchForm placeholder="Search for jobs" handleSearch={handleSearch} />

      {/* Display job list */}
      <JobList jobs={jobs} />
    </main>
  );
}
