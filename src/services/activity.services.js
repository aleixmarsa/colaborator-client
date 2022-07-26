import service from "./service";

const URL = "/colaborator-API/activity";

const addNewActivityService = (activity) => {
    return service.post(`${URL}/`, activity);
  };

  
const getAllActivityService = (projects) => {
    return service.get(`${URL}/`, projects);
  };

export { addNewActivityService, getAllActivityService };
