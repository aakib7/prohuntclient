import { Box, Grid } from "@mui/material";
import React from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import { StarBorder, Star, MoreVert, Share } from "@mui/icons-material";
import Rating from "@mui/material/Rating";

const ReadReviews = ({ comment, rating, author }) => {
  const [value, setValue] = React.useState(2);
  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: "red" }} aria-label="recipe"></Avatar>}
          title={author}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {comment}
          </Typography>
        </CardContent>
        <Box sx={{ paddingRight: "12px" }} paddingLeft={5}>
          <Rating name="read-only" value={rating} readOnly precision={0.5} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ReadReviews;
