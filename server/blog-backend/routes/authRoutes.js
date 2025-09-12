import express from "express";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../model/User.js";

const router = express.Router();
const client  = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google" , async (req,res)=>{
    try{
      const {token}  = req.body;
       console.log("Incoming token:", token); 
       console.log("ENV GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      console.log("Google Payload:", payload);
      const { sub, name, given_name, family_name, email, picture } = payload;
      
      const fullName =
      name || [given_name, family_name].filter(Boolean).join(" ").trim();

    if (!fullName) {
      return res
        .status(400)
        .json({ message: "Google account has no name info" });
    }

      let user  = await User.findOne({googleId : sub});
      if(!user){
        user = await User.create({
            googleId: sub,
            name : fullName,
            email,
            picture,
        });
    }
    
    const appToken = jwt.sign({
        id : user._id , 
        email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn : '1d'}
);
    
    res.json({
        message : "login successfull",
        token : appToken,
        user,
    });


 }catch (error) {
    console.error("Google auth error:", error.message);
    res.status(401).json({ message: error.message });
  }
});

export default router;