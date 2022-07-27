import NavBar from "../components/navbar/NavBar";
import { Link } from "react-router-dom";

/* This example requires Tailwind CSS v2.0+ */
const ErrorPage = () => {
  return (
    <div>
      <NavBar />
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full">
          <body class="h-full">
          ```
        */}
      <div className="min-h-full pt-16 pb-12 flex flex-col bg-white">
        <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16">
            <div className="text-center">
              <p className="text-sm font-semibold text-buttonOrange uppercase tracking-wide">
                404 error
              </p>
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Page not found.
              </h1>
              <p className="mt-2 text-base text-gray-500">
                Sorry, we couldn’t find the page you’re looking for.
              </p>
              <div className="mt-6">
                <Link to="/">
                  <p className="text-base font-medium text-buttonOrange hover:text-buttonOrange-low">
                    Go back home<span aria-hidden="true"> &rarr;</span>
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ErrorPage;
