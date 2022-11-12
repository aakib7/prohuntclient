import React, { useState, useEffect } from "react";
import BlogDetail from "./BlogDetail";
import BlogRightSide from "./BlogRightSide";
import { useParams } from "react-router-dom";
import {
  Snackbar,
  Box,
  Grid,
  Alert as MuiAlert,
  Typography,
} from "@mui/material";
import Header from "../../Header/Header";
import SubHeader from "../../Header/SubHeader";
import axios from "axios";
import FullPageLoading from "../../others/FullPageLoading";

const SingleBlog = () => {
  let { blogId } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [blog, setBlog] = useState([]);
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState(false);
  // for toast
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");

  const handleComment = () => {
    setComment((pre) => !pre);
    if (comment) {
      setOpen(true);
      setSeverity("success");
      setMessage("Comment Add Successfully");
    }
  };
  const handleLike = () => {
    console.log("like");
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    axios
      .get(`http://localhost:4000/blog/${blogId}/likes`, config)
      .then((response) => {
        setLike((pre) => !pre);
        setSeverity(response.data.success ? "success" : "error");
        setMessage(response.data.message);
        setOpen(true);
      })
      .catch((error) => {
        setSeverity("error");
        setMessage(error);
        setOpen(true);
      });
  };

  useEffect(() => {
    async function fetchGig() {
      setLoading(true);
      axios
        .get(`http://localhost:4000/blog/${blogId}`)
        .then((response) => {
          setBlog(response.data.post);
          // console.log("khj" + response.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(true);
        });
    }
    fetchGig();
  }, [blogId, comment, like]);
  return (
    <>
      <Header />
      <SubHeader />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      {loading && !error && <FullPageLoading />}
      {!error ? (
        <>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: { xs: "column-reverse", md: "row" },
              mt: 6,
            }}
          >
            <Grid item md={9}>
              <BlogDetail
                title={blog.title}
                blogDescription={blog.description}
                numberOfLikes={blog.likes?.length}
                handleComment={handleComment}
                handleLike={handleLike}
                loading={loading}
                reviews={blog.reviews}
              />
            </Grid>
            <Grid
              item
              md={2}
              sx={{
                display: { xs: "none", md: "block" },
                position: { md: "fixed" },
                right: 50,
                // backgroundColor: "yellow",
                width: "100%",
              }}
            >
              <BlogRightSide />
            </Grid>
          </Grid>
        </>
      ) : (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            // alignItems: "center",
            alignItems: "center",
            height: "100%",
            mt: 10,
          }}
        >
          <Typography>Blog Not Found</Typography>
        </Box>
      )}
    </>
  );
};

export default SingleBlog;
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
