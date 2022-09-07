import "./App.css";

import { Routes, Route } from "react-router-dom";

import ProjectsPage from "./pages/ProjectsPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProjectCards from "./pages/TasksPage";
import CalendarPage from "./pages/CalendarPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from './components/routes/PrivateRoute'; 
import AnonRoute from './components/routes/AnonRoute'; 
import ChatPage from "./pages/ChatPage";
import ErrorPage from "./pages/ErrorPage";
import ProfilePage from "./pages/ProfilePage";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<AnonRoute><HomePage /></AnonRoute>} />
        <Route exact path="/signup" element={<AnonRoute><SignupPage /></AnonRoute>} />
        <Route exact path="/login" element={<AnonRoute><LoginPage /></AnonRoute>} />
        <Route exact path="/projects" element={<PrivateRoute><ProjectsPage /></PrivateRoute>} />
        <Route exact path="/chat" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
        <Route exact path="/project/:projectId/chat" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
        <Route exact path="/project/:projectId" element={<PrivateRoute><ProjectDetailsPage /></PrivateRoute>} />
        <Route exact path="/project/:projectId/tasks" element={<PrivateRoute><ProjectCards /></PrivateRoute>} />
        <Route exact path="/project/:projectId/monthCalendar" element={<PrivateRoute><CalendarPage /></PrivateRoute>} />
        <Route exact path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route exact path="/*" element={<ErrorPage />} />

      </Routes>
    </div>
  );
}

export default App;
