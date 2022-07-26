import service from "./service";

const URL = "/colaborator-API/chat";

const startDirectChatService = (userId) => {
  return service.post(`${URL}/start/direct-chat/${userId}`);
};

const startProjectChatService = (projectId) => {
  return service.post(`${URL}/start/project-chat/${projectId}`);
};

const getAllMessagesService = (chatId) => {
    return service.get(`${URL}/messages/${chatId}`)
}

export { startDirectChatService, startProjectChatService, getAllMessagesService };
