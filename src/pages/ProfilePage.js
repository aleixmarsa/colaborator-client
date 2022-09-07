import NavBar from "../components/navbar/NavBar";

import { Fragment, useState } from "react";

import EditProfileModal from "../components/modals/EditProfileModal";

import Avatar from "react-avatar";
import Button from "../components/buttons/Button";

import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  const [editProfileModalHasRender, setEditProfileModalHasRender] =
    useState(false);

  const handleEditProfile = (e) => {
    e.preventDefault();
    setEditProfileModalHasRender(true);
  };

  return (
    <div className="bg-neutral-50 h-screen">
      <NavBar />

      {editProfileModalHasRender && (
        <EditProfileModal
          userId={user._id}
          setEditProfileModalHasRender={setEditProfileModalHasRender}
        />
      )}

      <div className="m-32 mt-2 mb-2 ">
        <div className="divide-y divide-gray-200 lg:col-span-9">
          <div className="py-6 px-4 sm:p-6 lg:pb-8">
            <div className=" flex flex-row justify-between p-4 border-b-2 border-gray-200">
              <h2 className="text-4xl leading-6 font-medium text-mainColor">
                My Profile
              </h2>
              <div>
                <Button
                  position="column"
                  type="button"
                  action={handleEditProfile}
                  text="Edit profile"
                  color="mainColor"
                />
              </div>
            </div>

            <div className="mt-10 flex flex-row">
              <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
                <div className="mt-1 lg:hidden">
                  <div className="flex items-center">
                    <Avatar
                      round
                      size="80"
                      textSizeRatio={1.9}
                      name={user.name}
                    />
                  </div>
                </div>

                <div className="hidden relative rounded-full overflow-hidden lg:block">
                  <Avatar
                    round
                    size="120"
                    textSizeRatio={1.9}
                    name={user.name}
                  />
                </div>
              </div>

              <div className="flex-column ml-8 mt-3 space-y-6">
                <div className="flex flex-row">
                  <div className=" font-medium text-xl text-gray-700">
                    Name:
                  </div>
                  <div className="ml-4 mt-1 flex">{user.name}</div>
                </div>

                <div className="flex flex-row">
                  <div className=" font-medium text-xl text-gray-700">
                    Role:
                  </div>
                  <div className="ml-4 mt-1 flex text-gray-400">
                    {user.role}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pb-4 border-b-2 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
              {/* <div className="mt-8 flex flex-row">
                <div className=" font-medium text-xl text-gray-700">
                  First name:
                </div>
                <div className="ml-4 mt-1 flex">{user.name}</div>
              </div>
              <div className="mt-8 flex flex-row">
                <div className=" font-medium text-xl text-gray-700">
                  Last name:
                </div>
                <div className="ml-4 mt-1 flex"></div>
              </div> */}
              <div className="mt-8 flex flex-row">
                <div className=" font-medium text-xl text-gray-700">
                  Location:
                </div>
                <div className="ml-4 mt-1 flex">
                  Ironhack Programing School, 08027, Barcelona
                </div>
              </div>
            </div>

            <div className="mt-6 pb-4 border-b-2 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
              <div className="mt-8 flex flex-col items-baseline">
                <div className=" font-medium text-xl text-gray-700">
                  About me:
                </div>
                <div className="mt-1 flex"></div>
              </div>
            </div>

            {/* <div className="mt-6 pb-4 border-b-2 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
              <div className="mt-8 flex flex-col items-baseline">
                <div className="font-medium text-xl text-gray-700">
                  My projects:
                </div>
                <div className="mt-1 flex"></div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
