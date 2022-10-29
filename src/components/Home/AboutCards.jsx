import React from "react";
import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import PersonSearchTwoToneIcon from "@mui/icons-material/PersonSearchTwoTone";
import PortraitIcon from "@mui/icons-material/Portrait";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
const AboutCards = () => {
  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          bgcolor: "#a5a692",
        }}
      >
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              height: "130px",
              backgroundColor: "#a5a692",
              mt: 5,
              pl: 2,
              boxShadow: "2px 2px black",
            }}
          >
            <Typography variant="h2" sx={{ color: "#011f26", padding: "10px" }}>
              3 Million
            </Typography>
            <Typography variant="p" sx={{ color: "#011f26" }}>
              3 rated freelancers, covering 8,766 skills
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={3}>
          <Box
            sx={{
              height: "130px",
              backgroundColor: "#a5a692",
              mt: 5,
              pl: 2,
              boxShadow: "2px 2px black",
            }}
          >
            <Typography variant="h2" sx={{ color: "#011f26", padding: "10px" }}>
              3 Million
            </Typography>
            <Typography variant="p" sx={{ color: "#011f26" }}>
              3 rated freelancers, covering 8,766 skills
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={3}>
          <Box
            sx={{
              height: "130px",
              backgroundColor: "#a5a692",
              mt: 5,
              pl: 2,
              boxShadow: "2px 2px black",
            }}
          >
            <Typography variant="h2" sx={{ color: "#011f26", padding: "10px" }}>
              3 Million
            </Typography>
            <Typography variant="p" sx={{ color: "#011f26" }}>
              3 rated freelancers, covering 8,766 skills
            </Typography>
          </Box>
        </Grid>

        <Grid container sx={{ mt: 10 }}>
          <Grid item>
            <Typography variant="h4" sx={{ paddingX: "90px" }}>
              What's great about it?
            </Typography>
          </Grid>

          <Grid container sx={{ marginLeft: 2, mt: 5 }}>
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
                  <span style={{ marginRight: "10px" }}>
                    <PersonSearchTwoToneIcon fontSize="medium" />
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
                  <span style={{ marginRight: "10px" }}>
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
                  <span style={{ marginRight: "10px" }}>
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
                    alignItems: "center",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
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
