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
import Pagination from "@mui/material/Pagination";

const AllCategories = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [search, setSearch] = useState("");
  const [total, setTotla] = useState(0);
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:4000/category?page=${page}&limit=${limit}&search=${search}`;
      const { data } = await axios.get(url);
      setLoading(false);
      setCategories(data.categories);
      setTotla(data.total);
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
  }, [search, page]);
  return (
    <>
      {loading && <FullPageLoading />}
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
          <Typography>No Categories To show</Typography>
        </Box>
      )}
      <Header />
      <SubHeader />
      <HeroSection setSearch={(search) => setSearch(search)} />
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

      {categories && (
        <Grid container marginLeft={5}>
          {categories?.map((category) => {
            return (
              <>
                <Grid item xs={12} md={4} lg={3} mt={10}>
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
      {categories?.length > 0 && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "60px",
          }}
        >
          <Pagination
            count={Math.ceil(total / limit)}
            onChange={(event, value) => {
              setPage(value);
            }}
            color="primary"
          />
        </Box>
      )}
      <Footer />
    </>
  );
};

export default AllCategories;
