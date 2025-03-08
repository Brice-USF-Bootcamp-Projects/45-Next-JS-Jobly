// src/lib/api.js

import axios from "axios";

// Use the appropriate environment variable for base URL
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";

/**
 * JoblyApi class handles all API calls to the backend.
 * It provides methods for authentication, companies, jobs, and user profile management.
 */
class JoblyApi {
  /**
   * Generic request function for making API calls (GET, POST, PATCH, DELETE).
   * Automatically includes the auth token (if available).
   * Handles errors and returns the response data.
   */
  static async request(endpoint, data = {}, method = "get") {
    // Get the token dynamically on each request
    const API_TOKEN = localStorage.getItem("token"); // Retrieve token from localStorage
    const headers = API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}; // Set headers with token if available

    console.debug("API Request - Endpoint:", endpoint);
    console.debug("API Method:", method);
    console.debug("API Data:", data);
    console.debug("API Headers:", headers);

    // Construct the full URL for the API request
    const url = `${BASE_URL}/${endpoint}`;

    // If it's a GET request, use params, otherwise, send data in the body
    const params = method === "get" ? data : {};

    try {
      // Send the request and log the full request for debugging
      const response = await axios({ url, method, data, params, headers });

      // Log the response
      console.debug("API Response:", response);
      return response.data;
    } catch (err) {
      console.error("API Error:", err.response || err.message);

      // Log the error response for debugging
      let message = err.response?.data?.error?.message || err.message || "An unknown error occurred. Please try again.";
      console.error("API Error Details:", message);

      throw Array.isArray(message) ? message : [message];
    }
  }

  // Authentication methods

  /**
   * Login the user and return an auth token.
   * Sends username and password to /auth/token and stores the token.
   */
  static async login(credentials) {
    let res = await this.request("auth/token", credentials, "post");
    return res.token; // Return the auth token
  }

  /**
   * Register a new user and return an auth token.
   * Sends user details to /auth/register and returns the token.
   */
  static async register(userData) {
    let res = await this.request("auth/register", userData, "post");
    return res.token;
  }

  // Company methods

  /**
   * Get a list of all companies (or filter by searchTerm).
   * Calls /companies and can filter by name if searchTerm is provided.
   */
  static async getCompanies(searchTerm = "") {
    const url = searchTerm ? `companies?name=${searchTerm}` : "companies"; // Dynamically add search query
    return await this.request(url);
  }

  /**
   * Get details of a specific company by handle.
   * Calls /companies/:handle to fetch the company data.
   */
  static async getCompany(handle) {
    console.log("📡 API Request: Fetching company:", handle);
    const response = await this.request(`companies/${handle}`);
    console.log("🔍 API Response for Company:", response);
    return response;
  }
  

  // Job methods

  /**
   * Get all jobs (or filter by searchTerm).
   * Calls /jobs and can filter by title if searchTerm is provided.
   */
  static async getJobs(searchTerm = "") {
    console.log("📡 API Request: Fetching jobs with search:", searchTerm);
  
    // Ensure we send only valid query parameters
    const url = searchTerm ? `jobs?title=${searchTerm}` : "jobs";
  
    try {
      const response = await this.request(url);
      console.log("🔍 API Response for Jobs:", response);
  
      return response.jobs || []; // Ensure it always returns an array
    } catch (err) {
      console.error("❌ API Error:", err.response?.data || err.message);
      throw new Error("Failed to fetch jobs.");
    }
  }
  

  /**
   * Apply for a job.
   * Calls /users/:username/jobs/:jobId to apply for the job.
   */
  static async applyToJob(username, jobId) {
    return await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
  }

  // User profile methods

  /**
   * Get details of a specific user by username.
   * Calls /users/:username to fetch the user profile.
   */
  static async getUser(username) {
    console.log("📡 API Request: Fetching user:", username);
    const response = await this.request(`users/${username}`);
    console.log("🔍 API Response for getUser:", response);
  
    if (!response || Object.keys(response).length === 0) {
      console.error("❌ API returned empty user data!");
    }
  
    return response;
  }
  
  static async updateUser(username, userData) {
    return await this.request(`users/${username}`, userData, "patch");
  }

  // Utility method to check if the user is authenticated
  static isAuthenticated() {
    return !!localStorage.getItem("token"); // Check if the token exists in localStorage
  }
}

export default JoblyApi;
