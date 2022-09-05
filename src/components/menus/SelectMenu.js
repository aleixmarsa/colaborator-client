/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { getAllUsersService } from "../../services/user.services";
import Avatar from "react-avatar";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SelectMenu = (props) => {
  const [users, setUsers] = useState([]);
  const { team, setTeam, teamError } = props;

  const getAllUsers = async () => {
    try {
      const response = await getAllUsersService();
      const teamFromResponse = response.data.filter((user) =>
        team.some((member) => user._id === member._id)
      );
      setUsers(response.data);
      setTeam(teamFromResponse);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Listbox value={team} onChange={setTeam} multiple>
      {({ open }) => (
        <div>
          <Listbox.Label className="block text-sm  py-3 font-medium text-gray-700">
            Invite team
          </Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button
              data-test-id="team-listbox"
              className={classNames(
                teamError
                  ? " outline outline-1 outline-red-500"
                  : "focus:outline-buttonHover",
                "relative min-h-42px w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline focus:outline-buttonHover sm:text-sm"
              )}
            >
              {team.map((user) => (
                <span key={user._id} className="flex items-center mt-1">
                  <Avatar round size="20" textSizeRatio={2} name={user.name} />
                  <span className="ml-3 block truncate">{user.name}</span>
                </span>
              ))}
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-36 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-y-scroll focus:outline-none sm:text-sm">
                {users.map((person) => (
                  <Listbox.Option
                    data-test-id="team-listbox-options"
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "text-white bg-secundaryColor"
                          : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <Avatar
                            round
                            size="30"
                            // color="gray"
                            textSizeRatio={1.75}
                            name={person.name}
                          />
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {person.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-buttonHover",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
};
export default SelectMenu;
