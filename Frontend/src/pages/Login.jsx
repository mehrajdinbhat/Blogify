import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const { isAuthenticated,setIsAuthenticated,setProfile } =useAuth();
  const navigateTo = useNavigate();
  const [role, setRole] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!role || !email || !password) {
      toast.error("Please Fill All The Fields");
    }

    try {  
      const { data } = await axios.post(
        "http://localhost:4001/api/users/Login",
        { role, email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
      toast.success("User Logind Successfully");
      setProfile(data.user || data);
      setIsAuthenticated(true);

      setEmail("");
      setPassword("");
      setRole("");
      navigateTo("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "please fill the required fields");
    }
  };
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="w-full max-w-md bg-white shawdow-md rounded-lg p-8">
          <form action="" onSubmit={handleLogin}>
            <div className="font-semibold text-xl item-center text-center">
              Blog<span className="text-blue-500">ify</span>
            </div>
            <h1 className="text-xl font-semibold mb-2">Login</h1>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className=" w-full p-2 mb-4 border  rounded-md"
            >
              <option value="">Select Role</option>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>

            <div className="mb-4">
              <input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <p className="text-center mb-4">
              New User? <Link to="/register"className="text-blue-600">Register Now </Link>
            </p>
            <button
              type="submit"
              className="w-full p-1 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
