import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Pagination, styled } from "@mui/material";
import Header from "../Header/Header";
import SubHeader from "../Header/SubHeader";
import HeroSection from "../Header/HeroSection";
import Footer from "../Footer/Footer";
import { Link, useParams } from "react-router-dom";
import image from "../../assests/images/main-banner1.jpg";
import SingleGigCard from "../cards/SingleGigCard";
import FilterSideBar from "../FilterSideBar/FilterSideBar";
import axios from "axios";
import WorkIcon from "@mui/icons-material/Work";
import BadgeIcon from "@mui/icons-material/Badge";
import ArticleIcon from "@mui/icons-material/Article";
import GigsList from "../Gigs/GigsList";
import JobList from "../Jobs/JobList";
import BlogList from "../Blogs/BlogList";
const ListHeader = () => {
  const [gigButton, setGigButton] = useState(true);
  const [jobButton, setJobButton] = useState(false);
  const [blogButton, setBlogButton] = useState(false);
  const [search, setSearch] = useState("");

  const handleGigClick = () => {
    if (jobButton || blogButton) {
      setGigButton(true);
      setJobButton(false);
      setBlogButton(false);
    }
  };
  const handleJobClick = () => {
    if (gigButton || blogButton) {
      setGigButton(false);
      setJobButton(true);
      setBlogButton(false);
    }
  };
  const handleBlogClick = () => {
    if (gigButton || jobButton) {
      setGigButton(false);
      setJobButton(false);
      setBlogButton(true);
    }
  };
  return (
    <Box>
      {/* main Nav  */}
      <Box>
        <Header />
        <SubHeader />
        <HeroSection setSearch={(search) => setSearch(search)} />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flextStart",
          mt: 7,
          ml: { xs: 4, md: 10 },
        }}
      >
        {blogButton ? "" : <FilterSideBar />}
        <StyledButton
          autoFocus
          startIcon={<BadgeIcon />}
          sx={{
            ml: { xs: 4, md: 10 },
          }}
          onClick={() => handleGigClick()}
        >
          Gigs
        </StyledButton>
        <StyledButton
          startIcon={<WorkIcon />}
          sx={{
            ml: { xs: 4, md: 10 },
          }}
          onClick={() => handleJobClick()}
        >
          Jobs
        </StyledButton>
        <StyledButton
          startIcon={<ArticleIcon />}
          sx={{
            ml: { xs: 4, md: 10 },
          }}
          onClick={() => handleBlogClick()}
        >
          Blogs
        </StyledButton>
      </Box>

      {/* Cards */}
      {gigButton && <GigsList search={search} />}
      {jobButton && <JobList search={search} />}
      {blogButton && <BlogList search={search} />}

      {/* Footer */}
      <Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default ListHeader;

const StyledButton = styled(Button)`
  background-color: #f2a71b;
  color: #fff;
  &:hover {
    background-color: #025e73;
  }
  &:focus {
    background-color: #025e73;
  }
`;
