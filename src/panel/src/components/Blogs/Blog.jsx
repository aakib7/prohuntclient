import React, { useState, useEffect } from "react";
import { Box, Typography, Button, styled, Divider } from "@mui/material";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import BlogCard from "./BlogCard";
import BlogForm from "./BlogForm";
import FullPageLoading from "../../../../components/others/FullPageLoading";

import { style } from "@mui/system";

function Blog() {
  const [blogs, setBlogs] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    setLoading(true);
    axios
      .get(`http://localhost:4000/user/blogs`, config)
      .then((response) => {
        setLoading(false);

        setBlogs(response.data.blogs);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <Box>
      <Box>
        <Typography variant="h4">Blog</Typography>
      </Box>
      <Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading && <FullPageLoading />}
          {!loading && blogs?.length <= 0 && (
            <Typography variant="h6">
              No Blog Added Please Add New Jobs
            </Typography>
          )}
        </Box>

        {blogs?.length <= 0 ? (
          ""
        ) : (
          <>
            {blogs.map((blog) => {
              return (
                <>
                  <BlogCard
                    title={blog.title}
                    description={blog.description}
                    id={blog._id}
                  />

                  <Divider sx={{ width: "95%" }} />
                </>
              );
            })}
          </>
        )}
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "30px",
          height: "45px",
        }}
      >
        <StyledButton
          onClick={() => {
            setOpen((pre) => !pre);
          }}
          startIcon={<AddIcon />}
        >
          Add New Blog
        </StyledButton>
      </Box>
      <BlogForm open={open} handleOpen={handleOpen} handleClose={handleClose} />
    </Box>
  );
}

export default Blog;

const StyledButton = styled(Button)`
  background-color: #f2a71b;
  color: #fff;
  &:hover {
    background-color: green;
  }
`;
