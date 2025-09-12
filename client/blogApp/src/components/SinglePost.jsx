import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";

const SinglePost = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/${id}`
      );
      setPost(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch post");
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    setDeleting(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete post");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? "bg-gradient-dark" : "bg-gradient-light"
        }`}
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p
            className={`text-lg ${
              isDark ? "text-dark-muted" : "text-light-muted"
            }`}
          >
            Loading story...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? "bg-gradient-dark" : "bg-gradient-light"
        }`}
      >
        <div
          className={`text-center p-8 rounded-3xl backdrop-blur-md border max-w-lg ${
            isDark
              ? "bg-dark-card/80 border-dark-border glass-dark"
              : "bg-light-card/80 border-light-border glass-light"
          }`}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>
          <p
            className={`mb-4 text-lg ${
              isDark ? "text-dark-text" : "text-light-text"
            }`}
          >
            Story not found
          </p>
          <p
            className={`mb-6 ${
              isDark ? "text-dark-muted" : "text-light-muted"
            }`}
          >
            {error}
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-full font-medium bg-gradient-primary text-white hover:shadow-lg hover:scale-105 transform transition-all duration-300"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? "bg-gradient-dark" : "bg-gradient-light"
        }`}
      >
        <div
          className={`text-center p-8 rounded-3xl backdrop-blur-md border max-w-lg ${
            isDark
              ? "bg-dark-card/80 border-dark-border glass-dark"
              : "bg-light-card/80 border-light-border glass-light"
          }`}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-500/20 flex items-center justify-center">
            <span className="text-2xl">📄</span>
          </div>
          <h2
            className={`text-2xl font-bold mb-4 font-serif ${
              isDark ? "text-dark-text" : "text-light-text"
            }`}
          >
            Story Not Found
          </h2>
          <p
            className={`mb-6 ${
              isDark ? "text-dark-muted" : "text-light-muted"
            }`}
          >
            This story doesn't exist or has been removed.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-full font-medium bg-gradient-primary text-white hover:shadow-lg hover:scale-105 transform transition-all duration-300"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const isAuthor = user && user._id === post.author._id;

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${
        isDark ? "bg-gradient-dark" : "bg-gradient-light"
      }`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute top-20 right-10 w-60 h-60 rounded-full opacity-5 blur-3xl ${
            isDark ? "bg-primary-500" : "bg-primary-300"
          }`}
        ></div>
        <div
          className={`absolute bottom-20 left-10 w-80 h-80 rounded-full opacity-5 blur-3xl ${
            isDark ? "bg-secondary-500" : "bg-secondary-300"
          }`}
        ></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <article
          className={`backdrop-blur-md border rounded-3xl p-8 md:p-12 shadow-2xl mb-8 ${
            isDark
              ? "bg-dark-card/80 border-dark-border glass-dark"
              : "bg-light-card/80 border-light-border glass-light"
          }`}
        >
          <header className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-lg">
                  {post.author?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div>
                  <h3
                    className={`font-semibold text-lg ${
                      isDark ? "text-dark-text" : "text-light-text"
                    }`}
                  >
                    {post.author?.name || "Unknown"}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm">
                    <span
                      className={
                        isDark ? "text-dark-muted" : "text-light-muted"
                      }
                    >
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span
                      className={
                        isDark ? "text-dark-muted" : "text-light-muted"
                      }
                    >
                      •
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isDark
                          ? "bg-primary-500/20 text-primary-400"
                          : "bg-primary-500/20 text-primary-600"
                      }`}
                    >
                      {Math.ceil(post.content.length / 250)} min read
                    </span>
                  </div>
                </div>
              </div>

              {isAuthor && (
                <div className="flex space-x-3">
                  <Link
                    to={`/edit-post/${post._id}`}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      isDark
                        ? "text-dark-muted hover:text-primary-400 hover:bg-primary-500/10"
                        : "text-light-muted hover:text-primary-600 hover:bg-primary-500/10"
                    }`}
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 ${
                      isDark
                        ? "text-dark-muted hover:text-red-400 hover:bg-red-400/10"
                        : "text-light-muted hover:text-red-600 hover:bg-red-600/10"
                    }`}
                  >
                    {deleting ? "🗑️ Deleting..." : "🗑️ Delete"}
                  </button>
                </div>
              )}
            </div>

            <h1
              className={`text-4xl md:text-5xl font-bold mb-8 font-serif leading-tight ${
                isDark ? "text-dark-text" : "text-light-text"
              }`}
            >
              {post.title}
            </h1>
          </header>

          <div
            className={`prose prose-lg max-w-none leading-relaxed whitespace-pre-wrap mb-12 ${
              isDark
                ? "prose-dark text-dark-text"
                : "prose-light text-light-text"
            }`}
          >
            {post.content}
          </div>

          <div className="pt-8 border-t border-opacity-20">
            <div className="flex items-center justify-between mb-8">
              <LikeButton
                postId={post._id}
                initialLikes={post.likes || []}
                onLikeUpdate={fetchPost}
              />
              <div
                className={`flex items-center space-x-2 text-sm ${
                  isDark ? "text-dark-muted" : "text-light-muted"
                }`}
              >
                <span>💬</span>
                <span>{post.comments?.length || 0} comments</span>
              </div>
            </div>
          </div>
        </article>

        <CommentSection postId={post._id} />

        <div className="mt-12 text-center">
          <Link
            to="/"
            className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
              isDark
                ? "text-dark-muted hover:text-dark-text hover:bg-dark-card/50"
                : "text-light-muted hover:text-light-text hover:bg-light-card/50"
            }`}
          >
            <span>←</span>
            <span>Back to Stories</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
