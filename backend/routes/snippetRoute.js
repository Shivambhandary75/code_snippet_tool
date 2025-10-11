const express = require("express");
const router = express.Router();
const SnippetController = require("../controllers/SnippetController");
const validate = require("../middleware/validateRequest");
const { createSnippetSchema } = require("../schemas/snippetSchema");
const rateLimit = require("../middleware/rateLimit");

// public listing
router.get("/", SnippetController.listSnippets);

// create (rate limited)
router.post(
  "/",
  rateLimit,
  validate(createSnippetSchema),
  SnippetController.createSnippet
);

// read by slug
router.get("/:slug", SnippetController.getSnippet);

// raw view
router.get("/:slug/raw", async (req, res, next) => {
  // small wrapper: use controller but return plain text
  try {
    const { slug } = req.params;
    const Snippet = require("../models/snippetModel");
    const s = await Snippet.findOne({ slug }).lean();
    if (!s) return res.status(404).send("not found");
    if (s.visibility === "private") return res.status(403).send("forbidden");
    res.type("text/plain").send(s.content);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
