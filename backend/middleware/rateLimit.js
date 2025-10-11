const rateLimit = require("express-rate-limit");

// Lightweight limiter for snippet creation: 30 requests per hour per IP
module.exports = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many snippet creations, try later" },
});
