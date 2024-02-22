import React from "react";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
  const links = [
    {
      text: "Home",
      route: "/",
    },
    {
      text: "About",
      route: "/about",
    },
    {
      text: "Carbon calculation",
      route: "/carbon-calculation",
    },
    {
      text: "Products",
      route: "/products",
    },
    {
      text: "Educational Resources",
      route: "/educational-resources",
    },
    {
      text: "Donation",
      route: "/donations",
    },
    {
      text: "Events",
      route: "/events",
    },
    // {
    //   text: "Contact us",
    //   route: "/contact-us",
    // },
    // {
    //   text: "Feedback",
    //   route: "/feedback",
    // },
    // {
    //   text: "FAQs",
    //   route: "/faqs",
    // },
  ];

  return (
    <div className="flex items-center gap-6">
      {links.map(({ route, text }) => (
        <NavLink
          key={route}
          className={({ isActive }) =>
            isActive
              ? "relative after:absolute after:content-[''] after:-bottom-1 after:left-0 after:bg-white after:w-full after:h-[2px]"
              : "hover:opacity-60"
          }
          to={route}
        >
          {text}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;
