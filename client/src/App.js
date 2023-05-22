import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Topbar from "./layout/Topbar";
import Sidebar from "./layout/Sidebar";
//import Dashboard from "./Dashboard/index";
//import ActiveProjects from "./Dashboard/ActiveProjects.js";
import TopTotal from "./Dashboard/dashmain.js";
import ProjectCreate from "./pages/projects";
import UserList from "./pages/userlist";
import Profile from "./pages/profile";
import Tickets from "./pages/tickets";
import Payments from "./pages/payments";
import Charts from "./pages/charts";
import Calendars from "./pages/calendar";
import AddUser from "./pages/adduser";
import Login from "./auth/login";
import Register from "./auth/register";
import ForgotPassword from "./auth/ForgotPassword";
import "./App.css";
import ProjectList from "./pages/ProjectList/project-list";
import TaskList from "./pages/TaskList/task-list";
import TaskCreate from "./pages/task";

const token = localStorage.getItem("token");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

async function getCurrentUser() {
  const currentUser = await axios(`http://localhost:5000/user/current`, {
    ...config,
    method: "GET",
  });

  const data = currentUser.data;
  return data;
}

function App() {
  const [isSidebar, setIsSidebar] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="app">
     
      <div
        style={{
          display: "flex",
          flexWrap:"wrap",
          flex:"1 1 50%"
        }}
      >
        {currentUser && (
        <div>
          <div className="sidebar">
            <Sidebar isSidebar={isSidebar} isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed}/>
          </div>
        </div>
        )}
        <div style={{width: "100%"}}>
          <main className={`main ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}>
            {currentUser && (
            <div className={`topbar ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}>
              <div class="layout-width">
                <Topbar />
              </div>
            </div>
            )}
            <div>
              <div className="content" >
                <Routes>
                  {/* <Route path="/" element={<Dashboard />} /> */}
                  <Route path="/" element={<Login />} />
                  {/* <Route path="/" element={<ActiveProjects />} /> */}
                  <Route path="/users" element={<UserList />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/projects" element={<ProjectCreate />} />
                  <Route path="/project-list" element={<ProjectList />} />
                  <Route path="/task-list" element={<TaskList />} />
                  <Route path="/task" element={<TaskCreate />} />
                  <Route path="/tickets" element={<Tickets />} />
                  <Route path="/calendar" element={<Calendars />} />
                  <Route path="/payments" element={<Payments />} />
                  <Route path="/charts" element={<Charts />} />
                  <Route path="/adduser" element={<AddUser />} />
                  <Route path="/dashboard" element={<TopTotal />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/password/forgot" element={<ForgotPassword />} />
                </Routes>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
