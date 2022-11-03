import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Header from "../Header/Header";
import SubHeader from "../Header/SubHeader";
import HeroSection from "../Header/HeroSection";
import Footer from "../Footer/Footer";
import { Link, useParams, NavLink } from "react-router-dom";
import CategoryCard from "../cards/CategoryCard";
import image from "../../assests/images/main-banner1.jpg";
import axios from "axios";

const SubCategories = () => {
  const { categoryId, categoryName } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubCategories() {
      setLoading(true);
      axios
        .get(`/category/${categoryId}`)
        .then((response) => {
          setCategories(response.data.category.subCategories);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
    fetchSubCategories();
  }, [categoryId]);
  // categories.map((cat) => console.log(cat));

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
          <Typography variant="h5">
            Popular {categoryName} Categories
          </Typography>
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
          {!loading && categories.length === 0 && <h1>No Sub Categories</h1>}
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            categories.map((category) => (
              <>
                <Grid item xs={12} sm={4} md={4} lg={3}>
                  <Link to={`${category.name}/gigs`}>
                    <CategoryCard
                      title={category.name}
                      image={`http://localhost:4000/${category.imageUrl}`}
                    />
                  </Link>
                </Grid>
              </>
            ))
          )}
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
