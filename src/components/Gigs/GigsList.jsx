import React, { useEffect, useState } from "react";
import { Box, Grid, Pagination, Typography } from "@mui/material";
import Header from "../Header/Header";
import SubHeader from "../Header/SubHeader";
import HeroSection from "../Header/HeroSection";
import Footer from "../Footer/Footer";
import { Link, useParams } from "react-router-dom";
import image from "../../assests/images/main-banner1.jpg";
import SingleGigCard from "../cards/SingleGigCard";
import FilterSideBar from "./FilterSideBar";
import axios from "axios";
const GigsList = () => {
  const { subcategory } = useParams();
  const [gigs, setGigs] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      const request = await axios.get("/gigs?category=" + subcategory);
      setGigs(request.data.Gigs);
      setLoading(false);
      return request;
    }
    fetchCategories();
  }, []);
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
          {!loading && gigs.length == 0 && <h1>No Gigs</h1>}
          {loading
            ? "loading"
            : gigs.map((gig) => (
                <>
                  <Grid item xs={12} md={6} lg={4}>
                    <Link to={`${id}`} style={{ textTransform: "capitalize" }}>
                      <SingleGigCard
                        title={gig.title}
                        imgage={image}
                        avatar={image}
                        price={gig.price}
                        author={`${gig.owner.firstName} ${gig.owner.lastName}`}
                        rating={gig.rating}
                      />
                    </Link>
                  </Grid>
                </>
              ))}
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
