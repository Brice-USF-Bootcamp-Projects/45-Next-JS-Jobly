// src/app/companies/page.js

import JoblyApi from "../../lib/api";
import { useEffect, useState } from "react";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const companyList = await JoblyApi.getCompanies();
        setCompanies(companyList);
      } catch (err) {
        console.error("Error fetching companies:", err);
      }
    }
    fetchCompanies();
  }, []);

  return (
    <main className="container">
      <h1 className="text-primary">Companies</h1>
      <ul>
        {companies.map(company => (
          <li key={company.handle}>{company.name}</li>
        ))}
      </ul>
    </main>
  );
}
