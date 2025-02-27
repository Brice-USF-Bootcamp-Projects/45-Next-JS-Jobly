// src/components/CompanyList.js
export default function CompanyList({ companies }) {
    if (!companies || companies.length === 0) {
      return <div>No companies available</div>;
    }
  
    return (
      <div>
        <h2>Company List</h2>
        <ul>
          {companies.map((company) => (
            <li key={company.handle}>
              <h3>{company.name}</h3>
              <p>{company.description}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  