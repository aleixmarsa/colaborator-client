import logo from "./logo.svg";
import "./App.css";
import ProjectsPage from "./pages/ProjectsPage";
import GlobalCalendarPage from "./pages/GlobalCalendar"
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProjectsPage />} />
        <Route path="/global-calendar" element={<GlobalCalendarPage />} />

      </Routes>
    </div>
  );
}

export default App;
