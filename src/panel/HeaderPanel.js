import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./src/components/sidebar/SideBar";
import "./style.css";
import { Box } from "@mui/material";
const Header = () => {
  return (
    <>
      <>
        <Box style={{ display: "flex", flexDirection: "row" }}>
          <Box style={{ display: "flex" }}>
            <Sidebar />
          </Box>
          <Box style={{ display: "flex" }}>
            <Outlet />
          </Box>
        </Box>
      </>
    </>
  );
};

export default Header;
