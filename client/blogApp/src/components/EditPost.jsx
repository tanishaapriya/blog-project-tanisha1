import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";

const EditPost = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const { isDark } = useTheme();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/${id}`
      );

      const postData = response.data;

      if (user && user._id !== postData.author._id) {
        setError("You are not authorized to edit this post");
        setLoading(false);
        return;
      }

      setPost(postData);
      setTitle(postData.title);
      setContent(postData.content);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch post");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/posts/${id}`,
        { title: title.trim(), content: content.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/post/${id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update post");
      setSaving(false);
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
            <span className="text-2xl">🚫</span>
          </div>
          <p
            className={`mb-6 text-lg ${
              isDark ? "text-dark-text" : "text-light-text"
            }`}
          >
            {error}
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-full font-medium bg-gradient-primary text-white hover:shadow-lg hover:scale-105 transform transition-all duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${
        isDark ? "bg-gradient-dark" : "bg-gradient-light"
      }`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute top-20 right-20 w-60 h-60 rounded-full opacity-10 blur-3xl ${
            isDark ? "bg-secondary-500" : "bg-secondary-300"
          }`}
        ></div>
        <div
          className={`absolute bottom-20 left-20 w-80 h-80 rounded-full opacity-10 blur-3xl ${
            isDark ? "bg-primary-500" : "bg-primary-300"
          }`}
        ></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <div
          className={`backdrop-blur-md border rounded-3xl p-8 shadow-2xl ${
            isDark
              ? "bg-dark-card/80 border-dark-border glass-dark"
              : "bg-light-card/80 border-light-border glass-light"
          }`}
        >
          <div className="mb-8">
            <h1
              className={`text-4xl font-bold mb-4 font-serif ${
                isDark ? "text-dark-text" : "text-light-text"
              }`}
            >
              <span className="heading-gradient">Edit Your Story</span>
            </h1>
            <p
              className={`text-lg ${
                isDark ? "text-dark-muted" : "text-light-muted"
              }`}
            >
              Refine and improve your thoughts
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <label
                className={`block text-sm font-medium mb-3 ${
                  isDark ? "text-dark-text" : "text-light-text"
                }`}
              >
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full text-2xl font-bold border-2 rounded-2xl px-6 py-4 transition-all duration-300 input-focus ${
                  isDark
                    ? "bg-dark-bg/50 border-dark-border text-dark-text placeholder-dark-muted focus:border-secondary-500 focus:bg-dark-bg/80"
                    : "bg-light-bg/50 border-light-border text-light-text placeholder-light-muted focus:border-secondary-500 focus:bg-white"
                } focus:outline-none`}
                placeholder="Enter your story title..."
                required
              />
            </div>

            <div className="relative">
              <label
                className={`block text-sm font-medium mb-3 ${
                  isDark ? "text-dark-text" : "text-light-text"
                }`}
              >
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={16}
                className={`w-full border-2 rounded-2xl px-6 py-4 resize-none transition-all duration-300 input-focus leading-relaxed ${
                  isDark
                    ? "bg-dark-bg/50 border-dark-border text-dark-text placeholder-dark-muted focus:border-secondary-500 focus:bg-dark-bg/80"
                    : "bg-light-bg/50 border-light-border text-light-text placeholder-light-muted focus:border-secondary-500 focus:bg-white"
                } focus:outline-none`}
                placeholder="Share your updated thoughts and insights..."
                required
              />
              <div
                className={`absolute bottom-4 right-4 text-sm ${
                  isDark ? "text-dark-muted" : "text-light-muted"
                }`}
              >
                {content.length} characters
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-opacity-20">
              <button
                type="button"
                onClick={() => navigate(`/post/${id}`)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? "text-dark-muted hover:text-dark-text hover:bg-dark-border/30"
                    : "text-light-muted hover:text-light-text hover:bg-light-border/30"
                }`}
              >
                ← Cancel
              </button>

              <button
                type="submit"
                disabled={saving || !title.trim() || !content.trim()}
                className={`px-8 py-3 rounded-full font-medium transition-all duration-300 btn-animated bg-gradient-secondary text-white hover:shadow-lg hover:scale-105 transform disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none ${
                  isDark
                    ? "hover:shadow-secondary-500/25"
                    : "hover:shadow-secondary-500/30"
                }`}
              >
                {saving ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Save Changes</span>
                    <span>✅</span>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
