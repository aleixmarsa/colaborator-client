import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../../services/auth.services";

import Button from "../buttons/Button";
import { Link } from "react-router-dom";

const SignUpForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleRole = (e) => setRole(e.target.value);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const requestBody = { email, password, name, role };
    
    try {
      await signupService(requestBody);
      navigate("/login");
    } catch (err) {

      if (err.response?.status === 400) {
        console.log("ERROR ", err.response.data.message)
        setErrorMessage(err.response.data.message);
      }
    }
  };

  return (

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 drop-shadow-xl rounded-md sm:px-10">
          <form onSubmit={handleSignupSubmit} className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  autoComplete="email"
                  onChange={handleEmail}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline focus:outline-buttonHover  sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="user"
                className="block text-sm font-medium text-gray-700"
              >
                User
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="name"
                  value={name}
                  autoComplete="name"
                  onChange={handleName}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline focus:outline-buttonHover sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <div className="mt-1">
                <input
                  id="role"
                  name="role"
                  type="role"
                  value={role}
                  autoComplete="role"
                  placeholder="e.g. Full Stack Web Developer"
                  onChange={handleRole}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline focus:outline-buttonHover sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  onChange={handlePassword}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline focus:outline-buttonHover sm:text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <div className="text-sm">
                <span className="font-medium">Already registered </span>
                <Link
                  className="font-bold text-gray-600 hover:text-gray-500 underline"
                  to="/login"
                >
                  log in?
                </Link>
              </div>
            </div>

            <div>
              <Button
                position="column"
                type="submit"
                text="Sign Up"
                color="mainColor"
              />
            </div>
          </form>
          {errorMessage && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}
        </div>
      </div>
  );
};

export default SignUpForm;
