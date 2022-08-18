import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../../services/auth.services";
import * as Yup from "yup";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { Formik, ErrorMessage } from "formik";

import Button from "../buttons/Button";
import { Link } from "react-router-dom";

const SignUpForm = (props) => {

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(undefined);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }


  return (
    <Formik
      initialValues={{ email: "", password: "", name: "", role: "" }}
      onSubmit={async (values) => {
        const email = values.email;
        const name = values.name;
        const role = values.role;
        const password = values.password;
        const requestBody = { email, password, name, role };

        try {
          await signupService(requestBody);
          navigate("/login");
        } catch (err) {
          if (err.response?.status === 400) {
            console.log("ERROR ", err.response.data.message);
            setErrorMessage(err.response.data.message);
          }
        }
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required("Required"),
        name: Yup.string().required("Required"),
        role: Yup.string().required("Required"),
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
        const { values, errors, handleChange, handleBlur, handleSubmit } =
          props;

        return (
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 drop-shadow-xl rounded-md sm:px-10">
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
                    htmlFor="user"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="name"
                      name="name"
                      type="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={classNames(
                        errors.name
                          ? "focus:outline-red-500"
                          : "focus:outline-buttonHover",
                        "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline sm:text-sm"
                      )}
                    />
                    {errors.name ? (
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
                    name="name"
                    className="mt-2 text-sm text-red-600"
                  />
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Role
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="role"
                      name="role"
                      type="role"
                      value={values.role}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="role"
                      placeholder="e.g. Full Stack Web Developer"
                      required
                      className={classNames(
                        errors.role
                          ? "focus:outline-red-500"
                          : "focus:outline-buttonHover",
                        "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline sm:text-sm"
                      )}
                    />
                    {errors.role ? (
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
                    name="role"
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
                {errorMessage && !errors.email && !errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
                )}
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
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default SignUpForm;
