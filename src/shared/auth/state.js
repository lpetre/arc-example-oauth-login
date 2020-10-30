// FIXME I'd rather store a nonce in a cache but this will have to do
// taken from https://github.com/architect/functions/blob/master/src/http/session/providers/jwe.js
let jwt = require("node-webtokens");
let alg = "dir";
let enc = "A128GCM";

// 32 bit key size
let fallback = Buffer.from("12345678901234567890123456789012").toString(
  "base64"
);

// need to STRONGLY encourage setting ARC_APP_SECRET in the docs
let key = process.env.ARC_APP_SECRET || fallback;

module.exports = {
  encodeState(state) {
    return jwt.generate(alg, enc, state, key);
  },
  parseState(state) {
    const HOUR = 60 * 60;
    return jwt.parse(state).setTokenLifetime(HOUR).verify(key);
  },
};
