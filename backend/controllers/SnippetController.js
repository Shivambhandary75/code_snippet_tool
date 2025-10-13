const Snippet = require("../models/snippetModel");
const { nanoid } = require('nanoid');

const snippetController = {
  // Create new snippet
  createSnippet: async (req, res) => {
    try {
      // ensure the request is authenticated
      if (!req.user || !req.user._id) {
        return res.status(401).json({ success: false, message: 'Unauthorized - user missing' });
      }

      const { title, description, code, language, tags, isPublic, favorite } = req.body;

      // Basic validation: return 400 for missing required fields
      if (!title || !code) {
        return res.status(400).json({ success: false, message: 'Title and code are required' });
      }

      // generate a URL-friendly slug to avoid duplicate null index errors
      const base = (title || 'snippet').toString().toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const slug = `${base}-${nanoid(6)}`;

      const snippet = new Snippet({
        title,
        description: description || "",
        code,
        language,
        tags: tags || [],
        isPublic: isPublic || false,
        favorite: favorite || false,
        userId: req.user._id,
        slug
      });

      try {
        await snippet.save();
      } catch (err) {
        // handle duplicate key on slug specifically
        if (err && err.code === 11000 && err.keyPattern && err.keyPattern.slug) {
          console.error('Slug duplicate key error, retrying with new slug');
          // retry once with a fresh slug
          snippet.slug = `${base}-${nanoid(8)}`;
          await snippet.save();
        } else {
          // rethrow so the outer catch can map validation errors to 400
          throw err;
        }
      }

      res.status(201).json({
        success: true,
        message: "Snippet created successfully",
        data: snippet
      });
    } catch (error) {
      // Log full error on server for debugging
      console.error("Create snippet error:", error);

      // Map common mongoose validation errors to 400
      if (error && (error.name === 'ValidationError' || error.name === 'CastError')) {
        return res.status(400).json({
          success: false,
          message: error.message || 'Invalid snippet data',
          errors: error.errors || undefined
        });
      }

      // Generic server error
      res.status(500).json({
        success: false,
        message: error.message || "Failed to create snippet",
        // include stack in dev only; remove or hide in production
        stack: process.env.NODE_ENV === 'production' ? undefined : error.stack
      });
    }
  },

  // Get all snippets for logged-in user
  getUserSnippets: async (req, res) => {
    try {
      const { 
        page = 1, 
        limit = 10, 
        search = "", 
        language = "", 
        tags = "",
        favorite = ""
      } = req.query;

      const filter = { userId: req.user._id };
      
      // Search filter
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { tags: { $in: [new RegExp(search, "i")] } }
        ];
      }
      
      // Language filter
      if (language) {
        filter.language = { $regex: language, $options: "i" };
      }
      
      // Tags filter
      if (tags) {
        const tagArray = tags.split(',').map(tag => tag.trim());
        filter.tags = { $in: tagArray.map(tag => new RegExp(tag, "i")) };
      }
      
      // Favorite filter
      if (favorite !== "") {
        filter.favorite = favorite === "true";
      }

      const snippets = await Snippet.find(filter)
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Snippet.countDocuments(filter);

      res.json({
        success: true,
        data: snippets,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      });
    } catch (error) {
      console.error("Get snippets error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch snippets"
      });
    }
  },

  // Get single snippet
  getSnippet: async (req, res) => {
    try {
      const snippet = await Snippet.findOne({
        _id: req.params.id,
        userId: req.user._id
      });

      if (!snippet) {
        return res.status(404).json({
          success: false,
          message: "Snippet not found"
        });
      }

      res.json({
        success: true,
        data: snippet
      });
    } catch (error) {
      console.error("Get snippet error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch snippet"
      });
    }
  },

  // Update snippet
  updateSnippet: async (req, res) => {
    try {
      const snippet = await Snippet.findOne({
        _id: req.params.id,
        userId: req.user._id
      });

      if (!snippet) {
        return res.status(404).json({
          success: false,
          message: "Snippet not found"
        });
      }

      const updatedSnippet = await Snippet.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
      );

      res.json({
        success: true,
        message: "Snippet updated successfully",
        data: updatedSnippet
      });
    } catch (error) {
      console.error("Update snippet error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update snippet"
      });
    }
  },

  // Delete snippet
  deleteSnippet: async (req, res) => {
    try {
      const snippet = await Snippet.findOne({
        _id: req.params.id,
        userId: req.user._id
      });

      if (!snippet) {
        return res.status(404).json({
          success: false,
          message: "Snippet not found"
        });
      }

      await Snippet.findByIdAndDelete(req.params.id);

      res.json({
        success: true,
        message: "Snippet deleted successfully"
      });
    } catch (error) {
      console.error("Delete snippet error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete snippet"
      });
    }
  },

  // Toggle favorite
  toggleFavorite: async (req, res) => {
    try {
      const snippet = await Snippet.findOne({
        _id: req.params.id,
        userId: req.user._id
      });

      if (!snippet) {
        return res.status(404).json({
          success: false,
          message: "Snippet not found"
        });
      }

      snippet.favorite = !snippet.favorite;
      await snippet.save();

      res.json({
        success: true,
        message: `Snippet ${snippet.favorite ? 'added to' : 'removed from'} favorites`,
        data: snippet
      });
    } catch (error) {
      console.error("Toggle favorite error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update favorite"
      });
    }
  },

  // Get public snippets (for sharing)
  getPublicSnippets: async (req, res) => {
    try {
      const { page = 1, limit = 10, language = "" } = req.query;

      const filter = { isPublic: true };
      
      if (language) {
        filter.language = { $regex: language, $options: "i" };
      }

      const snippets = await Snippet.find(filter)
        .populate("userId", "username email")
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Snippet.countDocuments(filter);

      res.json({
        success: true,
        data: snippets,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      });
    } catch (error) {
      console.error("Get public snippets error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch public snippets"
      });
    }
  },

  // Get snippet by ID for public access
  getPublicSnippet: async (req, res) => {
    try {
      const snippet = await Snippet.findOne({
        _id: req.params.id,
        isPublic: true
      }).populate("userId", "username email");

      if (!snippet) {
        return res.status(404).json({
          success: false,
          message: "Snippet not found or not public"
        });
      }

      res.json({
        success: true,
        data: snippet
      });
    } catch (error) {
      console.error("Get public snippet error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch snippet"
      });
    }
  }
};

module.exports = snippetController;
