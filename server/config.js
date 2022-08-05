const PARSE_APP_ID = process.env.PARSE_APP_ID || 'KeC16DdIha4vqcSSAENjW7qBNEsTSmkTUFOwL6t5';
const PARSE_JAVASCRIPT_KEY = process.env.PARSE_JAVASCRIPT_KEY || 'vG2pAZLFcJsADE0Vhhyd80vP6As6QGaVtUeIASXw';
const PORT = 3000;
const localhostURL = `http://localhost:${PORT}/`;

module.exports = {
  PARSE_APP_ID,
  PARSE_JAVASCRIPT_KEY,
  PORT,
  localhostURL,
};
