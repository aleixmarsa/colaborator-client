import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../services/auth.services";
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

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleRole = (e) => setRole(e.target.value);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name, role };
    console.log("🚀 ~ file: SignupPage.js ~ line 26 ~ handleSignupSubmit ~ requestBody", requestBody)
    try {
      await signupService(requestBody);
      navigate("/login");
    } catch (err) {
      if (err.response?.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      }
    }
  };

  return (
    <div className="flex bg-neutral-50  flex-col h-screen mb-auto">
      <NavBar />
      <SignUpForm
        handleSignupSubmit={handleSignupSubmit}
        email={email}
        handleEmail={handleEmail}
        role={role}
        handleRole={handleRole}
        name={name}
        handleName={handleName}
        password={password}
        handlePassword={handlePassword}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Footer />
    </div>
  );
}

export default SignupPage;
