require("dotenv").config();
const jwt = require("jsonwebtoken");

const SECRET = process.env.TOKEN_KEY || process.env.JWT_SECRET;
if (!SECRET) {
  throw new Error("Missing TOKEN_KEY (or JWT_SECRET). Add TOKEN_KEY to backend/.env");
}

const createSecretToken = (id) => {
  return jwt.sign({ id }, SECRET, { expiresIn: 3 * 24 * 60 * 60 });
};
module.exports = { createSecretToken };
