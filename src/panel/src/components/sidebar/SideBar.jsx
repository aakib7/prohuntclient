import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "dashboard",
      name: "Dashboard",
      icon: <AccessAlarmIcon />,
    },
    {
      path: "about",
      name: "About",
      icon: <AccessAlarmIcon />,
    },
    {
      path: "analytics",
      name: "Analytics",
      icon: <AccessAlarmIcon />,
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
    <div className="container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Logo
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <MenuIcon onClick={toggle} />
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
  );
};

export default Sidebar;
