import React, { useEffect, useState } from "react";
import { Box, Grid, Pagination } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import image from "../../assests/images/main-banner1.jpg";
import SingleBlogPost from "../cards/SingleBlogPost";
import axios from "axios";
import FullPageLoading from "../others/FullPageLoading";

const BlogList = () => {
  const { subcategory } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function fetchCategories() {
      setLoading(true);
      axios
        .get("/blog?category=" + subcategory)
        .then((response) => {
          setBlogs(response.data.post);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
    fetchCategories();
  }, []);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          mt: 7,
          width: "100%",
          paddingX: "3%",
        }}
      >
        <Grid container spacing={2}>
          {!loading && blogs.length == 0 && <h1>No blogs</h1>}
          {loading ? (
            <FullPageLoading />
          ) : (
            blogs.map((blog) => (
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
            ))
          )}
        </Grid>
      </Box>
      {blogs?.length >= 20 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Box>
      )}
    </Box>
  );
};
export default BlogList;
