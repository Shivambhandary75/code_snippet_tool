const express = require("express");
const router = express.Router();
const snippetController = require("../controllers/snippetController");
const authMiddleware = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");
const snippetValidation = require("../validation/snippetValidation");

// All routes below require authentication
router.use(authMiddleware);

// CRUD operations for user's snippets
router.post(
  "/",
  validateRequest(snippetValidation.create),
  snippetController.createSnippet
);
router.get("/", snippetController.getUserSnippets);
router.get("/:id", snippetController.getSnippet);
router.put(
  "/:id",
  validateRequest(snippetValidation.update),
  snippetController.updateSnippet
);
router.delete("/:id", snippetController.deleteSnippet);
router.patch("/:id/favorite", snippetController.toggleFavorite);

// Public routes (no auth required for these)
router.get("/public/shared", snippetController.getPublicSnippets);
router.get("/public/shared/:id", snippetController.getPublicSnippet);

module.exports = router;