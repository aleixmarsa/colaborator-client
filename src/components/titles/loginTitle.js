import { useState } from "react";

function LogInTitle(props) {
  const [isEmailCopy, setIsEmailCopy] = useState(false);
  const [isPasswordCopy, setIsPasswordCopy] = useState(false);

  const handleEmailCopy = (e, email) => {
    e.preventDefault(e);
    navigator.clipboard.writeText(email);
    setIsEmailCopy(true);
    setTimeout(() => {
      setIsEmailCopy(false);
    }, 1000);
  };

  const handlePaswordCopy = (e, password) => {
    e.preventDefault(e);
    navigator.clipboard.writeText(password);
    setIsPasswordCopy(true);
    setTimeout(() => {
      setIsPasswordCopy(false);
    }, 1000);
  };

  const email = "admin@admin.com";
  const password = "Admin123!";
  return (
    <div className="flex-grow flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Log in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or try it using{" "}
          <span
            className="font-bold cursor-pointer relative "
            onClick={(e) => handleEmailCopy(e, email)}
          >
            {email}{" "}
            <span
              className={`transition-opacity ${
                isEmailCopy ? "opacity-80" : "opacity-0"
              } duration-1000 ease-in-out absolute -left-10 top-14 z-10 -translate-y-full w-48 px-2 py-1 bg-mainColor rounded-lg text-center text-white text-sm after:content-[''] after:absolute after:left-1/2 after:top-[-53%] after:-translate-x-1/2 after:rotate-180 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-mainColor`}
            >
              Copied to clipboard
            </span>
          </span>
          <span className="font-bold"> // </span>
          <span
            className="font-bold cursor-pointer relative"
            onClick={(e) => handlePaswordCopy(e, password)}
          >
            {password}
            <span
              className={`transition-opacity ${
                isPasswordCopy ? "opacity-80": "opacity-0"
              } duration-1000 ease-in-out absolute -left-16 top-14 z-10 -translate-y-full w-48 px-2 py-1 bg-mainColor rounded-lg text-center text-white text-sm after:content-[''] after:absolute after:left-1/2 after:top-[-53%] after:-translate-x-1/2 after:rotate-180 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-mainColor`}
            >
              Copied to clipboard
            </span>
          </span>
        </p>
      </div>
      {props.children}
    </div>
  );
}

export default LogInTitle;
