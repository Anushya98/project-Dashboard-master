import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Typography, Select, Checkbox, FormControlLabel, FormGroup, MenuItem, } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import "../assets/adduser.css";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Swal = require("sweetalert2");


// async function addCompany() {
//   const addCompany = await axios(`http://localhost:5000//organisation`, {
//     ...config,
//     method: "Post",
//   });

//   const data = addCompany.data;
//   return data;
// }

const CreateCompany = () => {
    const [input, setInput] = useState({
        companyName: "",
        branches: "",
        employees: "",
    });
    const [role, setRole] = useState([]);
    const [email1, setEmail1] = useState(" ");
    const [email2, setEmail2] = useState(" ");

    const navigate = useNavigate();

    const { companyName, logo, branches, employees } = input;

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('companyName', companyName);
        formData.append('logo', logo);
        formData.append('role', JSON.stringify(role));
        axios
            .post("http://localhost:5000/organisation", formData)

            .then((res) => {
                Swal.fire("Success!", "You add the companyname!", "success");
                console.log(res);
                localStorage.setItem("orgId", res.data.org._id);
                navigate("/register");

            })
            .catch((err) => {
                if (err instanceof Error) {
                    Swal.fire("Not Working!", `${err.message}`, "danger");
                }
                console.log(err);
            })
            .catch((error) => {
                if (error instanceof Error) {
                    Swal.fire("Not Working!", `${error.message}`, "danger");
                }
            })
        setInput({
            ...input,
            companyName: "",
            logo: null,
        });
        setRole([]);
    };


    const handleChange = (e) => {
        // e.preventDefault();
        // setInput((prev) => {
        //   return { ...prev, [e.target.name]: e.target.value };
        // });
        //     setInput({ ...input, [e.target.name]: e.target.value })
        //     console.log(input);
        // };
        const { name, value } = e.target;
        if (name === "email1") {
            setEmail1(value);
        } else if (name === "email2") {
            setEmail2(value);
        } else {
            setInput((prevInput) => ({
                ...prevInput,
                [name]: value,
            }));
        }
    };
    const handleRoleChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setRole((prevRoles) => [...prevRoles, value]);
        } else {
            setRole((prevRoles) => prevRoles.filter((role) => role !== value));
        }
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        setInput({ ...input, logo: file });
        const fileName = file ? file.name : "Drag logo image or click file here";
        const uploadText = document.getElementById("uploadText");
        if (uploadText) {
            uploadText.textContent = fileName;
        }
    };

    const handleImageDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setInput({ ...input, logo: file });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div
            className="addform"
        >
            <form className="login-box" onSubmit={handleSubmit} style={{ background: 'darkmagenta' }}>
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent={"center"}
                    Width={890}
                    alignContent={"center"}
                    alignSelf="center"
                    marginLeft={"auto"}
                    marginRight="auto"
                    style={{ width: "100%", background: "darkmagenta" }}
                >
                    <Typography variant="h2">Register</Typography>
                    <div className="user-box" >
                        <TextField
                            label="Company Name"
                            style={{ color: "rgb(50, 50, 50)" }}
                            type="companyName"
                            name="companyName"
                            id="name_field"
                            className="input"
                            //color="white"
                            value={companyName}
                            // onChange={(e) => setInput(e.target.value)}
                            onChange={handleChange}
                        />
                        <div style={{ display: "flex", gap: "20px" }}>
                            <TextField
                                label="Number of branches"
                                style={{ color: "rgb(50, 50, 50)" }}
                                name="branches"
                                id="number_field"
                                className="input"
                                //color="white"
                                type="number"
                                inputProps={{ pattern: "[0-9]*" }}
                                value={branches}
                                // onChange={(e) => setInput(e.target.value)}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Number of employees"
                                style={{ color: "rgb(50, 50, 50)" }}
                                name="employees"
                                id="number_field"
                                className="input"
                                //color="white"
                                type="number"
                                inputProps={{ pattern: "[0-9]*" }}
                                value={employees}
                                // onChange={(e) => setInput(e.target.value)}
                                onChange={handleChange}
                            />
                        </div>
                        <div style={{ display: "flex", gap: "20px" }}>
                            <TextField
                                label="E-mail 1"
                                style={{ color: "rgb(50, 50, 50)" }}
                                type="mail-Id"
                                name="email1"
                                id="Mail_field"
                                className="input"
                                //color="white"
                                value={email1}
                                // onChange={(e) => setInput(e.target.value)}
                                onChange={handleChange}
                            />

                            <TextField
                                label="E-mail 2"
                                style={{ color: "rgb(50, 50, 50)" }}
                                type="mail-Id"
                                name="email2"
                                id="Mail_field"
                                className="input"
                                //color="white"
                                value={email2}
                                // onChange={(e) => setInput(e.target.value)}
                                onChange={handleChange}
                            />
                        </div>

                        <TextField
                            label=" company Address"
                            style={{ color: "rgb(50, 50, 50)" }}
                            type="Address"
                            name="Address"
                            id="name_field"
                            className="input"
                            //color="white"
                            //   value={branch}
                            // onChange={(e) => setInput(e.target.value)}
                            onChange={handleChange}
                        />

                        <Select
                            multiple
                            value={role}
                            // onChange={(e) => setRole(e.target.value)}
                            onChange={handleRoleChange}
                            margin="normal"
                            fullWidth
                            variant="outlined"
                            name="role"
                            style={{
                                width: "100%",
                                border: "2px solid white",
                                color: "white",
                            }}
                            renderValue={(selected) =>
                                Array.isArray(selected) ? selected.join(", ") : ""
                            }
                        >
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox checked={role.includes('user')} value="user" onChange={handleRoleChange} />}
                                    label="User"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={role.includes('superadmin')} value="superadmin" onChange={handleRoleChange} />}
                                    label="Super admin"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={role.includes('admin')} value="admin" onChange={handleRoleChange} />}
                                    label="Admin"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={role.includes('statelevel')} value="statelevel" onChange={handleRoleChange} />}
                                    label="State Level"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={role.includes('districtlevel')} value="districtlevel" onChange={handleRoleChange} />}
                                    label="District Level"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={role.includes('localarea')} value="localarea" onChange={handleRoleChange} />}
                                    label="Local Area"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={role.includes('designers')} value="designers" onChange={handleRoleChange} />}
                                    label="Designers"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={role.includes('designchecker')} value="designchecker" onChange={handleRoleChange} />}
                                    label="Design Checker"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={role.includes('proofchecker')} value="proofchecker" onChange={handleRoleChange} />}
                                    label="Proof Checker"
                                />
                            </FormGroup>
                        </Select>


                        <div className="image-upload">
                            <div className="upload-container"
                                onDrop={handleImageDrop}
                                onDragOver={handleDragOver}>
                                <span className="upload-text" id="uploadText" onClick={() => document.getElementById('logoInput').click()}>
                                    <CloudUploadIcon className="upload-icon" style={{ fontSize: 40, color: 'white' }} />
                                    <span className="upload-file">Upload Logo</span>
                                    {/* <br /> */}
                                    <span>Drag logo image or click file here</span>
                                </span>
                                <input
                                    id="logoInput"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    style={{ display: "none" }}
                                />
                            </div>
                        </div>

                        <Button className="btn" type="submit">
                            SUBMIT
                        </Button>
                    </div>
                </Box>
            </form>
        </div>
    );
};

export default CreateCompany;