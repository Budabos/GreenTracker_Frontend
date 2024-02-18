import { MoveRight, UserCircle } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import logo from "../../greentrackrlogo.png";
import { useAuth } from "@/providers/AuthProvider";

const Navbar = () => {
  const { pathname } = useLocation();
  const { userCred } = useAuth();

  if (pathname === "/login" || pathname === "/signup") return;

  return (
    <div className="flex items-center justify-between py-4 px-6 bg-[#245501] text-white font-bold">
      <Link to="/">
        <img
          src={logo}
          alt="GreenTrackr Logo"
          className="w-16 h-16 mr-2"
          style={{ height: "12vh", width: "12vh" }}
        />
      </Link>
      {/* <Logo /> */}
      <NavLinks />
      {userCred ? (
        <UserCircle className="h-8 w-8" />
      ) : (
        <div className="flex items-center gap-4">
          <Button asChild>
            <Link to={"/signup"}>
              <MoveRight className="mr-2 h-4 w-4" /> Get started{" "}
            </Link>
          </Button>
          <Button variant={"ghost"}>
            <Link to={"/login"}>Login</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
