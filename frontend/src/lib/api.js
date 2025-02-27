// src/lib/api.js

import axios from "axios";

// Use the appropriate environment variable for base URL
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;  // Access the public API token

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
    console.debug("API Call:", endpoint, method, data);

    // Construct the full URL for the API request
    const url = `${BASE_URL}/${endpoint}`;

    // Add Authorization header if API_TOKEN exists
    const headers = API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {};

    // If it's a GET request, use params, otherwise, send data in the body
    const params = method === "get" ? data : {};

    try {
      // Send the request and return the data
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response || err.message);
      let message = err.response?.data?.error?.message || err.message || "An unknown error occurred. Please try again.";
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
    return res.token;  // Return the auth token
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
    return await this.request(`companies/${handle}`);
  }

  // Job methods

  /**
   * Get all jobs (or filter by searchTerm).
   * Calls /jobs and can filter by title if searchTerm is provided.
   */
  static async getJobs(searchTerm = "", limit = 10, page = 1) {
    const url = searchTerm ? `jobs?title=${searchTerm}&limit=${limit}&page=${page}` : `jobs?limit=${limit}&page=${page}`;
    return await this.request(url);
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
    return await this.request(`users/${username}`);
  }

  /**
   * Update user profile.
   * Sends updated user details to /users/:username with PATCH.
   */
  static async updateUser(username, userData) {
    return await this.request(`users/${username}`, userData, "patch");
  }

  // Utility method to check if the user is authenticated
  static isAuthenticated() {
    return !!localStorage.getItem("token"); // Check if the token exists in localStorage
  }
}

export default JoblyApi;

