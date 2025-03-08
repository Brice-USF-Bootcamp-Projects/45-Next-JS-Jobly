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
      setLoading(true);
      try {
        const companyList = await JoblyApi.getCompanies(searchTerm);
        console.log("🔍 API Response for Companies:", companyList); // ✅ Debugging log
  
        // ✅ Ensure `companies` is correctly set as an array
        if (!companyList) {
          console.error("❌ API returned null or undefined.");
          setCompanies([]);  // Set to empty array to prevent errors
        } else if (Array.isArray(companyList)) {
          setCompanies(companyList); // ✅ Directly set if it's already an array
        } else if (companyList.companies && Array.isArray(companyList.companies)) {
          setCompanies(companyList.companies); // ✅ Handle wrapped response
        } else {
          console.error("❌ Unexpected response format:", companyList);
          setCompanies([]); // ✅ Ensure safe state
        }
  
      } catch (err) {
        console.error("❌ Error fetching companies:", err);
        setCompanies([]); // ✅ Prevent breaking `map()` if request fails
      } finally {
        setLoading(false);
      }
    }
  
    fetchCompanies();
  }, [searchTerm]);
  
  

  // Handle changes in the search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);  // Update the searchTerm state
  };

  return (
    <main className="container">
      <h1 className="text-primary font-bold text-2xl">Companies</h1>

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
  {companies.map((company) => (
    <li key={company.handle} className="p-4 border rounded-md mb-2">
      <a href={`/companies/${company.handle}`} className="text-blue-500 font-bold hover:underline">
        {company.name}
      </a>
    </li>
  ))}
</ul>

      )}
    </main>
  );
}
