import ChangePasswordForm from "@/components/ChangePasswordForm";
import { useAuth } from "@/providers/AuthProvider";
import { User } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { getUser, userCred } = useAuth();
  const user = getUser();
  const navigate = useNavigate();

  if (!user || !userCred) {
    navigate("/login");
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      {user && (
        <div className="cursor-pointer">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">User Information</h2>

            {/* <div className="flex flex-col items-center justify-center">
              {user.image_url ? (
                <img src={user.image_url} className="" />
              ) : (
                <User className="w-24 h-24" />
              )}

              <ul className="flex flex-col mt-8 text-xl">
                <li>
                  <span className="text-2xl">Name</span> : {user.first_name}{" "}
                  {user.last_name}
                </li>
                <li>
                  <span className="text-2xl">Email:</span> {user.email}
                </li>
                <li>
                  <span className="text-2xl">Phone:</span> {user.phone}
                </li>
                <li>
                  <span className="text-2xl">Interests:</span> {user.interests}
                </li>
                <li>
                  <span className="text-2xl">Age:</span> {user.age}
                </li>
              </ul>
            </div> */}

            <h2 className="text-xl font-bold mb-2">Change password</h2>
            <ChangePasswordForm/>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
