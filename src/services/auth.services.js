import service from './service';

const URL = '/auth';

const signupService = (user) => {
	return service.post(`${URL}/signup`, user);
};

const loginService = (user) => {
	return service.post(`${URL}/login`, user);
};

const verifyService = () => {
	return service.get(`${URL}/verify`);
};

export { signupService, loginService, verifyService };
