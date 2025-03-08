// src/app/api/user.js

export async function PUT(req) {
    const body = await req.json();
    
    const res = await fetch(`${process.env.BACKEND_URL}/users/${body.username}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  
    if (!res.ok) {
      return new Response(JSON.stringify({ error: "Failed to update user" }), { status: 400 });
    }
  
    const updatedUser = await res.json();
    return new Response(JSON.stringify(updatedUser), { status: 200 });
  }
  