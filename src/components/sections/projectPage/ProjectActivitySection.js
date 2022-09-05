/* eslint-disable jsx-a11y/no-redundant-roles */
import { useState, useEffect } from "react";
import { useContext } from "react";
import Avatar from "react-avatar";

import { getAllCurrentProjectsIdService } from "../../../services/project.services";

import { AuthContext } from "../../../context/auth.context";
import { SocketContext } from "../../../context/socket.context";

const ProjectActivitySection = (props) => {
  const [activity, setActivity] = useState([]);
  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    getActivity();
  }, []);

  const getActivitiesListener = (allActivities) => {
    const limitedActivities = allActivities.slice(0, 5);
    setActivity(limitedActivities);
  };

  const newActivityListener = (newActivity) => {
    if (newActivity.title === "Project deleted") {
      socket.emit("leaveProjectRoom", newActivity.project);
    }

    getActivity();
  };

  useEffect(() => {
    socket.on("getActivities", getActivitiesListener);
    socket.on("newActivityCreated", newActivityListener);
    return () => {
      socket.off("getActivities", getActivitiesListener);
      socket.off("newActivityCreated", newActivityListener);
    };
  }, [socket]);

  const getActivity = async () => {
    try {
      const projectResponse = await getAllCurrentProjectsIdService(user._id);
      const idArray = projectResponse.data.map((id) => {
        return id._id;
      });
      socket.emit("getActivities", idArray);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-neutral-50 pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0">
      <div className="h-full pl-6 lg:w-80">
        <div className="h-full  relative">
          <div className=" lg:min-w-0 lg:flex-1 mr-5 gap-6 pt-0 ">
            <div className="p-6 bg-neutral-50">
              <div className=" flex items-center border-b-2 mb-3 pb-2  ">
                <h2 className="flex-1 text-xl pb-3 pt-2">RECENT ACTIVITY</h2>
              </div>
              <div>
                <ul role="list" className="divide-y divide-gray-200">
                  {activity.map((item) => {
                    return item !== null ? (
                      <li
                        key={item._id}
                        className="flex flex-col text-left gap-2 py-4"
                      >
                        <p className="text-sm text-black font-semibold">
                          {item.project.title}
                        </p>
                        <div className="flex gap-2 text-sm text-left text-gray-500">
                          {item.title} by:
                          <div className="flex space-x-2">
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">
                                  {item.user.name}
                                </p>
                              </div>
                            </div>
                            <Avatar
                              key={item._id}
                              round
                              size="18"
                              textSizeRatio={1.9}
                              name={item.user.name}
                            />
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {item.updatedAt
                            .replace(/([^:]*$)/g, "")
                            .replace("T", " ")
                            .slice(0, -1)}
                        </p>
                      </li>
                    ) : (
                      <></>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectActivitySection;
