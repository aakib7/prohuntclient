import React from "react";
import { Box, Button, Container, Typography, styled } from "@mui/material";
import Grid from "@mui/material/Grid";
import img from "../assests/images/404.jpeg";
import Header from "../components/Header/Header";
import SubHeader from "../components/Header/SubHeader";
import Footer from "../components/Footer/Footer";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Header />
      <SubHeader />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundImage:
            "linear-gradient(to top, #fff,rgba(2, 94, 115, 0.4))",
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid xs={6}>
              <Typography variant="h2">404</Typography>
              <Typography variant="h6">
                The page you’re looking for doesn’t exist.
              </Typography>
              <Box style={{ marginTop: "30px" }}>
                <StyledButton startIcon={<HomeIcon />} variant="contained">
                  <Link style={{ color: "white" }} to={"/"}>
                    Back Home
                  </Link>
                </StyledButton>
              </Box>
            </Grid>
            <Grid xs={6}>
              <img src={img} alt="" width={500} height={250} />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default NotFound;
const StyledButton = styled(Button)`
  background-color: #f2a71b;
  color: #fff;
  &:hover {
    background-color: #025e73;
  }
`;
