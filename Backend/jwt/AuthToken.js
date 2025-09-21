import jwt from "jsonwebtoken";
// import {user} from ".models/User.model.js"
import { User } from "../models/user.model.js";

const createTokenAndSaveCookies = async(userId,res)=>{
    const token =jwt.sign({userId},process.env.JWT_SECRET_KEY,{
      expiresIn:"7d"
    })
    res.cookie("jwt",token,{
        httponly:true,
        secure:true,
        sameSite:"strict"// csrf
    })
    await User.findByIdAndUpdate(userId,{token})
return token;
}

export default createTokenAndSaveCookies;