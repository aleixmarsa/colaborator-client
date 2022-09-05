import {
  CalendarIcon,
  ChatIcon,
  ArrowCircleLeftIcon,
  TagIcon,
  HomeIcon,
  BookOpenIcon,
} from "@heroicons/react/outline";

import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function LateralBar(props) {
  const { projectId } = props;
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const navigation = [
    {
      name: "Home",
      icon: HomeIcon,
      href: "#",
      current: false,
      keyLink: { projectId },
      link: `/project/${projectId}`,
    },
    {
      name: "Tasks",
      icon: TagIcon,
      href: "#",
      current: false,
      keyLink: { projectId },
      link: `/project/${projectId}/tasks`,
    },
    {
      name: "Chats",
      icon: ChatIcon,
      href: "#",
      current: false,
      keyLink: { projectId },
      link: `/project/${projectId}/chat`,
    },
    {
      name: "Calendar",
      icon: CalendarIcon,
      href: "#",
      current: false,
      keyLink: { projectId },
      link: `/project/${projectId}/monthCalendar`,
    },
    {
      name: "Projects",
      icon: BookOpenIcon,
      href: "#",
      current: false,
      keyLink: "",
      link: "/",
    },
  ];

  return (
    <div className={`flex flex-col  h-[calc(100vh-64px)] border-r border-gray-200 pb-4 bg-neutral-50 relative ${open ? "w-48" : "w-fit"} duration-300`} >
      <ArrowCircleLeftIcon
        className={`w-8 h-8 bg-neutral-50 text-mainColor absolute -right-4 top-6 rounded-full  cursor-pointer ${!open && "rotate-180"} duration-300`}
        onClick={() => setOpen(!open)}
      />
      <div className="mt-1 flex-grow flex flex-col ">
        <nav className="flex-1 space-y-1" aria-label="Sidebar">
          {navigation.map((item) => (
            <div key={item.name} className="flex flex-row ml-2 mt-2">
              <NavLink
                to={`${item.link}`}
                className={() =>
                  [`${item.link}`].includes(pathname)
                    ? "flex flex-col px-3 py-2 mx-1 text-md font-medium text-buttonHover bg-neutral-50 hover:text-buttonHover"
                    : "flex flex-col px-3 py-2 mx-1 text-md font-medium text-mainColor bg-neutral-50 hover:text-buttonHover"
                }
              >
                <item.icon
                  className="hover:text-buttonHover text-left
                   flex-shrink-0 h-6 w-6"
                  aria-hidden="true"
                />
              </NavLink>
             <NavLink
                to={`${item.link}`}
                className={() =>
                  [`${item.link}`].includes(pathname)
                    ? `flex flex-col pr-3 py-2 mx-1 text-md font-medium text-buttonHover bg-neutral-50 hover:text-buttonHover ${!open && "hidden"} duration-300`
                    : `flex  flex-col pr-3 py-2 mx-1 text-md font-medium text-mainColor bg-neutral-50 hover:text-buttonHover ${!open && "hidden"} duration-300`
                }
              >
                <span className="hover:text-buttonHover text-left">
                  {item.name}
                </span>
              </NavLink>
              
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default LateralBar;
