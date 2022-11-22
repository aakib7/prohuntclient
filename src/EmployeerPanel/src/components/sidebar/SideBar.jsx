import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { Typography, Box, Stack } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import FeedIcon from "@mui/icons-material/Feed";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "",
      name: "Dashboard",
      icon: <AccessAlarmIcon />,
    },
    {
      path: "jobs",
      name: "Jobs",
      icon: <WorkIcon />,
    },
    {
      path: "blogs",
      name: "Blogs",
      icon: <FeedIcon />,
    },
    {
      path: "comment",
      name: "Comment",
      icon: <AccessAlarmIcon />,
    },
    {
      path: "product",
      name: "Product",
      icon: <AccessAlarmIcon />,
    },
    {
      path: "productList",
      name: "Product List",
      icon: <AccessAlarmIcon />,
    },
  ];
  return (
    <>
      <div className="container">
        <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
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
        </div>
      </div>
    </>
  );
};

export default Sidebar;
