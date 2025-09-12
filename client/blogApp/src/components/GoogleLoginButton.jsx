import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDark } = useTheme();

  const handleSuccess = async (credentialResponse) => {
    console.log("Google credential response:", credentialResponse);
    try {
      const token = credentialResponse.credential;
      if (!token) {
        console.error("No token from Google!");
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/google`,
        { token }
      );

      console.log("Backend response:", res.data);
      login(res.data.user, res.data.token);

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 ${
          isDark
            ? "bg-dark-border/20 border-dark-border hover:bg-dark-border/30"
            : "bg-light-border/20 border-light-border hover:bg-light-border/30"
        }`}
      >
        <div className="flex items-center justify-center">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => {
              console.log("Login Failed");
            }}
            theme={isDark ? "filled_black" : "outline"}
            size="large"
            shape="pill"
            text="signin_with"
            logo_alignment="left"
            width="280"
          />
        </div>
      </div>

      <div className="mt-4 text-center">
        <p
          className={`text-sm ${
            isDark ? "text-dark-muted" : "text-light-muted"
          }`}
        >
          Quick, secure, and seamless authentication
        </p>
      </div>
    </div>
  );
};

export default GoogleLoginButton;
