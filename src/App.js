import logo from "./logo.svg";
import "./App.css";
import ProjectsPage from "./pages/ProjectsPage";
import GlobalCalendarPage from "./pages/GlobalCalendar";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProjectsPage />} />
        <Route path="/global-calendar" element={<GlobalCalendarPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/*    ADD    */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
