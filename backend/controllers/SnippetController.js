const Snippet = require("../models/snippetModel");
const { nanoid } = require("nanoid");

async function createSnippet(req, res) {
  try {
    const { title, content, language, visibility, expiresInDays } = req.body;
    if (!content)
      return res.status(400).json({ message: "content is required" });

    const slug = nanoid(8);
    const snippet = new Snippet({
      title,
      content,
      language,
      visibility: visibility || "public",
      owner: req.user ? req.user._id : null,
      slug,
    });

    if (expiresInDays) {
      const d = new Date();
      d.setDate(d.getDate() + Number(expiresInDays));
      snippet.expiresAt = d;
    }

    await snippet.save();
    return res.status(201).json({ snippet });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "server error" });
  }
}

async function getSnippet(req, res) {
  try {
    const { slug } = req.params;
    const s = await Snippet.findOne({ slug }).lean();
    if (!s) return res.status(404).json({ message: "not found" });

    // enforce private visibility
    if (s.visibility === "private") {
      if (!req.user || String(req.user._id) !== String(s.owner)) {
        return res.status(403).json({ message: "forbidden" });
      }
    }

    // increment views for public/unlisted
    if (s.visibility !== "private") {
      await Snippet.updateOne({ _id: s._id }, { $inc: { views: 1 } });
    }

    return res.json({ snippet: s });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "server error" });
  }
}

async function listSnippets(req, res) {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Number(req.query.limit) || 20);
    const filter = { visibility: "public" };

    if (req.query.language) filter.language = req.query.language;

    const total = await Snippet.countDocuments(filter);
    const snippets = await Snippet.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    return res.json({ meta: { total, page, limit }, snippets });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "server error" });
  }
}

module.exports = { createSnippet, getSnippet, listSnippets };
