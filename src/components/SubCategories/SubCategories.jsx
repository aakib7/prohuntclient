import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Header from "../Header/Header";
import SubHeader from "../Header/SubHeader";
import HeroSection from "../Header/HeroSection";
import Footer from "../Footer/Footer";
import { Link, useParams, NavLink } from "react-router-dom";
import CategoryCard from "../cards/CategoryCard";
// import image from "../../assests/images/main-banner1.jpg";
import axios from "axios";
import FullPageLoading from "../others/FullPageLoading";

const SubCategories = () => {
  const { categoryId, categoryName } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

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

  useEffect(() => {
    searchItems(search);
  }, [search]);

  const searchItems = (search) => {
    if (search !== "") {
      const filteredData = categories.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(categories);
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
      {loading && (
        <Box>
          <FullPageLoading />
        </Box>
      )}
      {!loading && error && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Typography>Somthing happend bad try again Later</Typography>
        </Box>
      )}
      {!loading && categories.length <= 0 && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Typography>No Sub Categories To show</Typography>
        </Box>
      )}
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
          {search.length > 1
            ? filteredResults?.map((category) => {
                return (
                  <>
                    <Grid item xs={12} sm={4} md={4} lg={3}>
                      <Link to={`${category.name}`}>
                        <CategoryCard
                          title={category.name}
                          image={`http://localhost:4000/${category.imageUrl}`}
                        />
                      </Link>
                    </Grid>
                  </>
                );
              })
            : categories?.map((category) => (
                <>
                  <Grid item xs={12} sm={4} md={4} lg={3}>
                    <Link to={`${category.name}`}>
                      <CategoryCard
                        title={category.name}
                        image={`http://localhost:4000/${category.imageUrl}`}
                      />
                    </Link>
                  </Grid>
                </>
              ))}
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
