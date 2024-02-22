import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const sidebarLinks = [
    {
      text: "Dashboard",
      link: "/dashboard",
    },
    {
      text: "Events",
      link: "/dashboard/events",
    },
    {
      text: "Products",
      link: "/dashboard/products",
    },
    {
      text: "Users",
      link: "/dashboard/users",
    },
    {
      text: "Bookings",
      link: "/dashboard/bookings",
    },
  ];

  return (
    <div className="h-[83.5dvh] bg-[#245501] pl-10 pr-16 pt-10">
      <div className="flex flex-col font-bold text-lg *:py-2 *:pr-16 *:px-4 *:rounded">
        {sidebarLinks.map(({ text, link }) => (
          <NavLink
            to={link}
            className={({ isActive }) =>
              isActive ? "bg-white text-[#245501]" : " text-white"
            }
            end
          >
            {text}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
