import React, { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Stack,
  CardActions,
  IconButton,
  Checkbox,
  Divider,
  Alert as MuiAlert,
  Snackbar,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import pic from "../../../assests/images/main-banner.jpg";
import Comments from "./Comments";
import { useSelector } from "react-redux";
import ReadReviews from "../../others/ReadReviews";
const BlogDetail = ({
  title,
  numberOfLikes,
  blogDescription,
  handleComment,
  loading,
  handleLike,
  reviews,
}) => {
  const { isAuthenticated } = useSelector((state) => state.user);

  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");
  return (
    <>
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
      <Grid container sx={{ paddingLeft: { xs: 3, md: 5 } }}>
        <Grid item xs={12} bgcolor={"#f7f7f7"}>
          <Typography variant="h4" fontWeight={600} lineHeight={"50px"}>
            {title}
          </Typography>
          {/* <Box sx={{ display: { xs: "block", md: "none" } }}>
            <RightSideBar
              price={price}
              deliverTime={deliverTime}
              responce={responce}
              authorName={authorName}
            />
          </Box> */}
          <img
            style={{
              marginTop: "25px",
              width: "100%",
              height: "auto",
            }}
            src={pic}
            alt="mobile phone"
          />
        </Grid>
        <Grid item xs={12} bgcolor={"white"}>
          <Stack direction="row" spacing={1} alignItems={"center"}>
            <CardActions>
              <IconButton
                aria-label="add to favorites"
                onClick={() => {
                  if (isAuthenticated) {
                    handleLike();
                  } else {
                    setOpen(true);
                    setSeverity("error");
                    setMessage("Please Login First");
                  }
                }}
              >
                <Checkbox
                  icon={<ThumbUpAltIcon />}
                  checkedIcon={<ThumbUpAltIcon sx={{ color: "blue" }} />}
                  //   disabled={!isAuthenticated}
                />
              </IconButton>
            </CardActions>
            <Box sx={{ border: "1px solid", padding: "2px" }}>
              <Typography> {numberOfLikes} Likes</Typography>
            </Box>
          </Stack>
          <hr style={{ height: "2px", paddingRight: "5px" }} />
        </Grid>

        <Grid item xs={12} bgcolor={"white"}>
          <Typography
            padding={4}
            sx={{ padding: { xs: 2, md: 4 }, textAlign: "justify" }}
          >
            {blogDescription}
          </Typography>
        </Grid>
        <Grid item xs={12} bgcolor={"white"}>
          <Typography variant="h5" paddingLeft={5}>
            Reviews and Ratings
          </Typography>
        </Grid>
        <Grid item xs={12} bgcolor={"white"}>
          {isAuthenticated ? <Comments handleComment={handleComment} /> : ""}
        </Grid>
        <Grid item xs={12} bgcolor={"white"}>
          {!loading && (
            <Typography variant="h6">{reviews?.length} Reviews</Typography>
          )}
          {loading && <Typography variant="h6">Loaging ...</Typography>}
          {reviews?.map((review) => (
            <>
              <Divider />
              <ReadReviews
                comment={review.comment}
                rating={review.rating}
                author={review.name}
              />
              <Divider />
            </>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default BlogDetail;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
