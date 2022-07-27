import service from "./service";

const URL = "/colaborator-API/users";

const getAllUsersService = () => {
  return service.get(`${URL}/`);
};

export { getAllUsersService };
