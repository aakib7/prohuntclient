import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import HeroSection from "../Header/HeroSection";
import SubHeader from "../Header/SubHeader";
import { Grid, Typography, Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import image from "../../assests/images/main-banner.jpg";
import FullPageLoading from "../others/FullPageLoading";
import { Link } from "react-router-dom";
import SingleBlogPost from "../cards/SingleBlogPost";

const AllBlogs = ({ header = true, homeSearch }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [total, setTotla] = useState(0);

  useEffect(() => {
    setSearch(homeSearch ? homeSearch : "");
  }, [homeSearch]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:4000/blog?page=${page}&limit=${limit}&search=${search}`;
      const { data } = await axios.get(url);
      setLoading(false);
      setBlogs(data.post);
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
    fetchBlogs();
  }, [page, search]);
  return (
    <>
      {header && (
        <>
          <Header />
          <SubHeader />
          <HeroSection setSearch={(search) => setSearch(search)} />
        </>
      )}
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
      {!loading && blogs.length <= 0 && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Typography>No Blogs To show</Typography>
        </Box>
      )}

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
                      image={`http://localhost:4000/${blog?.image.url}`}
                    />
                  </Link>
                </Grid>
              </>
            );
          })}
        </Grid>
      )}

      {blogs?.length > 0 && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "60px",
          }}
        >
          {header && (
            <Pagination
              count={Math.ceil(total / limit)}
              onChange={(event, value) => {
                setPage(value);
              }}
              color="primary"
            />
          )}
        </Box>
      )}
      {header && <Footer />}
    </>
  );
};

export default AllBlogs;
