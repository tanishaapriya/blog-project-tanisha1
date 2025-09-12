import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setSaving(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/posts`,
        { title: title.trim(), content: content.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/post/${response.data._id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create post");
      setSaving(false);
    }
  };

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
            isDark ? "bg-primary-500" : "bg-primary-300"
          }`}
        ></div>
        <div
          className={`absolute bottom-20 left-20 w-80 h-80 rounded-full opacity-10 blur-3xl ${
            isDark ? "bg-secondary-500" : "bg-secondary-300"
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
              <span className="heading-gradient">Create Your Story</span>
            </h1>
            <p
              className={`text-lg ${
                isDark ? "text-dark-muted" : "text-light-muted"
              }`}
            >
              Share your thoughts with the world
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
                placeholder="Enter an engaging title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full text-2xl font-bold border-2 rounded-2xl px-6 py-4 transition-all duration-300 input-focus ${
                  isDark
                    ? "bg-dark-bg/50 border-dark-border text-dark-text placeholder-dark-muted focus:border-primary-500 focus:bg-dark-bg/80"
                    : "bg-light-bg/50 border-light-border text-light-text placeholder-light-muted focus:border-primary-500 focus:bg-white"
                } focus:outline-none`}
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
                placeholder="Write your story here... Share your ideas, experiences, and insights."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={16}
                className={`w-full border-2 rounded-2xl px-6 py-4 resize-none transition-all duration-300 input-focus leading-relaxed ${
                  isDark
                    ? "bg-dark-bg/50 border-dark-border text-dark-text placeholder-dark-muted focus:border-primary-500 focus:bg-dark-bg/80"
                    : "bg-light-bg/50 border-light-border text-light-text placeholder-light-muted focus:border-primary-500 focus:bg-white"
                } focus:outline-none`}
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
                onClick={() => window.history.back()}
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
                className={`px-8 py-3 rounded-full font-medium transition-all duration-300 btn-animated bg-gradient-primary text-white hover:shadow-lg hover:scale-105 transform disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none ${
                  isDark
                    ? "hover:shadow-primary-500/25"
                    : "hover:shadow-primary-500/30"
                }`}
              >
                {saving ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Publishing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Publish Story</span>
                    <span>✨</span>
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

export default CreatePost;
