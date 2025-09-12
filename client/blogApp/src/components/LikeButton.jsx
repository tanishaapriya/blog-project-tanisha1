import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const LikeButton = ({ postId, initialLikes = [], onLikeUpdate }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes.length);
  const [loading, setLoading] = useState(false);
  const [animating, setAnimating] = useState(false);
  const { user } = useAuth();
  const { isDark } = useTheme();

  useEffect(() => {
    if (user) {
      checkLikeStatus();
    }
  }, [user, postId]);

  const checkLikeStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/likes/${postId}/status`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsLiked(response.data.isLiked);
    } catch (error) {
      console.error("Error checking like status:", error);
    }
  };

  const handleLike = async () => {
    if (!user) {
      alert("Please login to like posts");
      return;
    }

    setLoading(true);
    setAnimating(true);

    try {
      const token = localStorage.getItem("token");

      if (isLiked) {
        await axios.delete(`${import.meta.env.VITE_API_URL}/likes/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/likes/${postId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      }

      if (onLikeUpdate) {
        onLikeUpdate();
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setLoading(false);
      setTimeout(() => setAnimating(false), 300);
    }
  };

  if (!user) {
    return (
      <div
        className={`flex items-center space-x-2 px-3 py-2 rounded-full ${
          isDark
            ? "bg-dark-card/50 text-dark-muted"
            : "bg-light-card/50 text-light-muted"
        }`}
      >
        <div className="w-5 h-5 flex items-center justify-center">
          <span className="text-lg">❤️</span>
        </div>
        <span className="font-medium">{likeCount}</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 ${
        isLiked
          ? isDark
            ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
            : "bg-red-500/20 text-red-600 hover:bg-red-500/30"
          : isDark
          ? "bg-dark-card/50 text-dark-muted hover:bg-red-500/10 hover:text-red-400"
          : "bg-light-card/50 text-light-muted hover:bg-red-500/10 hover:text-red-600"
      }`}
    >
      <div
        className={`w-5 h-5 flex items-center justify-center transition-transform duration-300 ${
          animating ? "scale-125" : "scale-100"
        }`}
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <span
            className={`text-lg transition-all duration-300 ${
              isLiked ? "animate-pulse-glow" : ""
            }`}
          >
            {isLiked ? "❤️" : "🤍"}
          </span>
        )}
      </div>
      <span className="font-medium">{likeCount}</span>
      {isLiked && !loading && <span className="text-xs opacity-75">Liked</span>}
    </button>
  );
};

export default LikeButton;
