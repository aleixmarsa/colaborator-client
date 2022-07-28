import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";
import { loginService } from "../services/auth.services";
import { useFormik, FormikProvider } from "formik";

import LogInForm from "../components/forms/LogInForm";
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";

function LoginPage(props, location) {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  const { logInUser } = useContext(AuthContext);

  const handleLoginSubmit = async (values) => {
    const email = values.email;
    const password = values.password;
    const requestBody = { email, password };

    try {
      const response = await loginService(requestBody);

      const token = response.data.authToken;
      logInUser(token);
      navigate("/projects");
    } catch (err) {
      const errorDescription = err?.response?.data?.message;
      setErrorMessage(errorDescription);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "admin@admin.com",
      password: "Admin123!",
    },
    onSubmit: (values) => {
      handleLoginSubmit(values);
    },
    validate: (values) => {
      let errors = {};
      if (values.email === "") {
        errors.email = "Email is required";
      }
      if (values.password === "") {
        errors.password = "Password is required";
      }
      return errors;
    },
  });

  return (
    <div className="flex bg-neutral-50 flex-col h-screen mb-auto">
      <NavBar />
      <FormikProvider value={formik}>
        <LogInForm formik={formik} handleLoginSubmit={handleLoginSubmit} />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <Footer />
      </FormikProvider>
    </div>
  );
}

export default LoginPage;
