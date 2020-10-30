# arc-example-oauth-login

## Setup

In this examples, you need a `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`. You can find these pieces of information by going to the [Developer Console](https://console.cloud.google.com/apis/credentials), clicking your project --> APIs & auth --> credentials.

## Usage

- `npm i`
- Navigate to the Cloud Console and [Create a new OAuth2 Client Id](https://console.cloud.google.com/apis/credentials/oauthclient)
- Select `Web Application` for the application type
- Add an authorized redirect URI with the value `http://localhost:3333/oauth2callback`
- Click `Create`, and `Ok` on the following screen
- Click the `Download` icon next to your newly created OAuth2 Client Id
- Use `arc env testing GOOGLE_CLIENT_ID your-client-id` and `arc env testing GOOGLE_CLIENT_SECRET your-client-secret` to configure your client and secret. DO NOT COMMIT `.arc-env` to your repository!!
- `npm start`

## Staging / Production
- When you deploy to staging or production you need to add those URLs as valid redirect URLs in the [developer console](https://console.cloud.google.com/apis/credentials)

