import service from "./service";

const URL = "/colaborator-API/chat";

const startChatService = (userId) => {
  return service.post(`${URL}/start/${userId}`);
};

const getAllMessagesService = (chatId) => {
    return service.get(`${URL}/messages/${chatId}`)
}

export { startChatService, getAllMessagesService };
