const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const logger = require('./index');

const apiKey = process.env.OBSERVIFY_API_KEY;
const appName = process.env.OBSERVIFY_APP_NAME;
const baseURL = process.env.OBSERVIFY_BASE_URL || 'http://localhost:5000';

if (!apiKey || !appName) {
  console.error(
    'Missing config. Copy sdk/.env.example to sdk/.env and set OBSERVIFY_API_KEY and OBSERVIFY_APP_NAME.'
  );
  process.exit(1);
}

logger.init({ apiKey, appName, baseURL });

async function run() {
  await logger.log('Server started successfully', 'INFO');
  await logger.log('Database query took 2s', 'WARN');
  await logger.log('Unhandled exception caught', 'ERROR');
  await logger.log('User logged in', 'INFO');
  await logger.log('Payment failed', 'ERROR');
  await logger.log('Cache miss on key user:123', 'WARN');
  console.log('All logs sent!');
}

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
