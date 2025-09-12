import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import LikeButton from "./LikeButton";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDark } = useTheme();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
      setPosts(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch posts");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p
            className={`text-lg ${
              isDark ? "text-dark-muted" : "text-light-muted"
            }`}
          >
            Loading amazing stories...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          className={`text-center p-8 rounded-3xl backdrop-blur-md border ${
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
            Oops! Something went wrong
          </p>
          <p
            className={`mb-6 ${
              isDark ? "text-dark-muted" : "text-light-muted"
            }`}
          >
            {error}
          </p>
          <button
            onClick={fetchPosts}
            className="px-6 py-3 rounded-full font-medium bg-gradient-primary text-white hover:shadow-lg hover:scale-105 transform transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
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

        <div
          className={`relative z-10 text-center p-12 rounded-3xl backdrop-blur-md border max-w-lg ${
            isDark
              ? "bg-dark-card/80 border-dark-border glass-dark"
              : "bg-light-card/80 border-light-border glass-light"
          }`}
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center">
            <span className="text-4xl">✍️</span>
          </div>
          <h3
            className={`text-3xl font-bold mb-4 font-serif ${
              isDark ? "text-dark-text" : "text-light-text"
            }`}
          >
            No Stories Yet
          </h3>
          <p
            className={`text-lg mb-8 ${
              isDark ? "text-dark-muted" : "text-light-muted"
            }`}
          >
            Be the first to share your thoughts and inspire others.
          </p>
          <Link
            to="/create-post"
            className="inline-block px-8 py-4 rounded-full font-medium bg-gradient-secondary text-white hover:shadow-lg hover:scale-105 transform transition-all duration-300 btn-animated"
          >
            Write First Story ✨
          </Link>
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
          className={`absolute top-40 right-10 w-40 h-40 rounded-full opacity-5 blur-2xl ${
            isDark ? "bg-primary-500" : "bg-primary-300"
          }`}
        ></div>
        <div
          className={`absolute top-96 left-10 w-60 h-60 rounded-full opacity-5 blur-2xl ${
            isDark ? "bg-secondary-500" : "bg-secondary-300"
          }`}
        ></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12 text-center">
          <h1
            className={`text-5xl font-bold mb-4 font-serif ${
              isDark ? "text-dark-text" : "text-light-text"
            }`}
          >
            <span className="heading-gradient">Latest Stories</span>
          </h1>
          <p
            className={`text-xl ${
              isDark ? "text-dark-muted" : "text-light-muted"
            }`}
          >
            Discover amazing stories from our community
          </p>
        </div>

        <div className="grid gap-8">
          {posts.map((post, index) => (
            <article
              key={post._id}
              className={`p-8 border rounded-3xl backdrop-blur-md transition-all duration-500 hover:scale-[1.02] card-hover ${
                isDark
                  ? "bg-dark-card/80 border-dark-border glass-dark card-hover-dark"
                  : "bg-light-card/80 border-light-border glass-light"
              } animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
                    {post.author?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <span
                      className={`font-medium ${
                        isDark ? "text-dark-text" : "text-light-text"
                      }`}
                    >
                      {post.author?.name || "Unknown"}
                    </span>
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
              </div>

              <h2
                className={`text-2xl font-bold mb-4 font-serif leading-tight ${
                  isDark ? "text-dark-text" : "text-light-text"
                }`}
              >
                <Link
                  to={`/post/${post._id}`}
                  className={`transition-colors duration-300 ${
                    isDark ? "hover:text-primary-400" : "hover:text-primary-600"
                  }`}
                >
                  {post.title}
                </Link>
              </h2>

              <div
                className={`mb-6 text-lg leading-relaxed ${
                  isDark ? "text-dark-muted" : "text-light-muted"
                }`}
              >
                <p className="line-clamp-3">
                  {post.content.length > 200
                    ? `${post.content.substring(0, 200)}...`
                    : post.content}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-opacity-20">
                <Link
                  to={`/post/${post._id}`}
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                    isDark
                      ? "text-primary-400 hover:bg-primary-500/10"
                      : "text-primary-600 hover:bg-primary-500/10"
                  }`}
                >
                  <span>Read Story</span>
                  <span>→</span>
                </Link>

                <div className="flex items-center space-x-6">
                  <LikeButton
                    postId={post._id}
                    initialLikes={post.likes || []}
                    onLikeUpdate={fetchPosts}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostsList;
