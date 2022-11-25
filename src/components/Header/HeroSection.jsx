import { Grid, Box } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useParams } from "react-router-dom";
import Search from "../Home/Search";

const HeroSection = ({ setSearch }) => {
  const { categoryName, subcategory, categoryId } = useParams();
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
          <Link style={{ color: "white" }} to={"/"}>
            <Typography sx={{ fontSize: { xs: 12, md: 16 } }}>Home</Typography>
          </Link>

          {/* <Typography sx={{ fontSize: { xs: 12, md: 16 } }}>
            Categories
          </Typography> */}
          {categoryName && (
            <Link
              style={{ color: "white" }}
              to={`/${categoryName}/${categoryId}`}
            >
              <Typography sx={{ fontSize: { xs: 12, md: 16 } }}>
                {categoryName}
              </Typography>
            </Link>
          )}
          {subcategory && (
            <Link
              style={{ color: "white" }}
              to={`/${categoryName}/${categoryId}/${subcategory}`}
            >
              <Typography sx={{ fontSize: { xs: 12, md: 16 } }}>
                {subcategory}
              </Typography>
            </Link>
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
          {categoryName}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 12, md: 14 },
            fontWeight: "300",
            color: "white",
          }}
        >
          Looking for offers and services?
          <strong> Prohunt</strong> has you covered.
        </Typography>
      </Grid>
      <Grid item xs={12} ml={5}>
        <Box
          sx={{
            maxWidth: { xs: "300px", md: "500px" },
            marginLeft: { xs: 0, md: 20 },
          }}
        >
          <Search setSearch={setSearch} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default HeroSection;
