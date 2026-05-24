/**
 * Vercel serverless entry — wraps the Express app from /backend.
 * All /api/* requests are routed here via vercel.json rewrites.
 */
require('../backend/config/env');

const connectDB = require('../backend/config/db');
const app = require('../backend/app');

let dbReady = false;

module.exports = async (req, res) => {
  if (!dbReady) {
    await connectDB();
    dbReady = true;
  }
  return app(req, res);
};
