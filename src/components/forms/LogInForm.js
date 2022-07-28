/* eslint-disable jsx-a11y/anchor-is-valid */
import Button from "../buttons/Button";
import { Link } from "react-router-dom";
import { Field, ErrorMessage } from "formik";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

const LogInForm = (props) => {
  const { formik } = props;

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="flex-grow flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Log in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or try it using{" "}
          <span className="font-bold"> admin@admin.com//Admin123!</span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 drop-shadow-xl sm:rounded-md sm:px-10">
          <form
            onSubmit={formik.handleSubmit}
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
                <Field
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  autoComplete="email"
                  className={classNames(
                    formik.errors.email
                      ? "focus:outline-red-500"
                      : "focus:outline-buttonHover",
                    "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline sm:text-sm"
                  )}
                />
                {formik.errors.email ? (
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  autoComplete="current-password"
                  className={classNames(
                    formik.errors.password
                      ? "focus:outline-red-500"
                      : "focus:outline-buttonHover",
                    "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline sm:text-sm"
                  )}
                />
                {formik.errors.password ? (
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

            <div className="flex items-center justify-between">
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
            </div>

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
    </div>
  );
};

export default LogInForm;
