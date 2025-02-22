# Project Structure

/jobly
│── /src
│   │── /app                   # ✅ Next.js App Router
│   │   │── layout.js          # ✅ Global Layout (Navbar)
│   │   │── page.js            # ✅ Landing Page (Login/Register Pop-up)
│   │   │── globals.css        # ✅ Global Styles
│   │   │── /dashboard         # ✅ User Dashboard (after login)
│   │   │   │── page.js
│   │   │── /profile           # ✅ User Profile (edit & update)
│   │   │   │── page.js
│   │   │── /companies         # ✅ List/Search Companies
│   │   │   │── page.js
│   │   │   │── /[handle]      # ✅ Company Detail (with available jobs)
│   │   │       │── page.js
│   │   │── /jobs              # ✅ List/Search Jobs
│   │   │   │── page.js
│   │   │   │── /[id]          # ✅ Job Detail Page (Apply Button)
│   │   │       │── page.js
│   │   │── /logout            # ✅ Logout Functionality
│   │   │   │── page.js
│   │   │── /api               # ✅ API Routes (optional, if needed)
│   │   │   │── auth.js        # ✅ API: Login/Register (if done in Next.js)
│   │   │   │── user.js        # ✅ API: Profile Updates (if needed)
│   │── /components            # ✅ Reusable UI Components
│   │   │── NavBar.js          # ✅ Navbar (Dashboard, Profile, Logout)
│   │   │── LoginModal.js      # ✅ Login Popup Modal
│   │   │── RegisterModal.js   # ✅ Register Popup Modal
│   │   │── CompanyList.js     # ✅ List of Companies (used in /companies)
│   │   │── JobList.js         # ✅ List of Jobs (used in /jobs)
│   │   │── SearchForm.js      # ✅ Reusable Search Form (for Companies & Jobs)
│   │── /lib                   # ✅ API Helper Functions
│   │   │── api.js             # ✅ Calls Express Backend
│   │── /styles                # ✅ Global & Component Styles
│   │   │── NavBar.css         # ✅ Navbar Styles
│   │── /public                # ✅ Static Files (images, logos, etc.)
│   │   │── wallpaper.jpg      # ✅ Background Image Example
│── /backend                   # ✅ Express.js Backend
│── package.json               # ✅ Dependencies & Scripts
│── README.md                  # ✅ Project Documentation
