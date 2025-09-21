import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import createTokenAndSaveCookies from "../jwt/AuthToken.js";
import bcrypt from "bcrypt";
import { json } from "express";

export const register = async (req, res) => {
  try {
    // console.log("hello , i am register method")
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "photo is required" });
    }
    const { photo } = req.files;
    const allowedformat = /jpg|jpeg|png/;
    if (!allowedformat.test(photo.mimetype)) {
      return res
        .status(400)
        .json({ message: "please upload jpg|jpeg|png format" });
    }
    const { name, email, password, role, phone, education } = req.body;
    // if(!email || !name || !password || !phone || !education || ! role || !photo){
    //     return res.status(400).json({message:"please fill required fields"})
    // }
    // validate required fields
    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password)
      return res.status(400).json({ message: "Password is required" });
    if (!phone)
      return res.status(400).json({ message: "Phone number is required" });
    if (!education)
      return res.status(400).json({ message: "Education is required" });
    if (!role) return res.status(400).json({ message: "Role is required" });
    if (!photo) return res.status(400).json({ message: "Photo is required" });

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already exists" });
    }

    let cloudinaryResponse;
    try {
      cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);
    } catch (err) {
      console.error("Cloudinary Upload Error:", err);
      return res
        .status(500)
        .json({ message: err.message || "Photo upload failed" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      education,
      photo: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    });
    await newUser.save();
    if (newUser) {
      const token = await createTokenAndSaveCookies(newUser._id, res);
      console.log("register",token)
      res
        .status(201)
        .json({
          message: "user registered successfully",
          newUser,
          token: token,
        });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal sever error " });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (!email || !password || !role) {
      return res.status(400).json({ message: "please fill required fields" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user.password) {
      return res.status(400).json({ message: "User password is missing" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ message: "Invaild email of password" });
    }
    if (user.role !== role) {
      return res.status(400).json({ message: `given role ${role} not found` });
    }
    const token = await createTokenAndSaveCookies(user._id, res);
    console.log("login",token)
    res.status(200).json({
      message: "User logged in succesfully",
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export const logout = async (req, res )=>{
    try {  
         res.clearCookie("jwt",{httponly:true});
         res.status(200).json({message:"User logged out Succesfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Insternal serverr error"})
    }
}

export const getMyProfile=async(req,res)=>{
  const user=await req.user;
  res.status(200).json(user)
};

export const getAllAdmins=async(req,res)=>{
  const admins= await User.find({role:"admin"});
  res.status(200).json(admins)
}
