import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../services/auth.services";
import { useFormik, FormikProvider } from "formik";
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";
import SignUpForm from "../components/forms/SignUpForm";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleSignupSubmit = async (values) => {
    const email = values.email;
    const name = values.name;
    const password = values.password;
    const role = values.role;

    const requestBody = { email, password, name, role };

    try {
      await signupService(requestBody);
      navigate("/login");
    } catch (err) {
      if (err.response?.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      role: "",
    },
    onSubmit: (values) => {
      handleSignupSubmit(values);
    },
    validate: (values) => {
      let errors = {};
      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.name) {
        errors.name = "Name is required";
      }

      if (!values.password) {
        errors.password = "Required";
      } else if (
        !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/i.test(values.password)
      ) {
        errors.password =
          "Invalid password, must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter. ";
      }

      if (!values.role) {
        errors.role = "Role is required";
      }
      return errors;
    },
  });

  return (
    <div className="flex bg-neutral-50  flex-col h-screen mb-auto">
      <NavBar />
      <FormikProvider value={formik}>
        <SignUpForm formik={formik} handleSignupSubmit={handleSignupSubmit} />
      </FormikProvider>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Footer />
    </div>
  );
}

export default SignupPage;
