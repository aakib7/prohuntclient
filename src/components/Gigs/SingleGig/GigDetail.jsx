import { Box, Grid, Typography, Checkbox, Divider } from "@mui/material";
import React from "react";
import pic from "../../../assests/images/main-banner1.jpg";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Review from "../../Reviews/Review";
import AddReview from "../../Reviews/AddReview";
import RightSideBar from "./RightSideBar";
import { useSelector } from "react-redux";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

const GigDetail = ({
  title,
  picture,
  numberOfLikes,
  gigDescription,
  loading,
  reviews,
  handleLike,
  handComment,
  price,
  deliverTime,
  responce,
  authorName,
}) => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <Grid container sx={{ paddingLeft: { xs: 3, md: 5 } }}>
        <Grid item xs={12} bgcolor={"#f7f7f7"}>
          <Typography variant="h4" fontWeight={600} lineHeight={"50px"}>
            {title}
          </Typography>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <RightSideBar
              price={price}
              deliverTime={deliverTime}
              responce={responce}
              authorName={authorName}
            />
          </Box>
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
                  handleLike();
                }}
              >
                <Checkbox
                  icon={<ThumbUpAltIcon />}
                  checkedIcon={<ThumbUpAltIcon sx={{ color: "red" }} />}
                />
              </IconButton>
            </CardActions>
            <Box sx={{ border: "1px solid", padding: "2px" }}>
              <Typography>{numberOfLikes} Likes</Typography>
            </Box>
          </Stack>
          <hr style={{ height: "2px", paddingRight: "5px" }} />
        </Grid>

        <Grid item xs={12} bgcolor={"white"}>
          <Typography
            padding={4}
            sx={{ padding: { xs: 2, md: 4 }, textAlign: "justify" }}
          >
            {gigDescription}
          </Typography>
        </Grid>
        <Grid item xs={12} bgcolor={"white"}>
          <Typography variant="h5" paddingLeft={5}>
            Reviews and Ratings
          </Typography>
        </Grid>
        <Grid item xs={12} bgcolor={"white"}>
          {isAuthenticated ? <AddReview handComment={handComment} /> : ""}
        </Grid>
        <Grid item xs={12} bgcolor={"white"}>
          {!loading && (
            <Typography variant="h6">{reviews.length} Reviews</Typography>
          )}
          {loading && <Typography variant="h6">Loaging ...</Typography>}
          {reviews?.map((review) => (
            <>
              <Divider />
              <Review
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

export default GigDetail;
