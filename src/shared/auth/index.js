const { google } = require("googleapis");
const { encodeState, parseState } = require("./state");
const getSiteUrl = require("arc-macro-site-url/discovery");

// FIXME: figure out a declarative way to access arc http routes
const OAUTH2_CALLBACK = '/oauth2callback'

const getClient = async function () {
  const site_url = await getSiteUrl();
  const apis = google.getSupportedAPIs();
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    new URL(OAUTH2_CALLBACK, site_url).toString()
  );
  google.options({ auth: oauth2Client });
  return oauth2Client;
};

const getAuthURL = async function (state) {
  const oauth2client = await getClient();
  const scope = (process.env.GOOGLE_OAUTH2_SCOPE || "").split(",");
  return oauth2client.generateAuthUrl({
    scope,
    state,
  });
};

const getTokens = async function (code) {
  const oauth2client = await getClient();
  const { tokens } = await oauth2client.getToken(code);
  return tokens;
};

const isLoggedIn = function (req) {
  return req.session && req.session.tokens;
};

const requireLogin = async function (req) {
  if (!isLoggedIn(req)) {
    // Redirect to login page
    const encoded = encodeURI(req.rawPath);
    return {
      location: `/login?next=${encoded}`,
    };
  }
  const oauth2client = await getClient();
  oauth2client.setCredentials(req.session.tokens);
};

module.exports = {
  apis: google,
  getClient,
  getAuthURL,
  getTokens,
  isLoggedIn,
  requireLogin,
  parseState,
};
