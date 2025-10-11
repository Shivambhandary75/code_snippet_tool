const mongoose = require("mongoose");

const SnippetSchema = new mongoose.Schema(
  {
    title: { type: String },
    content: { type: String, required: true },
    language: { type: String },
    visibility: {
      type: String,
      enum: ["public", "unlisted", "private"],
      default: "public",
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    slug: { type: String, required: true, unique: true, index: true },
    views: { type: Number, default: 0 },
    forks: { type: Number, default: 0 },
    expiresAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// Optional TTL index if expiresAt is used
// Snippets will be removed by a background process if expiresAt is set
SnippetSchema.index(
  { expiresAt: 1 },
  {
    expireAfterSeconds: 0,
    partialFilterExpression: { expiresAt: { $type: "date" } },
  }
);

module.exports = mongoose.model("Snippet", SnippetSchema);
