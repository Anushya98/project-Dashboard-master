import axios from "axios";
import React, { useEffect, useState } from "react";
import CompletedProjects from "./CompletedProjects";
import InProgressProjects from "./InProgressProjects";
import WaitForModificationProjects from "./SelfProjects";
import styles from "./project.module.css";
import CanceledProjects from "./CanceledProjects";

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

function ProjectList() {
  const [value, setValue] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    Promise.resolve(getCurrentUser()).then((data) => {
      setCurrentUser(data);
    });
  }, []);

  console.log(value);
  console.log(currentUser);

  const CompletedProjectsHandler = (e) => {
    e.preventDefault();
    setValue("Completed");
    console.log(value);
  };

  const inProgressProjectsHandler = (e) => {
    e.preventDefault();
    setValue("InProgress");
    console.log(value);
  };

  const waitForModificationProjectHandler = (e) => {
    e.preventDefault();
    setValue("Self");
    console.log(value);
  };

  const canceledProjectHandler = (e) => {
    e.preventDefault();
    setValue("Canceled");
    console.log(value);
  };
  return (
    <div className={styles.container}>
      <div style={{
        height: "60px"
      }} className={styles.tabs}>
        <ul className={styles.nav}>
          <li className={`{styles.nav-item} ${value === "Completed" && "active"}`} onClick={CompletedProjectsHandler}>
            
              Completed Projects
            
          </li>
          <li className={`{styles.nav-item} ${value === "Self" && "active"}`} onClick={waitForModificationProjectHandler}>
            
              Self
           
          </li>

          <li className={`nav-item ${value === "Canceled" && "active"}`} onClick={canceledProjectHandler}>
            
              Canceled Projects
           
          </li>

          {currentUser && currentUser.role !== "user" ? (
            <li className={`nav-item ${value === "InProgress" && "active"}`} onClick={inProgressProjectsHandler}>
                   In Progress Projects
             
            </li>
          ) : (
            <></>
          )}
        </ul>
      </div>
      <div className={styles.projects}>
        {value === "Completed" ? (
          <div>
            <CompletedProjects value={value} />
          </div>
        ) : (
          <></>
        )}
        {value === "InProgress" ? (
          <div>
            <InProgressProjects value={value} />
          </div>
        ) : (
          <></>
        )}
        {value === "Self" ? (
          <div>
            <WaitForModificationProjects value={value} />
          </div>
        ) : (
          <></>
        )}
        {value === "Canceled" ? (
          <div>
            <CanceledProjects value={value} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
export default ProjectList;
