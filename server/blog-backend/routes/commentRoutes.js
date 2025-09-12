import express from "express";
import Comment from "../model/Comment.js";
import Post from "../model/Post.js";
import requireAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:postId", requireAuth, async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    if (!content.trim()) {
      return res.status(400).json({ message: "Comment content is required" });
    }

    const comment = await Comment.create({
      content: content.trim(),
      author: userId,
      post: postId,
    });

    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

    const populatedComment = await Comment.findById(comment._id).populate("author", "name email");

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:commentId", requireAuth, async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    if (!content.trim()) {
      return res.status(400).json({ message: "Comment content is required" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this comment" });
    }

    comment.content = content.trim();
    await comment.save();

    const updatedComment = await Comment.findById(commentId).populate("author", "name email");
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:commentId", requireAuth, async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    await Post.findByIdAndUpdate(comment.post, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
