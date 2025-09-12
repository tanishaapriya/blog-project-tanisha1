import express from "express";
import Post from "../model/Post.js";
import requireAuth from "../middleware/authMiddleware.js";

const router = express.Router();

// create a post
router.post("/", requireAuth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.create({
      title,
      content,
      author: req.user._id,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get all posts
router.get("/", async (req, res) => {
  try {
     const posts = await Post.find()
      .populate("author", "name email")
      .populate("likes")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "name email"
        }
      });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name email")
      .populate("likes")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "name email"
        }
      });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update post
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete post
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
