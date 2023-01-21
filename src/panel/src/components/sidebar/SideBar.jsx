import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, Link } from "react-router-dom";
import { Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import FeedIcon from "@mui/icons-material/Feed";
import PasswordIcon from "@mui/icons-material/Password";
import DashboardIcon from "@mui/icons-material/Dashboard";
import axios from "axios";
import LogoutIcon from "@mui/icons-material/Logout";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import VideocamIcon from "@mui/icons-material/Videocam";
import PeopleIcon from "@mui/icons-material/People";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

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
      path: "gig",
      name: "Gig",
      icon: <WorkIcon />,
    },
    {
      path: "orders",
      name: "Orders",
      icon: <AddBusinessIcon />,
    },
    {
      path: "team",
      name: "Team",
      icon: <PeopleIcon />,
    },
    {
      path: "blogs",
      name: "Blogs",
      icon: <FeedIcon />,
    },
    {
      path: "portfolio",
      name: "Portfolio",
      icon: <WorkHistoryIcon />,
    },
    {
      path: "changePassword",
      name: "Change Password",
      icon: <PasswordIcon />,
    },

    // {
    //   path: "product",
    //   name: "Product",
    //   icon: <AccessAlarmIcon />,
    // },
    // {
    //   path: "productList",
    //   name: "Product List",
    //   icon: <AccessAlarmIcon />,
    // },
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
        <div style={{ width: isOpen ? "240px" : "50px" }} className="sidebar">
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
          {/* // Meeting */}
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
          {/* // logOut */}
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
