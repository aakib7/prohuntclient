import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./src/components/sidebar/SideBar";
import "./style.css";
import { Box } from "@mui/material";
import Header from "../components/Header/Header";
const EmployerPanelHeader = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box style={{ display: "flex", width: "100%" }}>
        <Box>
          <Sidebar />
        </Box>
        <Box style={{ width: "100%" }}>
          <Header />
          <Box sx={{ paddingX: { xs: 1, md: 10 }, paddingY: { xs: 1, md: 5 } }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default EmployerPanelHeader;
