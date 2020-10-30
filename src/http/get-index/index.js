let arc = require("@architect/functions");
let auth = require("@architect/shared/auth");

function layout(body) {
  return `
  <body>
    <h1>Login Demo</h1>
    ${body}
  <body>`;
}

async function route(req) {
  if (!auth.isLoggedIn(req)) {
    const authUrl = await auth.getAuthURL();
    return {
      html: layout(`
      <h2>Logged out</h2>	
      <p>You can try and visit <a href=/protected>protected</a> but you won't be able to until you log in!</a>
      <a href=${authUrl}>Login</a>
    `),
    };
  } else {
    return {
      html: layout(`
      <h2>You're logged in</h2>
      <p>
      <a href=/protected>protected</a>
      <a href=/logout>logout</a>
    </p>`),
    };
  }
}

exports.handler = arc.http.async(route);
