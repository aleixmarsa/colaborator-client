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
    <Disclosure as="nav" className="flex-shrink-0 bg-lime-600">
      {({ open }) => (
        <>
          <div className="max-w-9xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              {/* Logo section */}
              <div className="flex items-center px-2 lg:px-0 xl:w-64">
                <div className="flex-shrink-0">
                  <img className="h-8 w-auto" src={icon} alt="Workflow" />
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
                <Disclosure.Button className="bg-lime-600 inline-flex items-center justify-center p-2 rounded-md text-lime-400 hover:text-white hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-lime-600 focus:ring-white">
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
              {isLoggedIn ? (
                <div className="hidden lg:block lg:w-80">
                  <div className="flex items-center justify-end">
                    <div className="flex">
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          isActive
                            ? "px-3 py-2 rounded-md text-sm font-small text-white bg-lime-700 hover:text-white"
                            : "px-3 py-2 rounded-md text-sm font-small text-lime-200 hover:text-e-100 hover:bg-lime-600"
                        }
                      >
                        PROJECTS
                      </NavLink>
                      <NavLink
                        to="/global-calendar"
                        className={({ isActive }) =>
                          isActive
                            ? "px-3 py-2 rounded-md text-sm font-small text-white bg-lime-700 hover:text-white"
                            : "px-3 py-2 rounded-md text-sm font-small text-lime-200 hover:text-e-100 hover:bg-lime-600"
                        }
                      >
                        CALENDAR
                      </NavLink>
                      {/* {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="px-3 py-2 rounded-md text-sm font-medium text-lime-200 hover:text-white"
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                    ))} */}
                    </div>
                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-4 relative flex-shrink-0 z-10">
                      <div>
                        <Menu.Button className="bg-lime-700 flex text-sm rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-lime-700 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <Avatar
                            round
                            size="35"
                            color="gray"
                            textSizeRatio={1.9}
                            name={user.name}
                          />
                          {/* <UserCircleIcon className="h-8 w-8 text-white-500" /> */}
                          {/* <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                          alt=""
                        /> */}
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
                </div>
              ) : (
                <div className="flex">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "px-3 py-2 rounded-md text-sm font-small text-white bg-lime-700 hover:text-white"
                        : "px-3 py-2 rounded-md text-sm font-small text-lime-200 hover:text-e-100 hover:bg-lime-600"
                    }
                  >
                    LOG IN
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      isActive
                        ? "px-3 py-2 rounded-md text-sm font-small text-white bg-lime-700 hover:text-white"
                        : "px-3 py-2 rounded-md text-sm font-small text-lime-200 hover:text-e-100 hover:bg-lime-600"
                    }
                  >
                    SIGN UP
                  </NavLink>
                </div>
              )}
            </div>
          </div>
          {isLoggedIn && (
            <Disclosure.Panel className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Disclosure.Button
                  as="a"
                  href="/"
                  className={classNames(
                    location.pathname === "/"
                      ? "text-white bg-lime-700"
                      : "text-lime-200 hover:text-lime-100 hover:bg-lime-600",
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
                      ? "text-white bg-lime-700"
                      : "text-lime-200 hover:text-lime-100 hover:bg-lime-600",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  // aria-current={item.current ? "page" : undefined}
                >
                  CALENDAR
                </Disclosure.Button>
              </div>
              <div className="pt-4 pb-3 border-t border-lime-800">
                <div className="px-2 space-y-1">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      onClick={item.action}
                      className="block px-3 py-2 rounded-md text-base font-medium text-lime-200 hover:text-lime-100 hover:bg-lime-600"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          )}
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
