import React from 'react'
import { Routes, Route, useLocation } from "react-router-dom";

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










function App() {
  const location = useLocation();
  const hideNavFoot=["/dashboard","/login","/register"].includes(
    location.pathname
  )
  const {blogs}=useAuth()
  console.log(blogs)
  return (
    <div>
      {!hideNavFoot && <Navbar />}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="blogs" element={<Blogs />} />
        <Route exact path="about" element={<About />} />
        <Route exact path="creators" element={<Creators/>} />
        <Route exact path="contact" element={<Contact />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="register" element={<Register />} />
        <Route exact path="dashbord" element={<Dashboard />} />
      </Routes>
      <Toaster/>
      {!hideNavFoot && <Fotter />}
    </div>
  );
}

export default App