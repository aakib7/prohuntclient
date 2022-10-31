import React from "react";
import { Box, Grid, Pagination, Typography } from "@mui/material";
import Header from "../Header/Header";
import SubHeader from "../Header/SubHeader";
import HeroSection from "../Header/HeroSection";
import Footer from "../Footer/Footer";
import { Link, useParams } from "react-router-dom";
import image from "../../assests/images/main-banner1.jpg";
import SingleGigCard from "../cards/SingleGigCard";
import FilterSideBar from "./FilterSideBar";
const GigsList = () => {
  // const { category, subcategory } = useParams();
  const id = 23;
  return (
    <Box>
      {/* main Nav  */}
      <Box>
        <Header />
        <SubHeader />
        <HeroSection />
      </Box>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 7 }}>
          <FilterSideBar />
        </Box>
      </Box>
      {/* Cards */}
      <Box
        sx={{
          display: "flex",
          mt: 7,
          width: "100%",
          paddingX: "3%",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <Link to={`${id}`}>
              <SingleGigCard
                title={"I Can Design Your Website"}
                imgage={image}
                avatar={image}
                author={"aakib Javed"}
              />
            </Link>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <SingleGigCard
              title={"I Can Design Your Website"}
              imgage={image}
              avatar={image}
              author={"aakib Javed"}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <SingleGigCard
              title={"I Can Design Your Website"}
              imgage={image}
              avatar={image}
              author={"aakib Javed"}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <SingleGigCard
              title={"I Can Design Your Website"}
              imgage={image}
              avatar={image}
              author={"aakib Javed"}
            />
          </Grid>{" "}
          <Grid item xs={12} md={6} lg={4}>
            <SingleGigCard
              title={"I Can Design Your Website"}
              imgage={image}
              avatar={image}
              author={"aakib Javed"}
            />
          </Grid>{" "}
          <Grid item xs={12} md={6} lg={4}>
            <SingleGigCard
              title={"I Can Design Your Website"}
              imgage={image}
              avatar={image}
              author={"aakib Javed"}
            />
          </Grid>{" "}
          <Grid item xs={12} md={6} lg={4}>
            <SingleGigCard
              title={"I Can Design Your Website"}
              imgage={image}
              avatar={image}
              author={"aakib Javed"}
            />
          </Grid>{" "}
          <Grid item xs={12} md={6} lg={4}>
            <SingleGigCard
              title={"I Can Design Your Website"}
              imgage={image}
              avatar={image}
              author={"aakib Javed"}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Pagination count={10} variant="outlined" shape="rounded" />
      </Box>
      {/* Footer */}
      <Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default GigsList;
