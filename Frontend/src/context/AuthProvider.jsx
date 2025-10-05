import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // This will automatically send the HttpOnly cookie "jwt"
        const { data } = await axios.get(
          "http://localhost:4001/api/users/myprofile",
          { withCredentials: true }
        );

        console.log("Profile response:", data);

        // adjust if backend sends { user: {...} }
        setProfile(data.user || data);
        setIsAuthenticated(true);
      } catch (error) {
        console.log("Profile fetch error:", error);
        setProfile(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4001/api/blogs/all-blogs"
        );
        console.log("Blogs:", data);
        setBlogs(data);
      } catch (error) {
        console.log("Blogs fetch error:", error);
      }
    };

    fetchBlogs();
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
