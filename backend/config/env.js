const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// PORT is only required for local server.js (not Vercel serverless)
const REQUIRED_VARS = ['MONGO_URI', 'JWT_SECRET', 'JWT_EXPIRES_IN', 'NODE_ENV'];
if (!process.env.VERCEL) {
  REQUIRED_VARS.push('PORT');
}

// Validate all required vars are present
REQUIRED_VARS.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

// Frozen config — no mutations allowed at runtime
const config = Object.freeze({
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  NODE_ENV: process.env.NODE_ENV,
});

module.exports = config;
