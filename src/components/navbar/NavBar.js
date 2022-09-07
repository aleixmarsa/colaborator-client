import { Fragment, useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuAlt1Icon, XIcon } from "@heroicons/react/outline";
import { AuthContext } from "../../context/auth.context";
import { MessageAlertContext } from "../../context/messageAlert.context";

import Avatar from "react-avatar";
import SearchMenu from "../menus/SearchMenu";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavBar = (props) => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [messageAlert] = useContext(MessageAlertContext);

  const userNavigation = [
    { name: "Your Profile", action: "/profile", state: "disabled" },
    { name: "Log out", action: logOutUser, state: "" },
  ];

  const { filterProjects } = props;
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    filterProjects(e.target.value);
  };

  let location = useLocation();

  return (
    <Disclosure as="nav" className="flex-shrink-0 bg-mainColor">
      {({ open }) => (
        <>
          <div className="max-w-9xl mx-auto px-3 sm:px-4 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              {/* Logo section */}
              <div className="flex items-center lg:px-0 xl:w-64">
                <img
                  className=" w-32 xl:w-52"
                  src="/images/logo.png"
                  alt=""
                ></img>
              </div>
              {location.pathname === "/projects" ? (
                <SearchMenu
                  location={location}
                  search={search}
                  handleSearch={handleSearch}
                />
              ) : (
                <></>
              )}
              <div className="flex lg:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-buttonHover hover:text-white hover:secondaryButton focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondaryColor focus:ring-white">
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
              <div className="hidden lg:block lg:w-80">
                {isLoggedIn ? (
                  <div className="flex items-center justify-end">
                    <div className="flex">
                      <NavLink
                        to="/projects"
                        className={({ isActive }) =>
                          isActive
                            ? "px-3 py-2 mx-1 text-md font-small text-buttonHover bg-mainColor hover:text-buttonHover"
                            : "px-3 py-2 mx-1 text-md font-small text-white bg-mainColor hover:text-buttonHover"
                        }
                      >
                        <span className="hover:text-buttonHover">PROJECTS</span>
                      </NavLink>

                      <div className=" relative py-2">
                        {messageAlert.length ? (
                          <span className="flex h-3 w-3 absolute right-1">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                          </span>
                        ) : (
                          <></>
                        )}
                        <NavLink
                          to="/chat"
                          className={({ isActive }) =>
                            isActive
                              ? "px-3 py-2 mx-1 text-md font-small text-buttonHover bg-mainColor hover:text-buttonHover"
                              : "px-3 py-2 mx-1 text-md font-small text-white bg-mainColor hover:text-buttonHover"
                          }
                        >
                          <span className="hover:text-buttonHover">CHAT</span>
                        </NavLink>
                      </div>
                    </div>
                    <Menu as="div" className="ml-4 relative flex-shrink-0 z-10">
                      <div>
                        <Menu.Button className="bg-mainColor flex text-sm rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-mainColor focus:ring-secondaryColor">
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
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg  bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <NavLink
                                to="/profile"
                                className={classNames(
                                  active ? "bg-gray-100 " : "",
                                  "block w-full px-4 py-2 text-sm cursor-pointer rounded-md  text-gray-700 hover:text-buttonHover hover:bg-mainColor"
                                )}
                              >
                                Your Profile
                              </NavLink>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={logOutUser}
                                className={classNames(
                                  active ? "bg-gray-100 " : "",
                                  "block w-full px-4 py-2 text-sm cursor-pointer rounded-md  text-gray-700 hover:text-buttonHover hover:bg-mainColor"
                                )}
                              >
                                Log Out
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                ) : (
                  <div className="flex items-center justify-end">
                    <div className="flex">
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          isActive
                            ? "px-3 py-2 mx-1 text-md font-small text-buttonHover bg-mainColor hover:text-buttonHover"
                            : "px-3 py-2 mx-1 text-md font-small hover:text-buttonHover text-white bg-mainColor "
                        }
                      >
                        <span className="hover:text-buttonHover">HOME</span>
                      </NavLink>
                      <NavLink
                        to="/login"
                        className={({ isActive }) =>
                          isActive
                            ? "px-3 py-2 mx-1 text-md font-small text-buttonHover bg-mainColor hover:text-buttonHover"
                            : "px-3 py-2 mx-1 text-md font-small hover:text-buttonHover text-white bg-mainColor "
                        }
                      >
                        <span className="hover:text-buttonHover">LOG IN</span>
                      </NavLink>
                      <NavLink
                        to="/signup"
                        className={({ isActive }) =>
                          isActive
                            ? "px-3 py-2 mx-1 rounded-md text-md font-small text-mainColor bg-buttonOrange hover: hover:text-mainColor"
                            : "px-3 py-2 mx-1 rounded-md text-md font-small text-white bg-buttonOrange hover:bg-buttonOrange-low hover:text-mainColor"
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
                  href="/projects"
                  className={classNames(
                    location.pathname === "/projects"
                      ? "text-buttonOrange bg-mainColor hover:text-buttonOrange"
                      : "text-white hover:text-white hover:bg-secondaryColor",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                >
                  PROJECTS
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/chat"
                  className={classNames(
                    location.pathname === "/global-calendar"
                      ? "text-buttonOrange bg-secondaryColor"
                      : "text-white hover:bg-secondaryColor",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                >
                  CHAT
                </Disclosure.Button>
              </div>
              <div className="pt-4 pb-3 border-t border-mainColor">
                <div className="px-2 space-y-1">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      onClick={item.action}
                      className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-secondaryColor"
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
                    location.pathname === "/"
                      ? "text-buttonOrange bg-mainColor hover:text-buttonOrange"
                      : "text-white hover:text-white hover:bg-secondaryColor",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                >
                  HOME
                </Disclosure.Button>
                <Disclosure.Button
                  data-test-id="login-button"
                  as="a"
                  href="/login"
                  className={classNames(
                    location.pathname === "/login"
                      ? "text-buttonOrange bg-mainColor hover:text-buttonOrange"
                      : "text-white hover:text-white hover:bg-secondaryColor",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                >
                  LOG IN
                </Disclosure.Button>
                <Disclosure.Button
                  data-test-id="logout-button"
                  as="a"
                  href="/signup"
                  className={classNames(
                    location.pathname === "/signup"
                      ? "text-buttonOrange bg-mainColor hover:text-buttonOrange"
                      : "text-white hover:text-white hover:bg-secondaryColor",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
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
