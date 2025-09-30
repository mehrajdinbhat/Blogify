import express from "express"
import dotenv from "dotenv";
import mongoose from "mongoose";


import userRoute from "./routes/User.route.js";
import blogRoute from "./routes/blog.route.js";

import fileUpload from "express-fileupload";
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express()
dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL=process.env.MONGO_URI;
// console.log(MONGO_URL)

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true })); 

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
}))



    //  database connection 
try {
    mongoose.connect(MONGO_URL);
    console.log("connected to mongoDB")
} catch (error) {
    console.log("could not connect to mongodb")
}



 // defining routes 
app.use("/api/users",userRoute)
app.use("/api/blogs",blogRoute)




// cloudinary  configuration
cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_SECRET_KEY     // Click 'View API Keys' above to copy your API secret
    });

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(PORT, () => {
  console.log(`Server is running  on port ${PORT}...`)
})
