// src/app/companies/page.js

'use client'
import JoblyApi from "../../lib/api";
import { useEffect, useState } from "react";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);  // Holds the list of companies
  const [loading, setLoading] = useState(true);     // Loading state for data fetching
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering companies

  // Fetch companies when the component mounts or searchTerm changes
  useEffect(() => {
    async function fetchCompanies() {
      setLoading(true);  // Set loading state to true before starting the request
      try {
        const companyList = await JoblyApi.getCompanies(searchTerm);
        setCompanies(companyList);  // Set the companies state to the fetched list
      } catch (err) {
        console.error("Error fetching companies:", err);  // Log errors to the console
      } finally {
        setLoading(false);  // Set loading state to false after the request is finished
      }
    }

    fetchCompanies();  // Call the fetch function
  }, [searchTerm]);  // Effect runs when searchTerm changes

  // Handle changes in the search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);  // Update the searchTerm state
  };

  return (
    <main className="container">
      <h1 className="text-primary">Companies</h1>

      {/* Search bar to filter companies */}
      <input
        type="text"
        placeholder="Search for companies"
        value={searchTerm}
        onChange={handleSearch} // Update search term on input change
        className="search-input"
      />

      {/* Loading state */}
      {loading ? (
        <div>Loading companies...</div>  // Show loading message while fetching
      ) : (
        <ul>
          {/* Render list of companies */}
          {companies.map((company) => (
            <li key={company.handle}>
              {company.name}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
