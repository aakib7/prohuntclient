import { Grid, Box } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useParams } from "react-router-dom";
import Search from "../Home/Search";

const HeroSection = () => {
  const { category, subcategory } = useParams();
  return (
    <Grid
      container
      sx={{ height: "208px", maxWidth: "100%", backgroundColor: "#011f26" }}
    >
      <Grid item xs={12} ml={3} mt={3}>
        <Breadcrumbs
          aria-label="breadcrumb"
          color="white"
          sx={{ fontSize: { xs: 12, md: 16 } }}
        >
          <Typography sx={{ fontSize: { xs: 12, md: 16 } }}>Home</Typography>
          <Typography sx={{ fontSize: { xs: 12, md: 16 } }}>
            Categories
          </Typography>
          <Typography sx={{ fontSize: { xs: 12, md: 16 } }}>
            {category}
          </Typography>
          {subcategory && (
            <Typography sx={{ fontSize: { xs: 12, md: 16 } }}>
              {subcategory}
            </Typography>
          )}
        </Breadcrumbs>
      </Grid>
      <Grid item xs={12} ml={5}>
        <Typography
          sx={{
            fontSize: { xs: 18, md: 28 },
            fontWeight: "700",
            color: "white",
          }}
        >
          Technology & Programming
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 12, md: 14 },
            fontWeight: "300",
            color: "white",
          }}
        >
          Looking for technology & programming offers and services?
          PeoplePerHour has you covered.
        </Typography>
      </Grid>
      <Grid item xs={12} ml={5}>
        <Box
          sx={{
            maxWidth: { xs: "300px", md: "500px" },
            marginLeft: { xs: 0, md: 20 },
          }}
        >
          <Search />
        </Box>
      </Grid>
    </Grid>
  );
};

export default HeroSection;
