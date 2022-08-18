import { Link } from "react-router-dom";

function SignUpTitle(props) {
    return(
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
        {props.children}
        </div>

    )
}

export default SignUpTitle