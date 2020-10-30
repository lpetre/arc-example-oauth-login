let arc = require("@architect/functions");
let auth = require("@architect/shared/auth");

async function showProtectedPage(request) {
  const oauth2 = auth.apis.oauth2("v2");
  const info = await oauth2.userinfo.v2.me.get({});

  let html = `
	<body>
		<h1>Protected</h1>
		<p>Hello ${info.data.email}, only logged in users can access this page.</p>
		<p><a href=/logout>logout</a></p>
	</body>`;

  return { html };
}

exports.handler = arc.http.async(auth.requireLogin, showProtectedPage);
