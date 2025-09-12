import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";


dotenv.config();
// console.log(process.env.GOOGLE_CLIENT_ID);
connectDB();
const app  = express();

app.use(express.json());

// app.use(express.json());
app.use(cors(
  {
    origin: [
      'https://blog-app-sigma-gold.vercel.app',
      'http://localhost:4000',
      'http://localhost:5173'
    ],
    credentials: true
  }

));
app.use("/likes", likeRoutes);
app.use("/comments", commentRoutes);


app.use("/auth" , authRoutes);
app.use("/posts", postRoutes);
app.get("/" , (req,res)=>{
    res.send("backend is running ");
});

// Export the app for Vercel serverless
export default app;

// Local dev server
if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT|| 4000;
  app.listen(PORT , () => {
    console.log(`server is running on ${PORT}`);
  });
}
