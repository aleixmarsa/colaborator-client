import { Fragment, useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { SearchIcon, UserCircleIcon } from "@heroicons/react/solid";
import { MenuAlt1Icon, XIcon } from "@heroicons/react/outline";
import icon from "../../assets/icon.png";
import { AuthContext } from "../../context/auth.context";
import Avatar from "react-avatar";
import SearchMenu from "../menus/SearchMenu";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavBar = (props) => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const userNavigation = [
    { name: "Your Profile", action: "#" },
    { name: "Sign out", action: logOutUser },
  ];
  const { filterProjects } = props;
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    props.filterProjects(e.target.value);
  };
  let location = useLocation();

  return (
    <Disclosure as="nav" className="flex-shrink-0 bg-green-700">
      {({ open }) => (
        <>
          <div className="max-w-9xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              {/* Logo section */}
              <div className="flex items-center px-2 lg:px-0 xl:w-64">
                <div className="flex-shrink-0">
                  <img className="h-8 w-auto" src={icon} alt="Erlenmeyer" />
                </div>
                <h1 className="ml-3 text-3xl font-small text-white">
                  co<span className="font-extrabold">lab</span>orator
                </h1>
              </div>
              <SearchMenu
                location={location}
                search={search}
                handleSearch={handleSearch}
              />
              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-green-600 inline-flex items-center justify-center p-2 rounded-md text-green-400 hover:text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-600 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuAlt1Icon
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              {/* Links section */}´
              <div className="hidden lg:block lg:w-80">
                {isLoggedIn ? (
                  <div className="flex items-center justify-end">
                    <div className="flex">
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          isActive
                            ? "px-3 py-2 rounded-md text-md font-medium text-white bg-green-600 hover:text-white"
                            : "px-3 py-2 rounded-md text-md font-medium text-white hover:text-e-100 hover:bg-green-600"
                        }
                      >
                        PROJECTS  
                      </NavLink>
                      <span className="px-3 py-2 rounded-md text-md font-medium text-white bg-green-700 ">|</span>
                      <NavLink
                        to="/monthCalendar"
                        className={({ isActive }) =>
                          isActive
                            ? "px-3 py-2 rounded-md text-md font-medium text-white bg-green-600 hover:text-white"
                            : "px-3 py-2 rounded-md text-md font-medium text-white hover:text-e-100 hover:bg-green-600"
                        }
                      >
                        CALENDAR
                      </NavLink>
                      <span className="px-3 py-2 rounded-md text-md font-medium text-white bg-green-700 ">|</span>
                      <NavLink
                        to="/chat"
                        className={({ isActive }) =>
                          isActive
                          ? "px-3 py-2 rounded-md text-md font-medium text-white bg-green-600 hover:text-white"
                          : "px-3 py-2 rounded-md text-md font-medium text-white hover:text-e-100 hover:bg-green-600"
                        }
                      >
                        CHAT
                      </NavLink>
                    </div>
                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-4 relative flex-shrink-0 z-10">
                      <div>
                        <Menu.Button className="bg-green-700 flex text-sm rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <Avatar
                            round
                            size="35"
                            // color="gray"
                            textSizeRatio={1.9}
                            name={user.name}
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <button
                                  onClick={item.action}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block w-full px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </button>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                ) : (
                  <div className="flex items-center justify-end">
                    <div className="flex">
                      <NavLink
                        to="/login"
                        className={({ isActive }) =>
                          isActive
                            ? "px-3 py-2 rounded-md text-sm font-small text-white bg-green-700 hover:text-white"
                            : "px-3 py-2 rounded-md text-sm font-small text-green-200 hover:text-e-100 hover:bg-green-600"
                        }
                      >
                        LOG IN
                      </NavLink>
                      <NavLink
                        to="/signup"
                        className={({ isActive }) =>
                          isActive
                            ? "px-3 py-2 rounded-md text-sm font-small text-white bg-green-700 hover:text-white"
                            : "px-3 py-2 rounded-md text-sm font-small text-green-200 hover:text-e-100 hover:bg-green-600"
                        }
                      >
                        SIGN UP
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {isLoggedIn ? (
            <Disclosure.Panel className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Disclosure.Button
                  as="a"
                  href="/"
                  className={classNames(
                    location.pathname === "/"
                      ? "text-white bg-green-700"
                      : "text-green-200 hover:text-green-100 hover:bg-green-600",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  // aria-current={item.current ? "page" : undefined}
                >
                  PROJECTS
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/global-calendar"
                  className={classNames(
                    location.pathname === "/global-calendar"
                      ? "text-white bg-green-700"
                      : "text-green-200 hover:text-green-100 hover:bg-green-600",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  // aria-current={item.current ? "page" : undefined}
                >
                  CALENDAR
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/chat"
                  className={classNames(
                    location.pathname === "/global-calendar"
                      ? "text-white bg-green-700"
                      : "text-green-200 hover:text-green-100 hover:bg-green-600",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  // aria-current={item.current ? "page" : undefined}
                >
                  CHAT
                </Disclosure.Button>
              </div>
              <div className="pt-4 pb-3 border-t border-green-800">
                <div className="px-2 space-y-1">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      onClick={item.action}
                      className="block px-3 py-2 rounded-md text-base font-medium text-green-200 hover:text-green-100 hover:bg-green-600"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          ) : (
            <Disclosure.Panel className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Disclosure.Button
                  as="a"
                  href="/"
                  className={classNames(
                    location.pathname === "/login"
                      ? "text-white bg-green-700"
                      : "text-green-200 hover:text-green-100 hover:bg-green-600",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  // aria-current={item.current ? "page" : undefined}
                >
                  LOG IN
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/global-calendar"
                  className={classNames(
                    location.pathname === "/signup"
                      ? "text-white bg-green-700"
                      : "text-green-200 hover:text-green-100 hover:bg-green-600",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  // aria-current={item.current ? "page" : undefined}
                >
                  SIGN UP
                </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          )}
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
