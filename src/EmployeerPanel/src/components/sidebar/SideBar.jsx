import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import FeedIcon from "@mui/icons-material/Feed";
import PasswordIcon from "@mui/icons-material/Password";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import VideocamIcon from "@mui/icons-material/Videocam";
import BlockIcon from "@mui/icons-material/Block";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "",
      name: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      path: "jobs",
      name: "Jobs",
      icon: <WorkIcon />,
    },
    {
      path: "orders",
      name: "Orders",
      icon: <WorkIcon />,
    },
    {
      path: "blogs",
      name: "Blogs",
      icon: <FeedIcon />,
    },
    {
      path: "changePassword",
      name: "Change Password",
      icon: <PasswordIcon />,
    },
  ];
  const logout = () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    axios
      .get(`http://localhost:4000/user/logout`, config)
      .then((response) => {
        window.location.reload(true);
      })
      .catch((error) => {});
  };
  return (
    <>
      <div className="container">
        <div style={{ width: isOpen ? "250px" : "50px" }} className="sidebar">
          <div className="top_section">
            <Typography
              variant="h4"
              style={{
                display: isOpen ? "block" : "none",
                color: "#f2a71b",
              }}
              className="logo"
            >
              ProHunt
            </Typography>
            <div
              style={{ marginLeft: isOpen ? "20px" : "0px" }}
              className="bars"
            >
              <MenuIcon onClick={toggle} sx={{ fontSize: "40px" }} />
            </div>
          </div>
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeclassName="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}

          <div>
            <a
              href="https://prohuntmeet.bubbleapps.io/version-test"
              className="link"
              target="_blank"
              activeclassName="active"
            >
              <div className="icon">
                <VideocamIcon />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Create Meeting
              </div>
            </a>
          </div>
          {/* // deactive */}

          <div>
            <NavLink className="link" activeclassName="active">
              <div className="icon">
                <BlockIcon />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Deavtivate Account
              </div>
            </NavLink>
          </div>

          {/* //x/ */}

          <div>
            <NavLink
              className="link"
              activeclassName="active"
              onClick={() => {
                logout();
              }}
            >
              <div className="icon">
                <LogoutIcon />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Log Out
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
