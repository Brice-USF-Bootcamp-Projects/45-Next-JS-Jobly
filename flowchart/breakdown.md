# Jobly Full Stack Job Board - Feature Breakdown

## 1. Landing Page

- **Purpose**: This is the entry point of your app.
- **Actions**:
  - Users can either **Login** or **Register**.
  - **Login** and **Register** are modals that redirect to the respective pages.
- **Next Steps**:
  - Implement a **Landing Page** component with a clear call to action (Login or Register).
  - Add modals for **Login** and **Register**.
  - Redirect users to the **Dashboard** after successful login.

---

## 2. Login/Register Page

- **Purpose**: Allows users to login or create a new account.
- **Actions**:
  - After **successful login**, redirect users to the **Dashboard**.
  - After **successful registration**, redirect users to **Login** page for immediate login.
- **Next Steps**:
  - Set up routes for **Login** and **Register** pages.
  - Handle **form submission** to authenticate users with the **Express backend**.
  - On success, use **JWT tokens** (or another form of authentication) to manage user sessions.

---

## 3. Dashboard

- **Purpose**: Main page after login.
- **Actions**:
  - **Navbar**:
    - **Left**: "Jobly" link that redirects to the **Dashboard**.
    - **Right**: Links to **Companies**, **Jobs**, **Profile**, and **Logout**.
  - Provide an overview of the user’s activity (e.g., recent job applications, account details).
- **Next Steps**:
  - Create a **Dashboard** component that fetches and displays user-specific data (like jobs applied, profile info).
  - Implement a **Logout** functionality that clears user sessions and redirects to **Landing Page**.

---

## 4. Companies Page

- **Purpose**: Display a list of all available companies.
- **Actions**:
  - **Search** functionality to filter companies.
  - **Link** to view jobs available for each company.
- **Next Steps**:
  - Create an API route in **Express** that fetches a list of all companies from your database.
  - Set up **search functionality** in your frontend to filter the list.
  - Create a link for each company that redirects to a **Jobs Page** showing available jobs at that company.

---

## 5. Jobs Page

- **Purpose**: Display all jobs in the database.
- **Actions**:
  - **Search** functionality to filter jobs by keywords.
  - Each job has an **Apply** button.
  - Clicking **Apply** changes the button to **Applied**, fades out, and disables further clicks.
- **Next Steps**:
  - Create an API route in **Express** to fetch job listings from your database.
  - Add a search input to filter jobs by keywords.
  - Implement the **Apply** button behavior by updating the job's status and reflecting it in the UI (e.g., disable and fade out).

---

## 6. Profile Page

- **Purpose**: Allows users to update their personal profile.
- **Actions**:
  - Users can edit profile details.
  - After editing, the updated profile is saved and the user is redirected back to the **Dashboard**.
- **Next Steps**:
  - Create a **Profile** page where users can edit their personal information (e.g., name, email).
  - Implement form validation and **Express API** routes to update the user profile in the database.

---

## 7. Apply Button (Behavior)

- **Purpose**: Users can apply for jobs, and the UI should reflect that.
- **Actions**:
  - The **Apply** button is initially clickable.
  - After clicking, it changes to **Applied**, fades out, and disables further clicks.
- **Next Steps**:
  - On the frontend, track the application state of each job.
  - When the **Apply** button is clicked, trigger an update in the database through your **Express backend** to mark the job as applied.
  - Modify the UI to reflect the **Applied** state (fade, disable button).

---

## 8. Logout

- **Purpose**: Allow users to log out and be redirected to the **Landing Page**.
- **Actions**:
  - Clicking **Logout** clears the session.
- **Next Steps**:
  - Implement a **logout** button in the navbar that clears the user’s session or token.
  - Redirect the user to the **Landing Page** after logout.

---

## Full-Stack Integration Considerations

### Frontend (Next.js)

- Use the **App Router** to manage routing for different pages like **Dashboard**, **Profile**, and **Companies**.
- Use **React State** to handle dynamic UI updates (e.g., job application state).
- Ensure proper form handling for **Login** and **Register**, including validation and error handling.

### Backend (Express.js)

- Set up **API routes** for user authentication, fetching companies/jobs, and updating profile/application status.
- Use **JWT** or **Sessions** to manage user login states securely.
- Implement database operations with **PostgreSQL** (or another database) to persist user data and job applications.
