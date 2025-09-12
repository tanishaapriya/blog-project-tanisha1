import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
        isDark
          ? "bg-dark-bg/80 border-dark-border glass-dark"
          : "bg-light-bg/80 border-light-border glass-light"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className={`font-bold text-2xl font-serif tracking-tight transition-all duration-300 hover:scale-105 ${
              isDark ? "text-dark-text" : "text-light-text"
            }`}
          >
            <span className="heading-gradient">BlogSpace</span>
          </Link>

          <div className="flex items-center space-x-6">
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-12 ${
                isDark
                  ? "bg-dark-card hover:bg-primary-500/20 text-primary-500"
                  : "bg-light-card hover:bg-primary-500/20 text-primary-600 shadow-lg"
              }`}
              aria-label="Toggle theme"
            >
              <div className="text-xl">{isDark ? "☀️" : "🌙"}</div>
            </button>

            {!user ? (
              <Link
                to="/login"
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 btn-animated bg-gradient-primary text-white hover:shadow-lg hover:scale-105 transform ${
                  isDark
                    ? "hover:shadow-primary-500/25"
                    : "hover:shadow-primary-500/30"
                }`}
              >
                Sign In
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/create-post"
                  className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 btn-animated bg-gradient-secondary text-white hover:shadow-lg hover:scale-105 transform ${
                    isDark
                      ? "hover:shadow-secondary-500/25"
                      : "hover:shadow-secondary-500/30"
                  }`}
                >
                  ✨ New Post
                </Link>

                <div
                  className={`flex items-center space-x-3 px-4 py-2 rounded-full ${
                    isDark ? "bg-dark-card/50" : "bg-light-card/50"
                  } backdrop-blur-sm`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span
                    className={`font-medium ${
                      isDark ? "text-dark-text" : "text-light-text"
                    }`}
                  >
                    {user.name}
                  </span>
                  <button
                    onClick={logout}
                    className={`text-sm px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 ${
                      isDark
                        ? "text-dark-muted hover:text-red-400 hover:bg-red-400/10"
                        : "text-light-muted hover:text-red-600 hover:bg-red-600/10"
                    }`}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
