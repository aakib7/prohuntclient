import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, Avatar, Rating, Divider } from "@mui/material";

export default function SingleGigCard({
  title,
  imgage,
  avatar,
  author,
  price,
  rating,
}) {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardMedia
        component="img"
        height="270px"
        image={imgage}
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
            <Typography variant="p">delivery in 2 days</Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
