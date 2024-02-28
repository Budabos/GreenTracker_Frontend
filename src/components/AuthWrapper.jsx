import { useAuth } from "@/providers/AuthProvider";  // Import the useAuth hook from the AuthProvider
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

// Define AuthWrapper component
const AuthWrapper = () => {
  // Destructure the getUser function from useAuth hook
  const { getUser } = useAuth();
  // Get the user object using getUser function
  const user = getUser();
  // Initialize navigate function from useNavigate hook
  const navigate = useNavigate();

  // Effect hook to redirect user if not an admin
  useEffect(() => {
    // Check if user is not an admin
    if (user?.role !== "admin") {
      // Redirect to home page if not an admin
      navigate("/");
    }
  }, [user, navigate]);  // Depend on user and navigate

  // Render Sidebar and Outlet components
  return (
    <div className="flex">
      {/* Render Sidebar component */}
      <Sidebar />
      <div className="flex-1 ml-32">
        {/* Render child routes */}
        <Outlet />
      </div>
    </div>
  );
};
// Export AuthWrapper component
export default AuthWrapper;
