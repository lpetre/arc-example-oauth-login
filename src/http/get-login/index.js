let arc = require("@architect/functions");
let auth = require("@architect/shared/auth");

async function route(req) {
  console.log(req.queryStringParameters);
  if (!auth.isLoggedIn(req)) {
    const authUrl = await auth.getAuthURL({
      next: req.queryStringParameters.next,
    });
    return {
      status: 302,
      location: authUrl,
    };
  }
  return {
    status: 302,
    location: req.queryStringParameters.next,
  };
}

exports.handler = arc.http.async(route);
