import service from "./service";

const URL = "/colaborator-API/projects";

const getAllProjectsService = () => {
  return service.get(`${URL}/`);
};

const getProjectTeamsService = (id) => {
  return service.get(`${URL}/${id}/team`);
};


const getAllCurrentProjectsService = (userId) => {
  return service.get(`${URL}/${userId}/current`);
};

const getAllCurrentProjectsIdService = (userId) => {
  return service.get(`${URL}/${userId}/current/id`);
};
const getAllCompletedProjectsService = (userId) => {
  return service.get(`${URL}/${userId}/completed`);
};
const getProjectDetailsService = (id) => {
  return service.get(`${URL}/${id}`);
};

const addNewProjectService = (newProject) => {
  return service.post(`${URL}/`, newProject);
};

const updateProjectService = (id, updatedProject) => {
  return service.put(`${URL}/${id}`,updatedProject);
};

const deleteProjectService = (id) => {
  return service.delete(`${URL}/${id}`);
};
export {
  getAllProjectsService,
  getAllCurrentProjectsService,
  getAllCompletedProjectsService,
  addNewProjectService,
  updateProjectService,
  getProjectDetailsService,
  deleteProjectService,
  getProjectTeamsService,
  getAllCurrentProjectsIdService
};
