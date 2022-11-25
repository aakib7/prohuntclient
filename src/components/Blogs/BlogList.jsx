import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import image from "../../assests/images/main-banner1.jpg";
import SingleBlogPost from "../cards/SingleBlogPost";
import axios from "axios";
import FullPageLoading from "../others/FullPageLoading";

const BlogList = ({ search }) => {
  const { subcategory } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    function fetchCategories() {
      setLoading(true);
      const url = `http://localhost:4000/blog?category=${subcategory}&search=${search}`;
      axios
        .get(url)
        .then((response) => {
          setBlogs(response.data.post);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(false);
        });
    }
    fetchCategories();
  }, [search]);
  return (
    <Box>
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
      {!loading && blogs?.length <= 0 && (
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
      <Box
        sx={{
          display: "flex",
          mt: 7,
          width: "100%",
          paddingX: "3%",
        }}
      >
        <Grid container spacing={2}>
          {blogs?.map((blog) => (
            <>
              <Grid item xs={12} md={6} lg={4}>
                <Link
                  to={`/blog/${blog._id}`}
                  style={{ textTransform: "capitalize" }}
                >
                  <SingleBlogPost
                    title={blog.title}
                    imgage={image}
                    description={blog.description}
                  />
                </Link>
              </Grid>
            </>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
export default BlogList;
