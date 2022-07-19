import Button from "./Button";
import { Link } from "react-router-dom";

const LogInForm = (props) => {
  const {handleLoginSubmit, email, handleEmail, password, handlePassword} =
    props;

  return (
    <div className="flex-grow flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Log in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or try it using <span className="font-bold">admin@admin//admin</span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 drop-shadow-xl sm:rounded-md sm:px-10">
          <form onSubmit={handleLoginSubmit} className="space-y-6" action="#" method="POST">
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
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
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

            <div>
              <Button
                position="column"
                type="submit"
                // action={handleNewProjectBtn}
                text="Log In"
                color="lime"
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
