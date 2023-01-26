import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import styled from "@emotion/styled";
import logo from "../../assests/images/logo.png";
import { Link } from "react-router-dom";
import "./footer.css";
import { Stack } from "@mui/system";

const Footer = () => {
  return (
    <>
      <Grid
        container
        sx={{
          border: "0.5px solid",
          backgroundColor: "#025e73",
          color: "white",
          mt: 10,
          paddingTop: 8,
          paddingX: 4,
        }}
      >
        <Stack md={12} direction={"row"} sx={{ pb: 4 }}>
          <Grid item md={4} sx={{}}>
            <img className="footer-img" src={logo} />
            <Grid item xs={12} sx={{ paddingTop: 1 }}>
              <Typography sx={{ pr: 2 }}>
                ProHunt is a top rated freelancing platform globally, serving
                more than 2 million+ people.
              </Typography>
            </Grid>
            <Grid container>
              <Grid item sx={{ mt: 2 }}>
                <span style={{ marginRight: "20px" }}>
                  <FacebookIconStyled />
                </span>
                <span style={{ marginRight: "20px" }}>
                  <LinkedInIconStyled />
                </span>
                <span style={{ marginRight: "20px" }}>
                  <InstagramIconStyled />
                </span>
                <TwitterIconStyled />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4} mt={0} ml={3}>
            <Grid item xs={12}>
              <h2>Newsletter</h2>
              <Typography sx={{ mt: 1 }}>
                Subsribe to our newsletter to updates
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <form>
                <TextField
                  id="search-bar"
                  placeholder="Enter your email..."
                  size="small"
                  sx={{ backgroundColor: "white", borderRadius: 2 }}
                />

                <Button
                  sx={{ backgroundColor: "red", ml: 1 }}
                  variant="contained"
                >
                  SUBSCRIBE
                </Button>
              </form>
            </Grid>
          </Grid>
          <Grid item md={2} sx={{ ml: 16 }}>
            <Grid item xs={12} sx={{ marginBottom: 1 }}>
              <h2>Product</h2>
            </Grid>
            <Grid item xs={12}>
              <Link
                to="/aboutus"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography>About</Typography>
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link
                to="/howtowork"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography>How it Works</Typography>
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link
                to="/team"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography>Team</Typography>
              </Link>
            </Grid>
          </Grid>
          <Grid item md={2}>
            <Grid item xs={12}>
              <h2>Support</h2>
              <Grid item xs={12} sx={{ mt: 1 }}>
                <Link
                  to="/contactus"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Typography>Contact Us</Typography>
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Link
                  to="/policy"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Typography>Our Policy</Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Stack>
        <Grid item md={12} sx={{ mt: 4 }} className="bottom-bar">
          <Stack direction={"row"}>
            <Grid item md={6}>
              <Typography>ProHunt @2023</Typography>
            </Grid>
            <Grid
              item
              md={6}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button sx={{ background: "#F2A71B", color: "black" }}>
                Get Started
              </Button>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;

const LinkedInIconStyled = styled(LinkedInIcon)`
  cursor: pointer;
  &:hover {
    color: #f2a71b;
  }
`;
const TwitterIconStyled = styled(TwitterIcon)`
  cursor: pointer;
  &:hover {
    color: #f2a71b;
  }
`;
const FacebookIconStyled = styled(FacebookIcon)`
  cursor: pointer;
  &:hover {
    color: #f2a71b;
  }
`;
const InstagramIconStyled = styled(InstagramIcon)`
  cursor: pointer;
  &:hover {
    color: #f2a71b;
  }
`;
