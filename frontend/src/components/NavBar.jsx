// src/components/NavBar.js

import Link from 'next/link';
import '../styles/NavBar.css';

export default function NavBar() {
  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <div className="text-white font-bold text-lg">
        <Link href="/">Jobly</Link>
      </div>
      <div className="flex space-x-4">
        <Link className="text-white hover:underline" href="/dashboard">Dashboard</Link>
        <Link className="text-white hover:underline" href="/companies">Companies</Link>
        <Link className="text-white hover:underline" href="/jobs">Jobs</Link>
        <Link className="text-white hover:underline" href="/profile">Profile</Link>
        <Link className="bg-red-500 px-4 py-2 text-white rounded-md hover:bg-red-600" href="/logout">
          Logout
        </Link>
      </div>
    </nav>
  );
}
