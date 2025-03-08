// src/app/api/user/route.js

export async function PATCH(req) {
    try {
      console.log("🔹 Incoming PATCH Request to API Route");
  
      const authToken = req.headers.get("Authorization");
      if (!authToken) {
        console.error("❌ Missing Authorization Token");
        return new Response(JSON.stringify({ error: "No auth token provided" }), { status: 401 });
      }
  
      const body = await req.json();
      console.log("🚨 DEBUG: Request received by API Route:", JSON.stringify(body, null, 2));
  
      if (!body.firstName || !body.lastName || !body.email) {
        console.error("❌ Missing required fields:", body);
        return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
      }
  
      const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${req.headers.get("x-username") || "MISSING"}`;
      console.log("🌍 Backend URL:", backendUrl);
  
      // ✅ Remove extra fields before forwarding
      const { isAdmin, applications, username, ...cleanBody } = body;
      console.log("🚨 DEBUG: Final Request Body sent to Backend:", JSON.stringify(cleanBody, null, 2));
  
      const res = await fetch(backendUrl, {
        method: "PATCH",
        headers: {
          "Authorization": authToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanBody),
      });
  
      const responseText = await res.text();
      console.log("🔍 Backend Response:", responseText);
  
      if (!res.ok) {
        return new Response(JSON.stringify({ error: responseText || "Update failed" }), { status: res.status });
      }
  
      return new Response(responseText, { status: 200 });
    } catch (error) {
      console.error("❌ API Error:", error);
      return new Response(JSON.stringify({ error: "Failed to update user" }), { status: 500 });
    }
  }
  