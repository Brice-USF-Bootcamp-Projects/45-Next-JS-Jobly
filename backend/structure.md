# Jobly backend structure

## Backend Project Structure

``` bash
/backend                      # ✅ Root backend directory
│── /helpers                  # ✅ Utility functions for backend operations
│   │── sql.js                # ✅ SQL query helpers
│   │── sql.test.js           # ✅ Tests for SQL helpers
│   │── tokens.js             # ✅ JWT token handling
│   │── tokens.test.js        # ✅ Tests for token functions
│
│── /middleware               # ✅ Express middleware
│   │── auth.js               # ✅ Authentication middleware (JWT validation, permissions)
│   │── auth.test.js          # ✅ Tests for authentication middleware
│
│── /models                   # ✅ Database models
│   │── company.js            # ✅ Company model
│   │── company.test.js       # ✅ Tests for company model
│   │── job.js                # ✅ Job model
│   │── job.test.js           # ✅ Tests for job model
│   │── user.js               # ✅ User model
│   │── user.test.js          # ✅ Tests for user model
│
│── /routes                   # ✅ API route handlers
│   │── auth.js               # ✅ Authentication routes (login, register)
│   │── auth.test.js          # ✅ Tests for authentication routes
│   │── companies.js          # ✅ Company routes (CRUD operations)
│   │── companies.test.js     # ✅ Tests for company routes
│   │── jobs.js               # ✅ Job routes (CRUD operations)
│   │── jobs.test.js          # ✅ Tests for job routes
│   │── users.js              # ✅ User routes (profile, updating user data)
│   │── users.test.js         # ✅ Tests for user routes
│
│── /schemas                  # ✅ JSON schema validation for API requests
│   │── companyNew.json       # ✅ Schema for new company
│   │── companySearch.json    # ✅ Schema for company search
│   │── companyUpdate.json    # ✅ Schema for updating company
│   │── jobNew.json           # ✅ Schema for new job
│   │── jobSearch.json        # ✅ Schema for job search
│   │── jobUpdate.json        # ✅ Schema for updating job
│   │── userAuth.json         # ✅ Schema for user authentication (login)
│   │── userNew.json          # ✅ Schema for new user registration
│   │── userRegister.json     # ✅ Schema for user registration
│   │── userUpdate.json       # ✅ Schema for updating user profile
│
│── .env                      # ✅ Environment variables (database credentials, secrets)
│── app.js                    # ✅ Main Express application setup
│── app.test.js               # ✅ Tests for main application setup
│── config.js                 # ✅ Configuration settings for backend
│── config.test.js            # ✅ Tests for configuration
│── db.js                     # ✅ Database connection setup
│── expressError.js           # ✅ Custom error handling for Express
│── jobly-schema.sql          # ✅ SQL schema for setting up database
│── jobly-seed.sql            # ✅ Seed data for database
│── jobly.sql                 # ✅ Database setup SQL file
│── package.json              # ✅ Project dependencies and scripts
│── package-lock.json         # ✅ Lockfile for dependencies
│── Procfile                  # ✅ Deployment process file (e.g., for Heroku)
│── server.js                 # ✅ Server entry point
```
