import { useAuth } from "@/providers/AuthProvider";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const AuthWrapper = () => {
  const { getUser } = useAuth();
  const user = getUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default AuthWrapper;
