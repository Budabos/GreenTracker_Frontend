import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../greentrackrlogo.png";

const Footer = () => {
  const { pathname } = useLocation();
  const excludes = ["/login", "/signup", "/forgot-password", "/reset", '/dashboard'];

  if (excludes.some((excludePath) => pathname.startsWith(excludePath))) return;

  return (
    <footer className="text-white py-8" style={{ backgroundColor: "#245501" }}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="flex items-center mb-4 md:mb-0">
          <img
            src={logo}
            alt="GreenTrackr Logo"
            className="w-16 h-16 mr-2"
            style={{ height: "22vh", width: "20vh" }}
          />
        </div>
        {/* Social Icons */}
        <div className="flex space-x-4">
          <Link to="#" className="text-white hover:text-gray-400">
            <i className="fab fa-instagram fa-lg"></i>
          </Link>
          <a href="#" className="text-white hover:text-gray-400">
            <i className="fab fa-facebook fa-lg"></i>
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <i className="fab fa-linkedin fa-lg"></i>
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <i className="fab fa-whatsapp fa-lg"></i>
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <i className="fab fa-youtube fa-lg"></i>
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <i className="fab fa-twitter fa-lg"></i>
          </a>
        </div>
        {/* Additional Content */}
        <div className="text-center md:text-left mt-4 md:mt-0">
          <p className="mb-2">Stay Connected:</p>
          <div className="flex space-x-4">
            <NavLink to={"/contact-us"}>Contact us</NavLink>
            <NavLink to={"/feedback"}>Feedback</NavLink>
            <NavLink to={"/faqs"}>Faqs</NavLink>
            <a
              href="#"
              className="text-white hover:text-gray-400"
              title="Privacy Policy"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-white hover:text-gray-400"
              title="Terms and Conditions"
            >
              Terms
            </a>
          </div>
          <div className="mt-4">
            <p className="text-sm">
              For support or inquiries, email us at{" "}
              <a
                href="mailto:support@greentrackr.com"
                className="text-green-300"
              >
                support@greentrackr.com
              </a>
            </p>
          </div>
        </div>
        {/* Copyright Statement */}
        <div className="text-center md:text-right mt-4 md:mt-0">
          <p>
            &copy; {new Date().getFullYear()} All Rights Reserved{" "}
            <a href="#" className="text-green-300 ml-1">
              GreenTrackr
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
