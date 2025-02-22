// src/lib/api.js

import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;


/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */


class JoblyApi {
  /**
   * ✅ Generic request function for API calls.
   * - Supports GET, POST, PATCH, DELETE.
   * - Automatically adds auth token to headers.
   * - Handles errors gracefully.
   */
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, method, data);

    // ✅ Construct full URL for API request
    const url = `${BASE_URL}/${endpoint}`;

    // ✅ Set up headers, including Authorization token
    const headers = API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {};

    // ✅ If it's a GET request, send params instead of body
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response?.data?.error?.message || "Unknown error";
      throw Array.isArray(message) ? message : [message]; // ✅ Ensure message is always an array
    }
  }

  /** 🔐 AUTHENTICATION METHODS **/

  /**
   * ✅ Login user & return an auth token.
   * - Sends `{ username, password }` to `/auth/token`
   * - Stores received token in `.env.local`
   */
  static async login(credentials) {
    let res = await this.request("auth/token", credentials, "post");
    return res.token; // ✅ Use this token in API requests
  }

  /**
   * ✅ Register a new user & return an auth token.
   * - Sends `{ username, password, firstName, lastName, email }` to `/auth/register`
   */
  static async register(userData) {
    let res = await this.request("auth/register", userData, "post");
    return res.token;
  }

  /** 🏢 COMPANY METHODS **/

  /**
   * ✅ Get a list of all companies (or filter by searchTerm).
   * - Calls `/companies`
   * - If `searchTerm` is provided, filters by name.
   */
  static async getCompanies(searchTerm = "") {
    return await this.request("companies", { name: searchTerm });
  }

  /**
   * ✅ Get details of a specific company by handle.
   * - Calls `/companies/:handle`
   */
  static async getCompany(handle) {
    return await this.request(`companies/${handle}`);
  }

  /** 💼 JOB METHODS **/

  /**
   * ✅ Get all jobs (or filter by searchTerm).
   * - Calls `/jobs`
   * - If `searchTerm` is provided, filters by title.
   */
  static async getJobs(searchTerm = "") {
    return await this.request("jobs", { title: searchTerm });
  }

  /**
   * ✅ Apply for a job.
   * - Calls `/users/:username/jobs/:jobId`
   * - User must be logged in with a valid token.
   */
  static async applyToJob(username, jobId) {
    return await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
  }

  /** 👤 USER PROFILE METHODS **/

  /**
   * ✅ Get details of a specific user.
   * - Calls `/users/:username`
   */
  static async getUser(username) {
    return await this.request(`users/${username}`);
  }

  /**
   * ✅ Update user profile.
   * - Calls `/users/:username` with PATCH
   */
  static async updateUser(username, userData) {
    return await this.request(`users/${username}`, userData, "patch");
  }
}

export default JoblyApi;


