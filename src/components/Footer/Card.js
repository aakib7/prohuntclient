import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import team2 from "../../assests/images/sign.png";

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: "auto" }}>
      <CardMedia component="img" height="100%" image={team2} alt="usama" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Usama Bhatti
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Hi, my name is Usama. I am the MD and Co-founder of ProHunt
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Message</Button>
        <Button size="small">Know More</Button>
      </CardActions>
    </Card>
  );
}
