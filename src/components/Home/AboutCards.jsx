import React from "react";
import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import PersonSearchTwoToneIcon from "@mui/icons-material/PersonSearchTwoTone";
import PortraitIcon from "@mui/icons-material/Portrait";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import "./aboutcard.css";
const AboutCards = () => {
  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
        className="sec-box"
      >
        <Grid item xs={12} md={3}>
          <Box
            className="boxes"
            sx={{
              mt: 5,
              pl: 2,
            }}
          >
            <Typography variant="h2" sx={{ padding: "10px" }}>
              2 Million
            </Typography>
            <Typography variant="p">Users active on site</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={3}>
          <Box
            className="boxes"
            sx={{
              mt: 5,
              pl: 2,
            }}
          >
            <Typography variant="h2" sx={{ padding: "10px" }}>
              3 Million
            </Typography>
            <Typography variant="p">Order placed</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={3}>
          <Box
            className="boxes"
            sx={{
              mt: 5,
              pl: 2,
            }}
          >
            <Typography variant="h2" sx={{ padding: "10px" }}>
              3 Million
            </Typography>
            <Typography variant="p">
              Rated freelancers, covering 8,766 skills
            </Typography>
          </Box>
        </Grid>

        <Grid container sx={{ mt: 10, mb: 4, justifyContent: "center" }}>
          <Grid item>
            <Typography
              variant="h3"
              sx={{ paddingX: "90px", mb: 4, justifyContent: "center" }}
            >
              What's great about it?
            </Typography>
          </Grid>

          <Grid container sx={{ marginLeft: 4, mt: 5 }}>
            <Grid item xs={12} md={3}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    display: "flex",
                    paddingTop: "10px",
                    alignItems: "center",
                  }}
                >
                  <span style={{ marginRight: "20px", marginTop: "10px" }}>
                    <PersonSearchTwoToneIcon
                      fontSize="medium"
                      paddingBottom="20px"
                    />
                  </span>
                  Browse portfolios
                </Typography>
                <Typography
                  sx={{ fontSize: 16, fontWeight: "400", paddingRight: "11px" }}
                >
                  Find professionals you can trust by browsing their samples of
                  previous work and reading their profile reviews.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={3}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    display: "flex",
                    paddingTop: "10px",
                    alignItems: "center",
                  }}
                >
                  <span style={{ marginRight: "20px", marginTop: "10px" }}>
                    <PortraitIcon />
                  </span>
                  Fast bids
                </Typography>
                <Typography
                  sx={{ fontSize: 16, fontWeight: "400", paddingRight: "11px" }}
                >
                  Receive obligation free quotes from our talented freelancers
                  fast. 80% of projects get bid on within 60 seconds.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={3}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    display: "flex",
                    paddingTop: "10px",
                    alignItems: "center",
                  }}
                >
                  <span style={{ marginRight: "20px", marginTop: "10px" }}>
                    <HomeRepairServiceIcon />
                  </span>
                  Quality work
                </Typography>
                <Typography
                  sx={{ fontSize: 16, fontWeight: "400", paddingRight: "11px" }}
                >
                  Freelancer.com has by far the largest pool of quality
                  freelancers globally- over 50 million to choose from.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={3}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    display: "flex",
                    paddingTop: "10px",
                    alignItems: "center",
                  }}
                >
                  <span style={{ marginRight: "20px", marginTop: "10px" }}>
                    <StackedLineChartIcon />
                  </span>
                  Track progress
                </Typography>
                <Typography>
                  Keep up-to-date and on-the-go with our time tracker, and
                  mobile app. Always know what freelancers are up to.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AboutCards;
