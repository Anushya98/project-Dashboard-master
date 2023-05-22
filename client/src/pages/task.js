import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, FormLabel, MenuItem, Select, TextField } from "@mui/material";
import { Box } from "@mui/system";
const Swal = require("sweetalert2");
const token = localStorage.getItem("token");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

async function getAllocatedTo() {
  const getAllocatedTo = await axios(`http://localhost:5000/allocated/user`, {
    ...config,
    method: "GET",
  });

  const data = getAllocatedTo.data;
  return data;
}

const TaskCreate = () => {
  const [file, setFile] = useState(null);
  const [AllocatedUsers, setAllocatedUsers] = useState([]);
  const [input, setInput] = useState({
    taskName: "",
    description: "",
    dueDate: "",
    allocatedTo: "",
    createdBy: "",
  });

  const { taskName, description, dueDate, allocatedTo, createdBy } = input;

  useEffect(() => {
    console.log("hereee");
    Promise.resolve(getAllocatedTo()).then((data) => {
      setAllocatedUsers(data);
      console.log("dataaaa", data);
    });
  }, []);

  console.log("AllocatedUser=>>>", AllocatedUsers);
  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", file);
    console.log("file", file);
    axios
      .post("http://localhost:5000/project/upload", formData, {
        headers: {
          ...config.headers,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((file) => {
        const data = file.data;
        axios
          .post(
            "http://localhost:5000/task",
            { ...input, fileUrl: data.url },
            {
              withCredentials: true,
              headers: {
                ...config.headers,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            Swal.fire("Success!", "You add the task!", "success");
            console.log(res);
          })
          .catch((err) => {
            if (err instanceof Error) {
              Swal.fire("Not Working!", `${err.message}`, "danger");
            }
            console.log(err);
          });
      })
      .catch((error) => {
        if (error instanceof Error) {
          Swal.fire("Not Working!", `${error.message}`, "danger");
        }
      });
  };

  const allocatedToHandleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(input);
  };

  return (
    <div class="col-xl-9" className="cards" style={{zIndex:"1",left:"150px"}}>
    <div class="card"  >
    <form style={{padding:"10px"}}
      method="POST"
      onSubmit={handleSubmit}
      id="inputform"
      name="inputform"
      //enctype="multipart/form-data"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent={"center"}
        maxWidth={700}
        alignContent={"center"}
        alignSelf="center"
        marginLeft={"auto"}
        marginRight="auto"
        marginTop={10}
      >
        <FormLabel>Task Name</FormLabel>
        <TextField
          value={taskName}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="taskName"
        />
        <FormLabel>Description</FormLabel>
        <TextField
          value={description}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="description"
        />
        <FormLabel>Due Date</FormLabel>
        <TextField
          type="text"
          value={dueDate}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="dueDate"
        />
        <FormLabel>Allocated To</FormLabel>
        <Select
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="allocatedTo"
          value={allocatedTo}
        >
          {AllocatedUsers.length != 0 &&
            AllocatedUsers.users.map((user, key) => (
              <MenuItem value={user._id} key={key}>
                {user.name}
              </MenuItem>
            ))}
        </Select>

        <FormLabel>Created By</FormLabel>
        <TextField
          value={createdBy}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="createdBy"
        />
        <FormLabel>File</FormLabel>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="raised-button-file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          type="file"
        />
        <label htmlFor="raised-button-file">
          <Button
            style={{
              display: "block",
              alignItems: "center",
              textAlign: "center",
              background:"linear-gradient(130deg, #c973ff,#deb8f6 , #aebaf8 )",
              marginBottom:"2%"
            }}
            variant="raised"
            component="span"
          >
            Upload
          </Button>
        </label>
        <Button variant="contained" type="submit" style={{background:"linear-gradient(130deg, #ed765e, #e3bde5 )",width:"50%", marginLeft:"25%", marginBottom:"2%"}}>
          Create
        </Button>
      </Box>
    </form>
    </div>
    </div>
  );
};

export default TaskCreate;
