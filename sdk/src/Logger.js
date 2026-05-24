const axios = require('axios');

const VALID_LEVELS = ['INFO', 'WARN', 'ERROR'];

class Logger {
  constructor() {
    this._apiKey = null;
    this._appName = null;
    this._baseURL = null;
    this._initialized = false;
  }

  init({ apiKey, appName, baseURL = 'http://localhost:5000' } = {}) {
    if (!apiKey || typeof apiKey !== 'string') {
      throw new Error('Observify SDK: apiKey is required and must be a string');
    }

    if (!appName || typeof appName !== 'string' || !/^\S+$/.test(appName)) {
      throw new Error('Observify SDK: appName is required and must not contain spaces');
    }

    if (!baseURL || typeof baseURL !== 'string') {
      throw new Error('Observify SDK: baseURL must be a valid string');
    }

    this._apiKey = apiKey;
    this._appName = appName;
    this._baseURL = baseURL.replace(/\/$/, '');
    this._initialized = true;
  }

  async log(message, level) {
    if (!this._initialized) {
      throw new Error('Observify SDK: call init() before log()');
    }

    if (!message || typeof message !== 'string') {
      throw new Error('Observify SDK: message must be a non-empty string');
    }

    if (!VALID_LEVELS.includes(level)) {
      throw new Error(`Observify SDK: level must be one of ${VALID_LEVELS.join(', ')}`);
    }

    const url = `${this._baseURL}/api/applications/${encodeURIComponent(this._appName)}/logs`;

    try {
      await axios.post(
        url,
        { message, level },
        {
          headers: {
            'x-api-key': this._apiKey,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );
    } catch (err) {
      const detail =
        err.response?.data?.message ?? err.response?.statusText ?? err.message;
      console.warn(`[Observify SDK] Failed to send log (${level}): ${detail}`);
    }
  }
}

module.exports = Logger;
