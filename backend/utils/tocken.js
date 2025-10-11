const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const SECRET = process.env.JWT_SECRET || "please_change_this_secret";

function signToken(payload, opts = { expiresIn: "7d" }) {
  return jwt.sign(payload, SECRET, opts);
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = { signToken, verifyToken };
