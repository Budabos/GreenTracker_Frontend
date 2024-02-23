import {
  BookDashed,
  CalendarCheck,
  CalendarSearch,
  ChevronFirst,
  LayoutDashboard,
  PackageSearch,
  Users,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  const sidebarLinks = [
    {
      text: "Dashboard",
      link: "/dashboard",
      icon: <LayoutDashboard className="h-6 w-6" />,
    },
    {
      text: "Events",
      link: "/dashboard/events",
      icon: <CalendarSearch className="h-6 w-6" />,
    },
    {
      text: "Products",
      link: "/dashboard/products",
      icon: <PackageSearch className="h-6 w-6" />,
    },
    {
      text: "Users",
      link: "/dashboard/users",
      icon: <Users className="h-6 w-6" />,
    },
    {
      text: "Bookings",
      link: "/dashboard/bookings",
      icon: <CalendarCheck className="h-6 w-6" />,
    },
  ];

  return (
    <div className="h-screen bg-[#245501] pl-10 pr-16 pt-10">
      <div className="flex items-center justify-end">
        <Button
          onClick={() => setExpanded((prev) => !prev)}
          size="icon"
          variant="outline"
        >
          <ChevronFirst
            className={`h-6 w-6 transition-all duration-1000 ${
              expanded ? "rotate-0" : "rotate-180"
            }`}
          />
        </Button>
      </div>
      <div>
        {sidebarLinks.map(({ text, link, icon }) => (
          <TooltipProvider key={link}>
            <Tooltip>
              <TooltipTrigger className="mt-6 flex flex-col font-bold text-lg *:p-2 *:rounded *:flex *:items-center *:transition-colors *:duration-300">
                <NavLink
                  to={link}
                  className={({ isActive }) =>
                    isActive ? "bg-white text-[#245501]" : " text-white"
                  }
                  end
                >
                  {icon}
                  <span
                    className={`overflow-hidden transition-all ${
                      expanded ? "pr-16 ml-2" : "w-0 p-0"
                    } `}
                  >
                    {text}
                  </span>
                </NavLink>
              </TooltipTrigger>
              {!expanded && (
                <TooltipContent>
                  <p>{text}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
