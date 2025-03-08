// src/components/NavBar.js

import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/" className="hover:text-gray-200 transition duration-300">Jobly</Link>
        </div>
        <div className="flex space-x-6">
          <Link href="/dashboard" className="hover:text-gray-200 transition duration-300">Dashboard</Link>
          <Link href="/companies" className="hover:text-gray-200 transition duration-300">Companies</Link>
          <Link href="/jobs" className="hover:text-gray-200 transition duration-300">Jobs</Link>
          <Link href="/profile" className="hover:text-gray-200 transition duration-300">Profile</Link>
          <Link href="/logout" className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">Logout</Link>
        </div>
      </div>
    </nav>
  );
}
