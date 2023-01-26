import SingleBlogPost from "../cards/SingleBlogPost";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Skeleton, Stack, Typography } from "@mui/material";

const ExperOpinion = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [search, setSearch] = useState("");

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:4000/blog?page=${page}&limit=${limit}&search=${search}`;
      const { data } = await axios.get(url);
      setLoading(false);
      setBlogs(data.post);
      console.log(data.post);
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
      {loading && (
        <Stack direction="row" spacing={2}>
          <Box sx={{ pt: 0.5 }}>
            <Stack spacing={1}>
              <Skeleton variant="rectangular" width={310} height={190} />
              <Skeleton variant="rectangular" width={310} height={190} />
            </Stack>
          </Box>
          <Box sx={{ pt: 0.5 }}>
            <Stack spacing={1}>
              <Skeleton variant="rectangular" width={310} height={190} />
              <Skeleton variant="rectangular" width={310} height={190} />
            </Stack>
          </Box>
          <Box sx={{ pt: 0.5 }}>
            <Stack spacing={1}>
              <Skeleton variant="rectangular" width={310} height={190} />
              <Skeleton variant="rectangular" width={310} height={190} />
            </Stack>
          </Box>
          <Box sx={{ pt: 0.5 }}>
            <Stack spacing={1}>
              <Skeleton variant="rectangular" width={310} height={190} />
              <Skeleton variant="rectangular" width={310} height={190} />
            </Stack>
          </Box>
        </Stack>
      )}
      {!loading && error && <Typography>No Blogs ...</Typography>}
      <Grid
        container
        spacing={2}
        alignItems="center"
        pl={{ xs: 2, md: 12, lg: 1 }}
      >
        {blogs?.map((blog) => {
          return (
            <Grid item xs={12} md={6} lg={3}>
              <Link
                to={`/blog/${blog?._id}`}
                style={{ textTransform: "capitalize" }}
              >
                <SingleBlogPost
                  title={blog.title}
                  description={blog.description}
                  image={`http://localhost:4000/${blog.image.url}`}
                />
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default ExperOpinion;
