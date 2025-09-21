import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createBlog = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "blog image  is required" });
    }
    const { blogImage} = req.files;
    const allowedformat = /jpg|jpeg|png/;
    if (!allowedformat.test(blogImage.mimetype)) {
      return res
        .status(400)
        .json({ message: "please upload jpg|jpeg|png format" });
    }
    const { title,category,about} = req.body;
    // if(!email || !name || !password || !phone || !education || ! role || !photo){
    //     return res.status(400).json({message:"please fill required fields"})
    // }
    // validate required fields
    if (!title) return res.status(400).json({ message: "title is required" });
    if (!category) return res.status(400).json({ message: "category is required" });
    if (!about)return res.status(400).json({ message: "about is required" });
    
    const  adminName=req?.user?.name;
    const adminPhoto=req?.user?.photo;
    const createdBy=req?.user?._id;


    let cloudinaryResponse;
    try {
      cloudinaryResponse = await cloudinary.uploader.upload(
        blogImage.tempFilePath
    );
    } catch (err) {
      console.error("Cloudinary Upload Error:", err);
      return res
        .status(500)
        .json({ message: err.message || "Photo upload failed" });
    }
   
    const blogData = ({
      title,
      about,
      category,
      adminName,
      adminPhoto,
      createdBy,
      blogImage:{
        public_id:cloudinaryResponse.public_id,
        url:cloudinaryResponse.url,
      },
    });
    const blog= await Blog.create(blogData);
    

      res.status(201).json({
          message: "blog created successfully",
          blog,
          
        });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal sever error " });
  }
};

export const  deleteBlog= async(req,res)=>{
  const {id}=req.params;
  const blog=await Blog.findById(id);
  if(!blog){
    return res.status(404).json({message:"Blog not found"})
  }
  await blog.deleteOne();
  res.status(200).json({message:"Blog deleted sucessfully"})
}
export const getAllBlogs = async(req,res)=>{
  const allBlogs=await Blog.find();
  res.status(200).json(allBlogs);
}
export const getSingBlogs = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "invalid id" });
  }
  const blog = await Blog.findById();
  if (!blog) {
    return res.status(404).json({ message: "blog not found" });
  }
  res.status(200).json(blog);
};

export const getMyBlogs = async(req,res)=>{
  const createdBy =req.user._id;
  const myBlogs = await Blog.find({createdBy});
  res.status(200).json(myBlogs)
}
export const updateBlog = async(req,res)=>{
  const {id}=req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({message:"invalid blog id"});
  }
  const updateBlog=await Blog.findByIdAndUpdate(id,req.body,{new:true})
  if(!updateBlog){
    return res.status(404).json({message:"blog not found"})
  }
  res.status(200).json(updateBlog);
}