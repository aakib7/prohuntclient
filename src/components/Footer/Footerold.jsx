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
      <Grid
        container
        sx={{
          border: "0.5px solid",
          backgroundColor: "#025e73",
          color: "white",
          mt: 10,
        }}
      >
        <Grid Item xs={12}>
          <Typography
            variant="h3"
            sx={{ marginLeft: "30px", color: "#f2a71b" }}
          >
            Prohunt
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
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
          <Typography marginLeft={5}>Team</Typography>
          <Typography marginLeft={5}>About</Typography>
          <Typography marginLeft={5}>About</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
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
          <Typography marginLeft={5}>How its work</Typography>
          <Typography marginLeft={5}>Trust & Safty</Typography>
          <Typography marginLeft={5}>Help Center</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
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
          <Typography marginLeft={5}>Guides</Typography>
          <Typography marginLeft={5}>Stories</Typography>
          <Typography marginLeft={5}>News</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
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
          <Typography marginLeft={5}>Customer Sites</Typography>
          <Typography marginLeft={5}>Bussiness</Typography>
          <Typography marginLeft={5}>Startup Cities</Typography>
        </Grid>

        {/* Icons */}
        <Grid container>
          <Grid item sx={{ marginLeft: 5, mt: 2 }}>
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

        <hr
          style={{ backgroundColor: "white", height: "1.5px", width: "100%" }}
        />
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
