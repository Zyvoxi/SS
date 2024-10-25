"use strict";
const { createHash } = require("crypto");

// eslint-disable-next-line no-undef
module.exports = (env) => {
  const hash = createHash("md5");
  hash.update(JSON.stringify(env));

  return hash.digest("hex");
};
