import jwt from "jsonwebtoken";
// import {user} from ".models/User.model.js"
import { User } from "../models/user.model.js";

const createTokenAndSaveCookies = async(userId,res)=>{
    const token =jwt.sign({userId},process.env.JWT_SECRET_KEY,{
      expiresIn:"7d"
    })
    // res.cookie("jwt", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "lax", // csrf
    // });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false, // ✅ for local dev
      sameSite: "lax", // ✅ allows cross-origin cookies
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    await User.findByIdAndUpdate(userId,{token})
return token;
}

export default createTokenAndSaveCookies;