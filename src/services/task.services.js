import service from "./service";

const URL = "/colaborator-API/projects";

const getAllTasksService = () => {
  return service.get(`${URL}/card/get-cards`)
}

const addNewTaskService = (projectId, task) => {
  return service.post(`${URL}/${projectId}/card/new-card`, task);
};

const getTaskDetailsService = (taskId) => {
  return service.get(`${URL}/card/edit/${taskId}`);
};

const updateTaskService = (taskId, updateTask) => {
  return service.put(`${URL}/card/updateCard/${taskId}`, updateTask);
};

const updateTaskStateService = (taskId, destination) => {
  return service.put(`${URL}/card/updateCard/${taskId}/${destination}`)
};

const deleteTaskService = (taskId) => {
  return service.delete(`${URL}/card/delete/${taskId}`);
};
export {
  getAllTasksService,
  addNewTaskService,
  getTaskDetailsService,
  updateTaskService,
  updateTaskStateService,
  deleteTaskService,
};
