
// import React from 'react'     
// import { useAuth } from '../context/AuthProvider.jsx';
// import Sidebar from '../dashboard/Sidebar.jsx';
// function Dashboard() {
//   const { profile, isAuthenticated } = useAuth();
//   console.log(profile);
//   console.log(isAuthenticated);

//   if (!isAuthenticated) {
//     return <div>Loading or Not Authenticated...</div>;
//   }

//   return (
//     <div>
//       <Sidebar />
//       <div>Dashboard Content</div>
//     </div>
//   );
// }

// export default Dashboard;
    

import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Sidebar from "../dashboard/Sidebar";
import MyProfile from "../dashboard/MyProfile";
import MyBlogs from "../dashboard/MyBlogs";
import CreateBlog from "../dashboard/CreateBlogs";
import Queries from "../dashboard/Queries";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const { profile, isAuthenticated, loading } = useAuth();
  const [component, setComponent] = useState("My Blogs");

  console.log(profile);
  console.log(isAuthenticated);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <Sidebar component={component} setComponent={setComponent} />
      {component === "My Profile" ? (
        <MyProfile />
      ) : component === "Create Blog" ? (
        <CreateBlog />
      ) : component === "Queries" ? (
        <Queries />
      ) : (
        <MyBlogs />
      )}
    </div>
  );
}

export default Dashboard;
