const arc = require("@architect/functions");
const { getTokens, parseState } = require("@architect/shared/auth");

async function route(req) {
  const state = parseState(req.queryStringParameters.state);
  if (!state.valid) {
    return { status: 500 };
  }

  const tokens = await getTokens(req.queryStringParameters.code);
  return {
    session: { tokens },
    status: 302,
    location: state.next || `/`,
  };
}

exports.handler = arc.http.async(route);
