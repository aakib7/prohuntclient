import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import HeroSection from "../Header/HeroSection";
import SubHeader from "../Header/SubHeader";
import { Grid, Typography, Box } from "@mui/material";

import image from "../../assests/images/main-banner.jpg";

import FullPageLoading from "../others/FullPageLoading";
import { Link } from "react-router-dom";
import SingleBlogPost from "../cards/SingleBlogPost";

const AllBlogs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:4000/blog`;
      const { data } = await axios.get(url);
      setLoading(false);
      setBlogs(data.post);
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
    fetchBlogs();
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
      {blogs && (
        <Grid container marginLeft={5}>
          {blogs?.map((blog) => {
            return (
              <>
                <Grid item xs={12} md={6} lg={4} mt={10}>
                  <Link
                    to={`/blog/${blog?._id}`}
                    style={{ textTransform: "capitalize" }}
                  >
                    <SingleBlogPost
                      title={blog?.title}
                      description={blog?.description}
                      imgage={image}
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

export default AllBlogs;
