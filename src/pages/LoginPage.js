import LogInForm from "../components/forms/LogInForm";
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";
import LogInTitle from "../components/titles/loginTitle";
function LoginPage(props, location) {
  return (
    <div className="flex bg-neutral-50 flex-col h-screen mb-auto">
      <NavBar />
      <LogInTitle>
        <LogInForm />
      </LogInTitle>
      {/* <LogInForm
        handleLoginSubmit={handleLoginSubmit}
        email={email}
        handleEmail={handleEmail}
        password={password}
        handlePassword={handlePassword}
      /> */}
      <Footer />
    </div>
  );
}

export default LoginPage;
