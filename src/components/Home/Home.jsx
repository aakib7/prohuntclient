import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import Banner from "./Banner";
import FreelancerCardsSlider from "./FreelancerCardsSlider";
import GetStartBanner from "./GetStartBanner";
import HorizontalCursor from "./HorizontalCursor";
import SubHeader from "../Header/SubHeader";
import { Link } from "react-router-dom";
import AboutCards from "./AboutCards";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Footer from "../Footer/Footer";
import ExperOpinion from "./ExperOpinion";
import Header from "../Header/Header";
const Home = () => {
  return (
    <>
      <Header />
      <SubHeader />
      {/* // Main Banner */}
      <Box>
        <Banner />
      </Box>
      {/* // Horizontal Bar */}
      <Box sx={{ mt: 10 }}>
        <Box sx={{ pl: 8 }}>
          <Typography variant="h4">Most Poupolar Categories</Typography>
        </Box>
        <Box sx={{ mt: 5 }}>
          <HorizontalCursor />
        </Box>
      </Box>
      {/* Get Start Banner */}
      <Box sx={{ margin: "100px 0px" }}>
        <GetStartBanner />
      </Box>
      {/* Freelancer Cards */}
      <Box>
        <Box sx={{ pl: 8 }}>
          <Typography variant="h4">Expert Freelancer</Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          <FreelancerCardsSlider />
        </Box>
        <Box sx={{ position: "relative", bgcolor: "red" }}>
          <Link
            to={""}
            style={{
              position: "absolute",
              right: 90,
              marginTop: 10,
            }}
          >
            All Freelancer
            <ArrowRightAltIcon sx={{ position: "absolute" }} />
          </Link>
        </Box>
      </Box>
      {/* Abouts Cards */}
      <Box sx={{ margin: "100px 0px" }}>
        <AboutCards />
      </Box>
      {/* Abouts Cards */}

      <Box>
        <Box sx={{ pl: 8 }}>
          <Typography variant="h4">Expert Opinions</Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          <ExperOpinion />
        </Box>
      </Box>

      <Box>
        <Footer />
      </Box>
    </>
  );
};

export default Home;
