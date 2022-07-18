import logo from "./logo.svg";
import "./App.css";
import ProjectsPageExample from "./pages/ProjectsPageExample";
import ProjectsPage from "./pages/ProjectsPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProjectsPage />} />
      </Routes>
    </div>
  );
}

export default App;
