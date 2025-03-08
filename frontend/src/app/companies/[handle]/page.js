// src/app/companies/[handle]/page.js

'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import JoblyApi from '../../../lib/api';

export default function CompanyPage() {
  const { handle } = useParams();  // Get company handle from URL
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState(new Set()); // Track applied jobs

  useEffect(() => {
    async function fetchCompany() {
      setLoading(true);
      try {
        const companyData = await JoblyApi.getCompany(handle);
        console.log("🔍 Company Data:", companyData);
        setCompany(companyData);
      } catch (err) {
        console.error("❌ Error fetching company data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCompany();
  }, [handle]);

  const handleApply = (jobId) => {
    setAppliedJobs(new Set([...appliedJobs, jobId])); // Add job to applied set
  };

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading company data...</div>;
  }

  if (!company) {
    return <div className="text-center mt-10 text-red-500">Company not found.</div>;
  }

  return (
    <main className="container mx-auto mt-10 p-6 max-w-3xl bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-blue-600">{company.name}</h1>
      <p className="text-gray-600 mt-2">{company.description}</p>

      {/* Jobs Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Available Jobs</h2>
        {company.jobs.length > 0 ? (
          <ul className="mt-4">
            {company.jobs.map((job) => (
              <li key={job.id} className="p-4 border rounded-md mb-2 flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{job.title}</h3>
                  <p className="text-gray-600">${job.salary || "N/A"} • Equity: {job.equity || "N/A"}</p>
                </div>
                <button
                  className={`px-4 py-2 rounded-md transition-all ${
                    appliedJobs.has(job.id)
                      ? "bg-gray-400 cursor-not-allowed text-white opacity-50"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                  onClick={() => handleApply(job.id)}
                  disabled={appliedJobs.has(job.id)}
                >
                  {appliedJobs.has(job.id) ? "Applied" : "Apply"}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">No jobs available at this company.</p>
        )}
      </div>
    </main>
  );
}
