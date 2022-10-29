import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import styled from "@emotion/styled";
const Footer = () => {
  return (
    <>
      <Box
        style={{
          border: "0.5px solid",
          backgroundColor: "#025e73",
          color: "white",
          marginTop: "70px",
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <h1 style={{ marginLeft: "30px", color: "#f2a71b" }}>Prohunt</h1>
          </Grid>
        </Grid>

        {/* Footer Body */}
        <Grid container sx={{ mt: 2 }}>
          <Grid item md={3} xs={12}>
            <Grid container>
              <Typography
                sx={{
                  fontSize: "19px",
                  fontWeight: "600",
                  //   padding: "4.8px 0px 12px",
                  color: "white",
                  marginLeft: 5,
                }}
              >
                Product
              </Typography>
            </Grid>
            <Grid container>
              <Typography marginLeft={5}>Team</Typography>
            </Grid>
            <Grid container>
              <Typography marginLeft={5}>About</Typography>
            </Grid>
            <Grid container>
              <Typography marginLeft={5}>Careers</Typography>
            </Grid>
          </Grid>
          <Grid item md={3} xs={12}>
            <Grid container>
              <Typography
                sx={{
                  fontSize: "19px",
                  fontWeight: "600",
                  //   padding: "4.8px 0px 12px",
                  color: "white",
                  marginLeft: 5,
                }}
              >
                Support
              </Typography>
            </Grid>
            <Grid container>
              <Typography marginLeft={5}>How its work</Typography>
            </Grid>
            <Grid container>
              <Typography marginLeft={5}>Trust & Safty</Typography>
            </Grid>
            <Grid container marginLeft={5}>
              Help Center
            </Grid>
          </Grid>
          <Grid item md={3} xs={12}>
            <Grid container>
              <Typography
                sx={{
                  fontSize: "19px",
                  fontWeight: "600",
                  //   padding: "4.8px 0px 12px",
                  color: "white",
                  marginLeft: 5,
                }}
              >
                Discover
              </Typography>
            </Grid>
            <Grid container>
              <Typography marginLeft={5}>Guides</Typography>
            </Grid>
            <Grid container>
              <Typography marginLeft={5}>Stories</Typography>
            </Grid>
            <Grid container>
              <Typography marginLeft={5}>News</Typography>
            </Grid>
          </Grid>
          <Grid item md={3} xs={12}>
            <Grid container>
              <Typography
                sx={{
                  fontSize: "19px",
                  fontWeight: "600",
                  //   padding: "4.8px 0px 12px",
                  color: "white",
                  marginLeft: 5,
                }}
              >
                Resources
              </Typography>
            </Grid>
            <Grid container>
              <Typography marginLeft={5}>Customers Stories</Typography>
            </Grid>
            <Grid container>
              <Typography marginLeft={5}>Business Card</Typography>
            </Grid>
            <Grid container>
              <Typography marginLeft={5}>Start Up Cities</Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Icons */}
        <Grid container>
          <Grid item sx={{ marginLeft: 5, mt: 2 }}>
            <span style={{ marginRight: "20px" }}>
              <FacebookIconStyled />
            </span>
            <span style={{ marginRight: "20px" }}>
              <InstagramIconStyled />
            </span>
            <span style={{ marginRight: "20px" }}>
              <LinkedInIconStyled />
            </span>
            <TwitterIconStyled />
          </Grid>
        </Grid>

        <hr style={{ backgroundColor: "white", height: "1.5px" }} />
        {/* Privacy Policy */}
        <Grid container style={{ padding: "20px" }}>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <Typography fontSize={13} fontWeight={300}>
              Terms
            </Typography>
            <Typography fontSize={13} fontWeight={300}>
              Privacy
            </Typography>
            <Typography fontSize={13} fontWeight={300}>
              Site Map
            </Typography>
            <Typography fontSize={13} fontWeight={300}>
              © 2022 ProHunt Ltd
            </Typography>
          </Grid>
        </Grid>
      </Box>
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
