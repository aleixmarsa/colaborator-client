import service from "./service";

const URL = "/colaborator-API/activity";

const addNewActivityService = (activity) => {
  return service.post(`${URL}/`, activity);
};

const getAllActivityService = (currentProjectsId) => {
  return service.get(`${URL}`, { params: { currentProjects: currentProjectsId } }); 
};

export { addNewActivityService, getAllActivityService };
