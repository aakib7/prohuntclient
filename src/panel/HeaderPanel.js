import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./src/components/sidebar/SideBar";
import "./style.css";
import { Box, Stack } from "@mui/material";
import Header from "../components/Header/Header";
const HeaderPanel = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        style={{
          display: "flex",
          width: "100%",
          backgroundImage:
            "linear-gradient(to right, #fff,rgba(2, 94, 115, 0.4))",
        }}
      >
        <Box
          style={{
            height: "100%",
          }}
        >
          <Sidebar />
        </Box>
        <Box style={{ width: "100%" }}>
          <Header />
          <Box sx={{ paddingX: { xs: 1, md: 10 }, paddingY: { xs: 1, md: 1 } }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default HeaderPanel;
