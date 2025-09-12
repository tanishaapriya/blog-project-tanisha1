import GoogleLoginButton from "../components/GoogleLoginButton";
import { useTheme } from "../context/ThemeContext";

const Login = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
        isDark ? "bg-gradient-dark" : "bg-gradient-light"
      }`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl ${
            isDark ? "bg-primary-500" : "bg-primary-300"
          }`}
        ></div>
        <div
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl ${
            isDark ? "bg-secondary-500" : "bg-secondary-300"
          }`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full opacity-10 blur-3xl ${
            isDark ? "bg-accent-500" : "bg-accent-300"
          }`}
        ></div>
      </div>

      <div
        className={`relative z-10 text-center p-8 rounded-3xl backdrop-blur-md border shadow-2xl max-w-md w-full mx-4 ${
          isDark
            ? "bg-dark-card/80 border-dark-border glass-dark"
            : "bg-light-card/80 border-light-border glass-light"
        }`}
      >
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg">
            <div className="text-3xl">✨</div>
          </div>

          <h1
            className={`text-4xl font-bold mb-4 font-serif ${
              isDark ? "text-dark-text" : "text-light-text"
            }`}
          >
            Welcome Back
          </h1>

          <p
            className={`text-lg mb-8 ${
              isDark ? "text-dark-muted" : "text-light-muted"
            }`}
          >
            Sign in to continue your blogging journey
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center">
            <GoogleLoginButton />
          </div>

          <div
            className={`text-sm ${
              isDark ? "text-dark-muted" : "text-light-muted"
            }`}
          >
            By signing in, you agree to our Terms of Service and Privacy Policy
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-primary-500 opacity-60 animate-pulse"></div>
        <div className="absolute -top-1 -right-3 w-2 h-2 rounded-full bg-secondary-500 opacity-60 animate-pulse delay-300"></div>
        <div className="absolute -bottom-2 -right-2 w-3 h-3 rounded-full bg-accent-500 opacity-60 animate-pulse delay-700"></div>
        <div className="absolute -bottom-1 -left-3 w-2 h-2 rounded-full bg-primary-500 opacity-60 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default Login;
