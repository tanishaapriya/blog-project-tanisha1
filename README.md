# My Blog - Full Stack Blog Application

A modern, responsive blog application built with the MERN stack, featuring Google OAuth authentication, dark/light theme support, and a clean, handwritten design aesthetic.


## Features

- **Google OAuth Authentication** - Seamless login with Google accounts
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark/Light Theme** - Toggle between themes with a single click
- **Create & Edit Posts** - Rich text editing with real-time preview
- **Delete Posts** - Secure deletion with confirmation dialogs
- **User Profiles** - Personalized user experience
- **Secure API** - JWT-based authentication and authorization
- **Fast Performance** - Built with Vite for lightning-fast development

## Tech Stack

### Frontend
- **React 19.1.1** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Google OAuth** - Authentication integration

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.1.0** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 8.18.0** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Google Auth Library** - Server-side OAuth verification

## Project Structure

```
blogApp/
├── client/
│   └── blogApp/                 # Frontend React Application
│       ├── src/
│       │   ├── components/      # Reusable UI components
│       │   │   ├── Navbar.jsx
│       │   │   ├── PostsList.jsx
│       │   │   ├── SinglePost.jsx
│       │   │   ├── EditPost.jsx
│       │   │   └── GoogleLoginButton.jsx
│       │   ├── pages/           # Page components
│       │   │   ├── Login.jsx
│       │   │   └── CreatePost.jsx
│       │   ├── context/         # React Context providers
│       │   │   ├── AuthContext.jsx
│       │   │   └── ThemeContext.jsx
│       │   ├── App.jsx          # Main application component
│       │   └── main.jsx         # Application entry point
│       ├── public/              # Static assets
│       ├── package.json
│       └── vite.config.js
└── server/
    └── blog-backend/            # Backend Express Application
        ├── config/
        │   └── db.js            # Database configuration
        ├── middleware/
        │   └── authMiddleware.js # JWT authentication middleware
        ├── model/
        │   ├── User.js          # User data model
        │   └── Post.js          # Post data model
        ├── routes/
        │   ├── authRoutes.js    # Authentication routes
        │   └── postRoutes.js    # Post CRUD routes
        ├── server.js            # Express server setup
        └── package.json
```

## Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud instance)
- **Google OAuth Credentials**

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd blogApp
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd client/blogApp
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../../server/blog-backend
   npm install
   ```

### Environment Setup

1. **Create Backend Environment File**
   ```bash
   cd server/blog-backend
   touch .env
   ```

2. **Add Environment Variables**
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/blogapp
   
   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id_here
   
   # JWT
   JWT_SECRET=your_super_secret_jwt_key_here
   
   # Server
   PORT=4000
   ```

3. **Get Google OAuth Credentials**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add `http://localhost:5173` to authorized origins
   - Copy the Client ID to your `.env` file

### Running the Application

1. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   # Update MONGODB_URI in .env with your Atlas connection string
   ```

2. **Start Backend Server**
   ```bash
   cd server/blog-backend
   npm run dev
   ```
   Server will run on `http://localhost:4000`

3. **Start Frontend Development Server**
   ```bash
   cd client/blogApp
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

4. **Open Application**
   Navigate to `http://localhost:5173` in your browser

## Usage

### Authentication
1. Click "Login" in the navigation bar
2. Sign in with your Google account
3. You'll be redirected to the home page as an authenticated user

### Creating Posts
1. Ensure you're logged in
2. Click "New Post" in the navigation
3. Enter a title and content
4. Click "Publish" to create your post

### Managing Posts
- **View Posts**: All posts are displayed on the home page
- **Read Full Post**: Click "Read more" on any post
- **Edit Post**: Click "Edit" on your own posts
- **Delete Post**: Click "Delete" on your own posts (with confirmation)

### Theme Toggle
- Click the sun/moon icon in the navigation to switch between light and dark themes

## API Endpoints

### Authentication
- `POST /auth/google` - Google OAuth login

### Posts
- `GET /posts` - Get all posts
- `GET /posts/:id` - Get single post
- `POST /posts` - Create new post (authenticated)
- `PUT /posts/:id` - Update post (authenticated + author only)
- `DELETE /posts/:id` - Delete post (authenticated + author only)

## Security Features

- **JWT Authentication** - Secure token-based authentication
- **Authorization Middleware** - Protects routes requiring authentication
- **User Authorization** - Users can only edit/delete their own posts
- **CORS Configuration** - Proper cross-origin request handling
- **Input Validation** - Server-side validation for all inputs

## Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend:
   ```bash
   cd client/blogApp
   npm run build
   ```
2. Deploy the `dist` folder to your hosting service
3. Update API URLs to point to your backend

### Backend (Railway/Heroku)
1. Set environment variables in your hosting platform
2. Deploy the backend code
3. Update frontend API URLs to point to your deployed backend

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas cluster
2. Update `MONGODB_URI` in your backend environment variables
3. Configure network access and database user

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



## Author

**Your Name**
- GitHub:(https://github.com/TanishaPriua)
- LinkedIn:(https://www.linkedin.com/in/chiranjeev-bhatt-89678430a/)

## Acknowledgments

- Google OAuth for seamless authentication
- Tailwind CSS for beautiful styling
- React team for the amazing framework
- MongoDB for flexible data storage
- Express.js for the robust backend framework

## Support

If you have any questions or need help with the application, please:
- Open an issue on GitHub
- Contact me at your.email@example.com

---

**Happy Blogging!**
