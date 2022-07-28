import Button from "../buttons/Button";
import { Link } from "react-router-dom";
import { Field, ErrorMessage } from "formik";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

const SignUpForm = (props) => {
  const { formik } = props;

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="flex-grow flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Sign Up
        </h2>
        <Link className="mt-2 text-center text-sm text-gray-600" to="/login">
          Or try it using{" "}
          <span className="font-bold text-gray-600 hover:text-gray-500 underline">
            admin@admin.com//Admin123!
          </span>
        </Link>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 drop-shadow-xl rounded-md sm:px-10">
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
                htmlFor="user"
                className="block text-sm font-medium text-gray-700"
              >
                User
              </label>
              <div className="mt-1 relative">
                <input
                  id="name"
                  name="name"
                  type="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  autoComplete="name"
                  required
                  className={classNames(
                    formik.errors.name
                      ? "focus:outline-red-500"
                      : "focus:outline-buttonHover",
                    "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline sm:text-sm"
                  )}
                />
                {formik.errors.name ? (
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.role}
                  autoComplete="role"
                  placeholder="e.g. Full Stack Web Developer"
                  required
                  className={classNames(
                    formik.errors.role
                      ? "focus:outline-red-500"
                      : "focus:outline-buttonHover",
                    "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline sm:text-sm"
                  )}
                />
                {formik.errors.role ? (
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  autoComplete="current-password"
                  required
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
    </div>
  );
};

export default SignUpForm;
