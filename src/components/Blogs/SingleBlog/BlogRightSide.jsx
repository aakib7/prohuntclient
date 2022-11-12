import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
const BlogRightSide = () => {
  const [isHovering, setIsHovering] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  // for toast

  useEffect(() => {
    async function fetchGig() {
      setLoading(true);
      axios
        .get(`http://localhost:4000/blog`)
        .then((response) => {
          setBlogs(response.data.post);
          // console.log(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
    fetchGig();
  }, []);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  return (
    <>
      <Box>
        <Grid container spacing={0} align="center" justify="center">
          <Grid
            xs={12}
            style={{
              backgroundColor: "#025e73",
              color: "white",
            }}
          >
            <Typography variant="h6" fontWeight={400}>
              Recent Posts
            </Typography>
            <Divider />
          </Grid>
        </Grid>

        {loading && <Typography>Loading ....</Typography>}
        {blogs?.map((blog) => {
          return (
            <>
              <Grid container padding={1}>
                <Grid
                  xs={12}
                  padding={2}
                  sx={{
                    border: "1px solid",
                    backgroundColor: isHovering ? "#025e73" : "#a5a692",
                    overflow: "hidden",
                    height: "110px",
                    width: "100%",

                    //   textOverflow: "ellipsis",
                    //   whiteSpace: "nowrap",
                    //   display: "inline-block",
                    //   lineHeight: "20px",
                  }}
                  // onMouseEnter={handleMouseEnter}
                  // onMouseLeave={handleMouseLeave}
                >
                  <Link
                    style={{
                      color: isHovering ? "#f2a71b" : "black",
                      cursor: "pointer",
                      textDecoration: isHovering ? "underline" : "none",
                    }}
                  >
                    <Typography variant="p" fontSize={18}>
                      {blog.title}
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
              <Divider />
            </>
          );
        })}
      </Box>
    </>
  );
};

export default BlogRightSide;
