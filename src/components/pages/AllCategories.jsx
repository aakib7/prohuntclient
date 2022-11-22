import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import HeroSection from "../Header/HeroSection";
import SubHeader from "../Header/SubHeader";
import { Grid, Typography, Box } from "@mui/material";
import FullPageLoading from "../others/FullPageLoading";
import { Link } from "react-router-dom";
import CategoryCard from "../cards/CategoryCard";

const AllCategories = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:4000/category`;
      const { data } = await axios.get(url);
      setLoading(false);
      setCategories(data.categories);
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        // setError(error.response.data.message);
        setError(true);
      }
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      <Header />
      <SubHeader />
      <HeroSection />
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "80vh",
          }}
        >
          <FullPageLoading />
        </Box>
      )}
      {!loading && error && (
        <Typography>Somthing happend bad try again Later</Typography>
      )}
      {/* {!loading && gigs.length <= 0 && <Typography>No Gigs To Show</Typography>} */}
      {categories && (
        <Grid container marginLeft={5}>
          {categories?.map((category) => {
            return (
              <>
                <Grid item xs={12} md={6} lg={4} mt={10}>
                  <Link
                    to={`/${category?.name}/${category?._id}`}
                    style={{ textTransform: "capitalize" }}
                  >
                    <CategoryCard
                      title={category?.name}
                      image={"http://localhost:4000/" + category?.imageUrl}
                    />
                  </Link>
                </Grid>
              </>
            );
          })}
        </Grid>
      )}
      <Footer />
    </>
  );
};

export default AllCategories;
