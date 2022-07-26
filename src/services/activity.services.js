import service from "./service";

const URL = "/colaborator-API/activity";

const addNewActivityService = (activity) => {
  return service.post(`${URL}/`, activity);
};

const getAllActivityService = (currentProjectsId) => {
  console.log(
    "🚀 ~ file: activity.services.js ~ line 11 ~ getAllActivityService ~ currentProjectsId",
    currentProjectsId
  );
  return service.get(`${URL}`, { params: { currentProjects: currentProjectsId } }); 
};

export { addNewActivityService, getAllActivityService };
