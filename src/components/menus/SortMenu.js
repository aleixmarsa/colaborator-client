import { Menu } from "@headlessui/react";
import { ChevronDownIcon, SortAscendingIcon } from "@heroicons/react/solid";

const SortMenu = (props) => {

  const { classNames, filteredProjects, setFilteredProjects } = props;

  const sortProjects = (type) => {
    
    let filteredProjectsCopy = [...filteredProjects];


    if (type === "name") {
      filteredProjectsCopy.sort((a, b) => {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0;
      });
    }else if(type === "dateCreated"){
      filteredProjectsCopy.sort((a, b) => {
        if (a.createdAt > b.createdAt) {
          return -1;
        }
        if (a.createdAt < b.createdAt) {
          return 1;
        }
        return 0;
      });
    }else if(type === "lastUpdate"){
      filteredProjectsCopy.sort((a, b) => {
        if (a.updatedAt > b.updatedAt) {
          return -1;
        }
        if (a.updatedAt < b.updatedAt) {
          return 1;
        }
        return 0;
      });
    }
    setFilteredProjects(filteredProjectsCopy);
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline focus:outline-buttonHover ">
        <SortAscendingIcon
          className="mr-3 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        Sort
        <ChevronDownIcon
          className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </Menu.Button>
      <Menu.Items className="origin-top-right z-20 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => sortProjects("name")}
                className={classNames(
                  active ? "bg-secundaryColor text-white" : "text-black",
                  "block px-4 py-2 text-sm w-full"
                )}
              >
                Name
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => sortProjects("lastUpdate")}
                className={classNames(
                  active ? "bg-secundaryColor text-white" : "text-black",
                  "block px-4 py-2 text-sm w-full"
                )}
              >
                Last update
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => sortProjects("dateCreated")}
                className={classNames(
                  active ? "bg-secundaryColor text-white" : "text-gray-700",
                  "block px-4 py-2 text-sm w-full"
                )}
              >
                Date created
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default SortMenu;
