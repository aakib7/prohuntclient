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
import axios from "axios";
import HeroSections from "../MainBanner/HeroSections";
import SingleGigCard from "../cards/SingleGigCard";
import GigHome from "./GigHome";
import JobHome from "./JobHome";
import AllBlogs from "../pages/AllBlogs";
import AllGigs from "../pages/AllGigs";
import AllFreelancers from "../pages/AllFreelancers";
import AllJobs from "../pages/AllJobs";

const Home = () => {
  const [keyword, setKeyword] = React.useState("Freelancer");
  const [search, setSearch] = React.useState("");
  return (
    <>
      <Header />
      <SubHeader />
      {/* // Main Banner */}
      <Box>
        <HeroSections
          setKeyword={setKeyword}
          setSearch={setSearch}
          keyword={keyword}
        />
      </Box>
      {/* //for search */}
      {keyword === "Blog" && search && (
        <AllBlogs header={false} homeSearch={search} />
      )}
      {keyword === "Gigs" && search && (
        <AllGigs header={false} homeSearch={search} />
      )}
      {keyword === "Freelancer" && search && (
        <AllFreelancers header={false} homeSearch={search} />
      )}
      {keyword === "Jobs" && search && (
        <AllJobs header={false} homeSearch={search} />
      )}

      {/* // if search is empty this will show */}
      {!search && (
        <>
          {/* // Horizontal Bar */}
          <Box sx={{ mt: 10 }}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography sx={{ pl: 8 }} variant="h4">
                Categories
              </Typography>
              <Typography
                sx={{ pr: 8, marginTop: 3, textDecoration: "underline" }}
                variant="body2"
              >
                <Link to={"categories"}>All Categories</Link>
              </Typography>
            </Box>

            <Box sx={{ mt: 5 }}>
              <HorizontalCursor />
            </Box>
          </Box>

          {/* Get Start Banner */}
          <Box sx={{ margin: "100px 0px" }}>
            <GetStartBanner />
          </Box>

          {/* Gigs */}
          <Box style={{ marginTop: "50px" }}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography sx={{ pl: 8 }} variant="h4">
                Top Gigs
              </Typography>
              <Typography
                sx={{ pr: 8, marginTop: 3, textDecoration: "underline" }}
                variant="body2"
              >
                <Link to={"gigs"}>All Gigs</Link>
              </Typography>
            </Box>
            <Box sx={{ mt: 4, p: 2 }}>
              <GigHome />
            </Box>
          </Box>

          {/* Freelancer Cards */}
          <Box style={{ marginTop: "50px" }}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography sx={{ pl: 8 }} variant="h4">
                Expert Freelancer
              </Typography>
              <Typography
                sx={{ pr: 8, marginTop: 3, textDecoration: "underline" }}
                variant="body2"
              >
                <Link to={"freelancers"}>All freelancer</Link>
              </Typography>
            </Box>
            <Box sx={{ mt: 4 }}>
              <FreelancerCardsSlider />
            </Box>
          </Box>
          {/* Abouts Cards */}
          <Box sx={{ margin: "100px 0px" }}>
            <AboutCards />
          </Box>

          {/* Jobs */}
          <Box style={{ marginTop: "50px" }}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography sx={{ pl: 8 }} variant="h4">
                Recent Jobs
              </Typography>
              <Typography
                sx={{ pr: 8, marginTop: 3, textDecoration: "underline" }}
                variant="body2"
              >
                <Link to={"jobs"}>All Jobs</Link>
              </Typography>
            </Box>
            <Box sx={{ mt: 4, p: 2 }}>
              <JobHome />
            </Box>
          </Box>

          {/*  Blogs */}
          <Box style={{ marginTop: "50px" }}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography sx={{ pl: 8 }} variant="h4">
                Expert Opinions
              </Typography>
              <Typography
                sx={{ pr: 8, marginTop: 3, textDecoration: "underline" }}
                variant="body2"
              >
                <Link to={"blogs"}>All blogs</Link>
              </Typography>
            </Box>
            <Box sx={{ mt: 4 }}>
              <ExperOpinion />
            </Box>
          </Box>
        </>
      )}
      <Box>
        <Footer />
      </Box>
    </>
  );
};

export default Home;
