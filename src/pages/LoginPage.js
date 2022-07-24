import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";
import { loginService } from "../services/auth.services";
import LogInForm from "../components/forms/LogInForm";
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";

function LoginPage(props, location) {
  // const { email2 = 'defaultValue', password2="defaultValue" } = location.state || ""

  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("Admin123!");
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
      <LogInForm
        handleLoginSubmit={handleLoginSubmit}
        email={email}
        handleEmail={handleEmail}
        password={password}
        handlePassword={handlePassword}
      />
			{errorMessage && <p className="error-message">{errorMessage}</p>}
      <Footer />
    </div>
  );
}

export default LoginPage;
