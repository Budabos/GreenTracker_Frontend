import { useAuth } from "@/providers/AuthProvider";
import { LogOut, MoveRight, User, UserCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../greentrackrlogo.png";
import NavLinks from "./NavLinks";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const { pathname } = useLocation();
  const { userCred, logout, getUser } = useAuth();
  const user = getUser();

  const excludes = ["/login", "/signup"];

  if (excludes.includes(pathname)) return;

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
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={user.image_url} />
              <AvatarFallback className="text-black">
                {user.first_name.charAt(0)}
                {user.last_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link className="flex items-center" to={"/profile"}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
