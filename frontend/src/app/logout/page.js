// src/app/logout/page.js

'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    console.log("🚪 Logging out user...");

    // Remove token from localStorage
    localStorage.removeItem("token");

    // Redirect to landing page after logout
    router.push("/");
  }, [router]);

  return (
    <main className="container mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold">Logging Out...</h1>
      <p className="text-gray-500">Redirecting to the homepage...</p>
    </main>
  );
}
