import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid, Avatar, Rating, Divider } from "@mui/material";
import moment from "moment/moment";

export default function SingleGigCard({
  title = "want freelancer want freelancer want freelancer want freelancer want freelancer want freelancer want freelancer want freelancer want freelancer frjbjcbbj",
  image,
  avatar = "aaqib",
  author = "ajmehdi",
  price = 123,
  createdAt,
  deliveredTime = "2 days",
}) {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardMedia
        component="img"
        height="270px"
        image={image}
        alt="Job Banner Image"
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
            <Typography sx={{ paddingLeft: 1, fontWeight: "700" }}>
              By {author}
            </Typography>
            <Typography>
              Posted At: {moment(createdAt).format("MMM Do YY")}
            </Typography>
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
