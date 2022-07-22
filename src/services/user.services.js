import service from "./service";

const URL = "/colaborator-API/users";

const getAllUsersService = () => {
  return service.get(`${URL}/`);
};
// const getAllCurrentProjectsService = () => {
//   return service.get(`${URL}/current`);
// };
// const getAllCompletedProjectsService = () => {
//   return service.get(`${URL}/completed`);
// };
// const getProjectDetailsService = (id) => {
//   return service.get(`${URL}/${id}`);
// };

// const addNewProjectService = (newProject) => {
//   return service.post(`${URL}/`, newProject);
// };

// const updateProjectService = (id, updatedProject) => {
//   return service.put(`${URL}/${id}`,updatedProject);
// };

// const deleteProjectService = (id) => {
//   return service.delete(`${URL}/${id}`);
// };
export { getAllUsersService };
