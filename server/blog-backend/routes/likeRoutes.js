import express from "express";
import Like from "../model/Like.js";
import Post from "../model/Post.js";
import requireAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:postId", requireAuth, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    const existingLike = await Like.findOne({ user: userId, post: postId });
    if (existingLike) {
      return res.status(400).json({ message: "Post already liked" });
    }

    const like = await Like.create({ user: userId, post: postId });
    await Post.findByIdAndUpdate(postId, { $push: { likes: like._id } });

    res.status(201).json({ message: "Post liked successfully", like });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:postId", requireAuth, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    const like = await Like.findOneAndDelete({ user: userId, post: postId });
    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }

    await Post.findByIdAndUpdate(postId, { $pull: { likes: like._id } });

    res.json({ message: "Post unliked successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:postId/status", requireAuth, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    const like = await Like.findOne({ user: userId, post: postId });
    res.json({ isLiked: !!like });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
