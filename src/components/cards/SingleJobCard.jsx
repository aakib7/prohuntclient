import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, Avatar, Rating, Divider } from "@mui/material";
import image from "../../assests/images/main-banner.jpg";

export default function SingleGigCard({
  title = "want freelancer want freelancer want freelancer want freelancer want freelancer want freelancer want freelancer want freelancer want freelancer frjbjcbbj",
  imgage,
  avatar = "aaqib",
  author = "ajmehdi",
  price = 123,
  rating = 4,
  deliveredTime = "2 days",
}) {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardMedia
        component="img"
        height="270px"
        image={image}
        alt="green iguana"
      />
      <CardContent sx={{ height: "117px", overflow: "hidden" }}>
        <Typography variant="h5">{title}</Typography>
      </CardContent>
      <CardActions>
        <Grid container>
          <Grid item xs={2}>
            <Avatar alt={author} src={avatar} />
          </Grid>
          <Grid item xs={8}>
            <Typography sx={{ paddingLeft: 1 }}>By {author}</Typography>
            <Rating name="read-only" value={rating} precision={0.5} readOnly />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">${price}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider />
            <Typography variant="p">delivery in {deliveredTime}</Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
