import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import BannerImage from "../../assests/images/main-banner.jpg";
import { Link } from "react-router-dom";

const GetStartBanner = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <>
      <Grid container sx={{ backgroundColor: "rgb(238, 238, 238)" }}>
        <Grid item xs={12} md={6}>
          <Box>
            <img src={BannerImage} style={{ width: "100%", height: "100%" }} />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid container sx={{ mt: 5 }}>
            <Grid item xs={12} sx={{ marginLeft: 6 }}>
              <Typography
                variant="h1"
                sx={{
                  color: "#011f26",
                  fontSize: { xs: 30, md: 40 },
                  fontWeight: 500,
                  marginTop: "20px",
                }}
              >
                Getting work done has never been easier
              </Typography>
            </Grid>

            <Grid item xs={12} sx={{ marginLeft: 6 }}>
              <Typography
                sx={{
                  color: "#011f26",
                  fontSize: { xs: 14, md: 16 },
                  fontWeight: 400,
                  marginTop: "20px",
                }}
              >
                <h3>Easy employee handling</h3>
              </Typography>
            </Grid>

            <Grid item xs={12} sx={{ marginLeft: 6 }}>
              <Typography
                sx={{
                  color: "#011f26",
                  fontSize: { sm: 14, md: 16 },
                  fontWeight: 400,
                  marginTop: "20px",
                }}
              >
                <h3>Get matched with expert freelancers in minutes</h3>
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ marginLeft: 6 }}>
              <Typography
                sx={{
                  color: "#011f26",
                  fontSize: { sm: 14, md: 16 },
                  fontWeight: 400,
                  marginTop: "20px",
                }}
              >
                <h3>Services on palm</h3>
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ marginLeft: { xs: 10, md: 6 } }}>
              <StyledButton
                variant="contained"
                sx={{
                  fontWeight: "900",
                  fontSize: "25",
                  color: "white",
                  height: "53px",
                  width: "202px",
                  marginTop: "24px",
                }}
              >
                <Link
                  style={{ color: "white" }}
                  to={
                    isAuthenticated
                      ? user?.role === "freelancer"
                        ? "panel/gig"
                        : "employer/jobs"
                      : "/registration"
                  }
                >
                  Start Now
                </Link>
              </StyledButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default GetStartBanner;

const StyledButton = styled(Button)`
  background-color: #f2a71b;
  color: #fff;
  &:hover {
    background-color: #025e73;
  }
`;
