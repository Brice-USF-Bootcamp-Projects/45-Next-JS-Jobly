// src/components/JobList.js

import Link from 'next/link';
import '../styles/NavBar.css';

export default function NavBar() {
  return (
    <nav>
      <div className="logo">
        <Link href="/">Jobly</Link>
      </div>
      <div className="nav-links">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/companies">Companies</Link>
        <Link href="/jobs">Jobs</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/logout">Logout</Link>
      </div>
    </nav>
  );
}
