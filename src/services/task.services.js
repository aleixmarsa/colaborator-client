import service from "./service";

const URL = "/colaborator-API/projects";

const addNewTaskService = (projectId, task) => {
  return service.post(`${URL}/${projectId}/card/new-card`, task);
};

const getTaskDetailsService = (taskId) => {
  return service.get(`${URL}/card/edit/${taskId}`);
};

const updateTaskService = (taskId, updateTask) => {
  return service.put(`${URL}/card/updateCard/${taskId}`, updateTask);
};

const deleteTaskService = (taskId) => {
  return service.delete(`${URL}/card/delete/${taskId}`);
};
export {
  addNewTaskService,
  getTaskDetailsService,
  updateTaskService,
  deleteTaskService,
};
