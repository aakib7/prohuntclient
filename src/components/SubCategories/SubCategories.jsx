import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import Header from "../Header/Header";
import SubHeader from "../Header/SubHeader";
import HeroSection from "../Header/HeroSection";
import Footer from "../Footer/Footer";
import { Link, useParams, NavLink } from "react-router-dom";
import CategoryCard from "../cards/CategoryCard";
import image from "../../assests/images/main-banner1.jpg";
const SubCategories = () => {
  const { category } = useParams();
  const x = "webdevelopment";
  return (
    <Box>
      {/* main Nav  */}
      <Box>
        <Header />
        <SubHeader />
        <HeroSection />
      </Box>
      {/* heading */}
      <Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 7 }}>
          <Typography variant="h5">Popular {category} Categories</Typography>
        </Box>
      </Box>

      {/* Cards */}
      <Box
        sx={{
          display: "flex",
          mt: 7,
          width: "100%",
          paddingX: "10%",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={4} lg={3}>
            <Link to={`${x}/gigs`}>
              <CategoryCard title={"Web Development"} image={image} />
            </Link>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={3}>
            <CategoryCard title={"Texhnology"} image={image} />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={3}>
            <CategoryCard title={"Texhnology"} image={image} />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={3}>
            <CategoryCard title={"Texhnology"} image={image} />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={3}>
            <CategoryCard title={"Texhnology"} image={image} />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={3}>
            <CategoryCard title={"Texhnology"} image={image} />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={3}>
            <CategoryCard title={"Texhnology"} image={image} />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={3}>
            <CategoryCard title={"Texhnology"} image={image} />
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default SubCategories;
