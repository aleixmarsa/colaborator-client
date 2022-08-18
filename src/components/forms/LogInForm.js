import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../../context/auth.context";
import { loginService } from "../../services/auth.services";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "../buttons/Button";
import { Link } from "react-router-dom";
import { ErrorMessage } from "formik";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

const LogInForm = () => {

  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  const { logInUser } = useContext(AuthContext);


  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values) => {
        const email = values.email;
        const password = values.password;
        const requestBody = { email, password };

        try {
          const response = await loginService(requestBody);
          const token = response.data.authToken;
          logInUser(token);
          navigate("/projects");
        } catch (err) {
          if (err.response?.status === 400) {
            console.log("ERROR ", err.response.data.message);
            setErrorMessage(err.response.data.message);
          }
          // setErrorMessage(errorDescription);
        }
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required("Required"),
        password: Yup.string()
          .required("No password provided.")
          .min(6, "Password is too short - should be 6 chars minimum.")
          .matches(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
            "Password must contain at least one number, one lowercase and one uppercase letter."
          ),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;

        return (
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 drop-shadow-xl sm:rounded-md sm:px-10">
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                action="#"
                method="POST"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="email"
                      required
                      className={classNames(
                        errors.email
                          ? "focus:outline-red-500"
                          : "focus:outline-buttonHover",
                        "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline sm:text-sm"
                      )}
                    />
                    {errors.email ? (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                    ) : (
                      <p></p>
                    )}
                  </div>

                  <ErrorMessage
                    component="div"
                    name="email"
                    className="mt-2 text-sm text-red-600"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="current-password"
                      required
                      className={classNames(
                        errors.password
                          ? "focus:outline-red-500"
                          : "focus:outline-buttonHover",
                        "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline sm:text-sm"
                      )}
                    />
                    {errors.password ? (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                    ) : (
                      <p></p>
                    )}
                  </div>
                  <ErrorMessage
                    component="div"
                    name="password"
                    className="mt-2 text-sm text-red-600"
                  />
                </div>

                {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-bold text-gray-600 hover:text-gray-500 underline"
                >
                  Forgot your password?
                </a>
              </div>
            </div> */}
                {errorMessage && !errors.email && !errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
                )}

                <div className="flex flex-col">
                  <Button
                    position="column"
                    type="submit"
                    text="Log In"
                    color="mainColor"
                  />

                  <Link to="/signup">
                    <Button
                      position="column"
                      type="submit"
                      text="Sign Up"
                      color="white"
                    />
                  </Link>
                </div>
              </form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default LogInForm;
