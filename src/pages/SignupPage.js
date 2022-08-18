import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";
import SignUpForm from "../components/forms/SignUpForm";
import SignUpTitle from "../components/titles/signupTitle";
function SignupPage(props) {
  return (
    <div className="flex bg-neutral-50  flex-col h-screen mb-auto">
      <NavBar />
      <SignUpTitle>
        <SignUpForm />
      </SignUpTitle>
      <Footer />
    </div>
  );
}

export default SignupPage;
