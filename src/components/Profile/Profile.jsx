import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import About from "./About";
import SideBar from "./SideBar";

const Profile = () => {
  return (
    <>
      <Box
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff,rgba(2, 94, 115, 0.4))",
        }}
      >
        <Header />
        <Container
          sx={{
            width: "90%",
            backgroundImage:
              "linear-gradient(to top,rgba(192, 192, 192, 0.3) ,#fff)",
            marginTop: 3,
          }}
        >
          <Grid container spacing={2}>
            <Grid item md={3}>
              <SideBar />
            </Grid>

            <Divider orientation="vertical" flexItem />

            <Grid item md={8}>
              <About />
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default Profile;
