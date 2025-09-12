import { BrowserRouter as Router, Routes, Route ,Link } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import PostsList from "./components/PostsList";
import SinglePost from "./components/SinglePost";
import CreatePost from "./pages/CreatePost";
import EditPost from "./components/EditPost";
import { useAuth } from "./context/AuthContext";
import { useTheme } from "./context/ThemeContext";

const Home = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  
  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-amber-50'}`}>
      <div className="max-w-4xl mx-auto px-6 py-16">
        {user ? (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                isDark ? 'bg-cyan-500' : 'bg-amber-500'
              }`}>
                <span className={`font-bold text-lg ${
                  isDark ? 'text-gray-900' : 'text-white'
                }`}>
                  {user.name?.charAt(0) || "U"}
                </span>
              </div>
              <div>
                <h1 className={`text-3xl font-bold mb-1 ${
                  isDark ? 'text-white' : 'text-amber-900'
                }`}>
                  Hey {user.name}!
                </h1>
                <p className={isDark ? 'text-gray-400' : 'text-amber-700'}>
                  What's on your mind today?
                </p>
                <Link to="/create-post" 
                  className={`mt-4 inline-block px-6 py-2 rounded-lg font-medium text-center ${
                  isDark 
                  ? 'bg-gray-700 text-cyan-300 hover:bg-gray-600'
                  : 'bg-amber-500 text-white hover:bg-amber-600'
                   } transition-colors duration-300`}
              >
                  New Post
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-16 text-center">
            <h1 className={`text-4xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-amber-900'
            }`}>
              My Blog
            </h1>
            <p className={`text-lg mb-8 max-w-2xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-amber-800'
            }`}>
              A simple place to share thoughts and stories. No fancy features, just writing.
            </p>
            <Link to="/login"
              className={`inline-block px-6 py-2 rounded-lg font-medium ${
                isDark 
                  ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                  : 'bg-amber-600 text-white hover:bg-amber-700'
              }`}
            >
              Get started
            </Link>
          </div>
        )}
        
        <div>
          <h2 className={`text-2xl font-bold mb-8 ${
            isDark ? 'text-white' : 'text-amber-900'
          }`}>
            Recent posts
          </h2>
          <PostsList />
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
      </Routes>
    </Router>
  );
}

export default App;
