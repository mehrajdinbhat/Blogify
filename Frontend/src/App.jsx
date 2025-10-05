import React from 'react'
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Navbar from '../src/components/Navbar'
import Home from '../src/components/Home.jsx'
import Creators from '../src/pages/Creators.jsx';
import Blogs from '../src/pages/Blogs';
import About from '../src/pages/About.jsx';
import Contact from '../src/pages/Contact.jsx';
import Login  from '../src/pages/Login.jsx';
import Register from '../src/pages/Register.jsx';
import Dashboard from '../src/pages/Dashboard.jsx';
import Fotter from '../src/components/Fotter.jsx'
import { useAuth } from './context/AuthProvider.jsx';
import { Toaster } from "react-hot-toast";
import UpdateBlog from './dashboard/UpdateBlog.jsx';
import Detail from './pages/Detail.jsx';
import Notfound from './pages/Notfound.jsx';










function App() {
  const location = useLocation();
  const hideNavFoot=["/dashboard","/login","/register"].includes(
    location.pathname
  )
  const {blogs,isAuthenticated}=useAuth()
  console.log(blogs)
  console.log(isAuthenticated)
  return (
    <div>
      {!hideNavFoot && <Navbar />}

      <Routes>
        <Route exact path="/" element={isAuthenticated===true?<Home />:<Navigate to={"/login"}/>} />
        <Route exact path="blogs" element={<Blogs />} />
        <Route exact path="about" element={<About />} />
        <Route exact path="creators" element={<Creators />} />
        <Route exact path="contact" element={<Contact />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="register" element={<Register />} />
        <Route exact path="dashboard" element={<Dashboard />} />

        <Route path="blog/:id" element={<Detail/>} />  
        <Route path="/blog/update/:id" element={<UpdateBlog />} />

        {/* universal route for 404 not found page */}
        <Route path="*" element={<Notfound/>} />
      </Routes>
      <Toaster />
      {!hideNavFoot && <Fotter />}
    </div>
  );
}

export default App