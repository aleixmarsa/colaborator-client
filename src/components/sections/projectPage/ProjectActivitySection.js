import { getAllCurrentProjectsIdService } from "../../../services/project.services";
import { getAllActivityService } from "../../../services/activity.services";
import { useState, useEffect } from "react";
import { AuthContext } from "../../../context/auth.context";
import { useContext } from "react";
import Avatar from "react-avatar";
import { SocketContext } from "../../../context/socket.context";

const ProjectActivitySection = (props) => {
  const [currentProjectsId, setCurrentProjectsId] = useState([]);
  const [activity, setActivity] = useState([]);
  const { user } = useContext(AuthContext);
  const socket = useContext(SocketContext)


  useEffect(() => {
    getActivity();
  }, []);

  socket.on("receive_render_activity", () => {
    getActivity();
  });

  const getActivity = async () => {
    try {
      const projectResponse = await getAllCurrentProjectsIdService(user._id);
      const idArray = projectResponse.data.map((id) => {
        return id._id;
      });
      const response = await getAllActivityService(idArray);
      setActivity(response.data);
      
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
      {/* Activity feed */}
      <div className=" lg:min-w-0 lg:flex-1 mr-5 gap-6">
        <div className="p-6 pt-4 bg-white">
          <div className=" flex items-center border-b-2 mb-3 pb-2  ">
            <h2 className="flex-1 text-xl">RECENT ACTIVITY</h2>
          </div>
          <div>
            <ul role="list" className="divide-y divide-gray-200">
              {activity.map((item) => (
                <li key={item._id} className="flex flex-col text-left gap-2 py-4">
                  <p className="text-sm text-black font-semibold">
                    {item.project.title}
                  </p>
                  <p className="flex gap-2 text-sm text-left text-gray-500">
                    {item.title} by:
                    <div className="flex space-x-2">

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">
                            {item.user.name}
                          </h3>
                        </div>
                      </div>
                      <Avatar
                        key={item._id}
                        round
                        size="18"
                        // color="gray"
                        textSizeRatio={1.9}
                        name={item.user.name}
                      />
                    </div>
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.updatedAt
                      .replace(/([^:]*$)/g, "")
                      .replace("T", " ")
                      .slice(0, -1)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Activity feed */}
      {/* <ProjectsListSection
            title="Completed Projects"
            filteredProjects={filteredCompletedProjects}
            setFilteredProjects={setFilteredCompletedProjects}
            classNames={classNames}
            editProject={editProject}
            setEditProject={setEditProject}
            setNewProject={setNewProject}
            setId={setId}
            setModalHasRender={setModalHasRender}
            setOpenDeleteModal={setOpenDeleteModal}
            setProjectTitle={setProjectTitle}
            getAllProjects={getAllProjects}
          /> */}
    </div>
  );
};

export default ProjectActivitySection;
