import { useState, useContext } from "react";
// import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";
import { loginService } from "../services/auth.services";
import FormLogIn from "../components/FormLogIn";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  const { logInUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    try {
      const response = await loginService(requestBody);

      const token = response.data.authToken;
      logInUser(token);
      navigate("/");
    } catch (err) {
      const errorDescription = err?.response?.data?.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div className="flex flex-col h-screen mb-auto">
      <NavBar />
      <FormLogIn
        handleLoginSubmit={handleLoginSubmit}
        email={email}
        handleEmail={handleEmail}
        password={password}
        handlePassword={handlePassword}
      />
      <Footer />
    </div>
  );
}

export default LoginPage;
