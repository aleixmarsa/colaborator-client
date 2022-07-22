import logo from "./logo.svg";
import "./App.css";

import ProjectsPage from "./pages/ProjectsPage";
import GlobalCalendarPage from "./pages/GlobalCalendar";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProjectCards from "./pages/TasksPage";

import PrivateRoute from './components/routes/PrivateRoute'; 
import AnonRoute from './components/routes/AnonRoute'; 

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<PrivateRoute><ProjectsPage /></PrivateRoute>} />
        <Route exact path="/global-calendar" element={<PrivateRoute><GlobalCalendarPage /></PrivateRoute>} />
        <Route exact path="/signup" element={<AnonRoute><SignupPage /></AnonRoute>} />
        <Route exact path="/login" element={<AnonRoute><LoginPage /></AnonRoute>} />
        <Route exact path="/:projectId/tasks" element={<PrivateRoute><ProjectCards /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
