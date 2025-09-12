import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const { isDark } = useTheme();

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/comments/${postId}`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to comment");
      return;
    }

    if (!newComment.trim()) {
      alert("Please enter a comment");
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/comments/${postId}`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComments((prev) => [response.data, ...prev]);
      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/comments/${commentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setComments((prev) =>
        prev.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment");
    }
  };

  if (loading) {
    return (
      <div
        className={`backdrop-blur-md border rounded-3xl p-8 ${
          isDark
            ? "bg-dark-card/80 border-dark-border glass-dark"
            : "bg-light-card/80 border-light-border glass-light"
        }`}
      >
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
          <span
            className={`ml-3 ${
              isDark ? "text-dark-muted" : "text-light-muted"
            }`}
          >
            Loading comments...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`backdrop-blur-md border rounded-3xl p-8 ${
        isDark
          ? "bg-dark-card/80 border-dark-border glass-dark"
          : "bg-light-card/80 border-light-border glass-light"
      }`}
    >
      <div className="mb-8">
        <h3
          className={`text-2xl font-bold mb-2 font-serif ${
            isDark ? "text-dark-text" : "text-light-text"
          }`}
        >
          Comments ({comments.length})
        </h3>
        <p className={`${isDark ? "text-dark-muted" : "text-light-muted"}`}>
          Share your thoughts about this story
        </p>
      </div>

      {user && (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold flex-shrink-0">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a thoughtful comment..."
                rows={3}
                className={`w-full p-4 rounded-2xl border-2 resize-none transition-all duration-300 input-focus ${
                  isDark
                    ? "bg-dark-bg/50 border-dark-border text-dark-text placeholder-dark-muted focus:border-primary-500 focus:bg-dark-bg/80"
                    : "bg-light-bg/50 border-light-border text-light-text placeholder-light-muted focus:border-primary-500 focus:bg-white"
                } focus:outline-none`}
                required
              />
              <div className="flex items-center justify-between mt-3">
                <span
                  className={`text-sm ${
                    isDark ? "text-dark-muted" : "text-light-muted"
                  }`}
                >
                  {newComment.length}/500 characters
                </span>
                <button
                  type="submit"
                  disabled={
                    submitting || !newComment.trim() || newComment.length > 500
                  }
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 btn-animated bg-gradient-secondary text-white hover:shadow-lg hover:scale-105 transform disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none ${
                    isDark
                      ? "hover:shadow-secondary-500/25"
                      : "hover:shadow-secondary-500/30"
                  }`}
                >
                  {submitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Posting...</span>
                    </div>
                  ) : (
                    "Post Comment"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {!user && (
        <div
          className={`mb-8 p-6 rounded-2xl text-center ${
            isDark ? "bg-dark-border/30" : "bg-light-border/30"
          }`}
        >
          <p
            className={`text-lg mb-3 ${
              isDark ? "text-dark-text" : "text-light-text"
            }`}
          >
            💬 Join the conversation
          </p>
          <p className={`${isDark ? "text-dark-muted" : "text-light-muted"}`}>
            Please sign in to share your thoughts and engage with other readers.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {comments.map((comment, index) => (
          <div
            key={comment._id}
            className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.01] ${
              isDark
                ? "bg-dark-bg/30 border-dark-border/50"
                : "bg-light-bg/30 border-light-border/50"
            } animate-fade-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                  {comment.author.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div>
                  <span
                    className={`font-semibold ${
                      isDark ? "text-dark-text" : "text-light-text"
                    }`}
                  >
                    {comment.author.name}
                  </span>
                  <div
                    className={`text-sm ${
                      isDark ? "text-dark-muted" : "text-light-muted"
                    }`}
                  >
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>

              {user && user._id === comment.author._id && (
                <button
                  onClick={() => handleDeleteComment(comment._id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 ${
                    isDark
                      ? "text-dark-muted hover:text-red-400 hover:bg-red-400/10"
                      : "text-light-muted hover:text-red-600 hover:bg-red-600/10"
                  }`}
                >
                  🗑️ Delete
                </button>
              )}
            </div>

            <p
              className={`leading-relaxed ${
                isDark ? "text-dark-muted" : "text-light-text"
              }`}
            >
              {comment.content}
            </p>
          </div>
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-accent/20 flex items-center justify-center">
            <span className="text-2xl">💭</span>
          </div>
          <p
            className={`text-lg ${
              isDark ? "text-dark-text" : "text-light-text"
            }`}
          >
            No comments yet
          </p>
          <p className={`${isDark ? "text-dark-muted" : "text-light-muted"}`}>
            Be the first to share your thoughts on this story!
          </p>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
