import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import "./Sidebar.css"


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");

  

  return (
    <div className="sbar" 
    style={{ display: "flex"  }}>
       
      <Box
        sx={{
          "& .pro-sidebar-inner": {
            background: "white!important"
            // borderRadius: "7px !important",
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 20px 10px 20px",
            color: "black",
            fontSize: "10px",
            borderTopLeftRadius:"40px",
            borderBottomLeftRadius:"40px",
            borderTopRightRadius:"40px",
            borderBottomRightRadius:"40px",
          },
          "& .pro-inner-item-content": {
            fontSize: "10px",
          },
          "& .pro-inner-item:hover": {
            color: "#293e92 !important",
          },
          "& .pro-menu-item.active": {
            color: "#293e92 !important",
            background: "linear-gradient(130deg,#ffedbc,#fbb2c1, #ed4264)",
            borderTopLeftRadius:"40px",
            borderBottomLeftRadius:"40px",
            borderTopRightRadius:"40px",
            borderBottomRightRadius:"40px",
          },
        }}
      >
        <ProSidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
        <div className="toggle">
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon= { <MenuOutlinedIcon /> }
              // icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
                padding: "0",
                width:"fitContent"
              }}
            ></MenuItem>
            </div>

            <Box >
              <Item
                title="Dashboard"
                to="/dashboard"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Users"
                to="/users"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Profile"
                to="/profile"
                icon={<AccountCircleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Projects"
                to="/projects"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Task"
                to="/task-list"
                icon={<AssignmentOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Tickets"
                to="/tickets"
                icon={<ConfirmationNumberOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Calendar"
                to="/calendar"
                icon={<CalendarTodayOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Payments"
                to="/payments"
                icon={<PaymentsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Charts"
                to="/charts"
                icon={<BarChartOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    </div>
  );
};

export default Sidebar;
