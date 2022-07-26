import { getAllCurrentProjectsIdService } from "../../../services/project.services";
import { getAllActivityService } from "../../../services/activity.services";
import { useState, useEffect } from "react";
import { AuthContext } from "../../../context/auth.context";
import { useContext } from "react";
import Avatar from "react-avatar";

const ProjectActivitySection = (props) => {
  const [currentProjectsId, setCurrentProjectsId] = useState([]);
  const [activity, setActivity] = useState([]);
  const { user } = useContext(AuthContext);

  const getAllCurrentProjectsId = async () => {
    try {
      const response = await getAllCurrentProjectsIdService(user._id);
      const idArray = response.data.map((id) => {
        return id._id;
      });
      setCurrentProjectsId(idArray);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllCurrentProjectsId();
    getAllActivities();
  }, []);

  const activityItems = [
    {
      project: "Workcation",
      commit: "2d89f0c8",
      environment: "production",
      time: "1h",
    },
    // More items...
  ];

  const body = {
    currentProjectsId: currentProjectsId,
  };

  const getAllActivities = async () => {
    try {
      const response = await getAllActivityService(currentProjectsId);
      setActivity(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllCurrentProjectsId();
  }, []);

  return (
    <div>
      {/* Activity feed */}
      <div className="drop-shadow-md  lg:min-w-0 lg:flex-1  mr-5 gap-6 mt-5 mb-10 ">
        <div className="p-6 pt-2 bg-stone-50">
          <div className=" flex items-center border-b-2 mb-5  pb-2  ">
            <h2 className="flex-1 text-xl">ACTIVITY</h2>
          </div>
          <div>
            <ul role="list" className="divide-y divide-gray-200">
              {activity.map((item) => (
                <li key={item._id} className="py-4">
                  <div className="flex space-x-3">
                  <Avatar
                        key={item._id}
                        round
                        size="25"
                        // color="gray"
                        textSizeRatio={1.75}
                        name={item.user.name}
                      />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">
                          {item.user.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {item.updatedAt
                            .replace(/([^:]*$)/g, "")
                            .replace("T", " ")
                            .slice(0, -1)}
                          
                        </p>
                      </div>
                      <p className="text-sm text-gray-500"><span className=" font-bold">{item.project.title}: </span>{item.title}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="py-4 text-sm border-t border-gray-200">
              <a
                href="#"
                className="text-green-600 font-semibold hover:text-green-900"
              >
                View all activity <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
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
