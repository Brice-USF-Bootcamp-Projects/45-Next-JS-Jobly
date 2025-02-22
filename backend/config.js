// backend/config.js

"use strict";
require("dotenv").config(); // ✅ Loads .env variables

const SECRET_KEY = process.env.SECRET_KEY || "default-dev-secret";
const PORT = +process.env.PORT || 3001;

/** ✅ Returns the correct database URI based on the environment */
function getDatabaseUri() {
  if (process.env.NODE_ENV === "test") {
    return process.env.TEST_DATABASE_URL || "postgresql://localhost/jobly_test";
  }
  return process.env.DATABASE_URL || `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
}

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : +process.env.BCRYPT_WORK_FACTOR || 12;

console.log("🔥 Jobly Config Loaded:");
console.log("🔑 SECRET_KEY:", SECRET_KEY ? "Configured ✅" : "Missing ❌");
console.log("🌎 ENVIRONMENT:", process.env.NODE_ENV || "development");
console.log("🚀 Running on PORT:", PORT);
console.log("🗄️ Database URI:", getDatabaseUri());
console.log("--------------------------------------------------");

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};
