import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { NavLink } from "react-router-dom"; // ✅ use NavLink instead of Link
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";

function Navbar() {
  const { user, blogs } = useAuth();
  const [show, setShow] = useState(false);
  console.log(blogs);

  const linkClasses = ({ isActive }) =>
    isActive ? "text-blue-500 font-semibold" : "hover:text-blue-500";

  return (
    <nav className="shadow-lg px-4 py-3">
      <div className="flex item-center justify-between container mx-auto">
        <div className="font-semibold text-xl">
          Blog<span className="text-blue-500">ify</span>
        </div>

        {/* Desktop Navbar */}
        <div className="mx-3">
          <ul className="hidden md:flex space-x-6">
            <NavLink to="/" className={linkClasses}>
              HOME
            </NavLink>
            <NavLink to="/blogs" className={linkClasses}>
              BLOGS
            </NavLink>
            <NavLink to="/creators" className={linkClasses}>
              CREATORS
            </NavLink>
            <NavLink to="/about" className={linkClasses}>
              ABOUT
            </NavLink>
            <NavLink to="/contact" className={linkClasses}>
              CONTACT
            </NavLink>
          </ul>
          <div className="md:hidden" onClick={() => setShow(!show)}>
            {show ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
          </div>
        </div>

        <div className="hidden md:flex space-x-2">
          <NavLink
            to="/dashboard"
            className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded"
          >
            DASHBOARD
          </NavLink>
          <NavLink
            to="/login"
            className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
          >
            LOGIN
          </NavLink>
        </div>
      </div>

      {/* Mobile Navbar */}
      {show && (
        <div>
          <ul className="flex flex-col h-screen items-center justify-center space-y-3 md:hidden">
            <NavLink
              to="/"
              onClick={() => setShow(false)}
              className={linkClasses}
            >
              HOME
            </NavLink>
            <NavLink
              to="/blogs"
              onClick={() => setShow(false)}
              className={linkClasses}
            >
              BLOGS
            </NavLink>
            <NavLink
              to="/creators"
              onClick={() => setShow(false)}
              className={linkClasses}
            >
              CREATORS
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setShow(false)}
              className={linkClasses}
            >
              ABOUT
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setShow(false)}
              className={linkClasses}
            >
              CONTACT
            </NavLink>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
