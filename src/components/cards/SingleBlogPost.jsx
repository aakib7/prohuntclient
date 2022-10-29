import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardMedia } from "@mui/material";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

import BannerImage from "../../assests/images/main-banner.jpg";
const SingleBlogPost = () => {
  return (
    <Card sx={{ maxWidth: 340 }}>
      <CardMedia
        component="img"
        height="210"
        image={BannerImage}
        alt="Paella dish"
      />
      <CardContent sx={{ backgroundColor: "#025e73" }}>
        <TypographyStyles
          fontSize={20}
          fontWeight={600}
          sx={{
            color: "black",
            cursor: "pointer",
          }}
        >
          Start an online business and work from home
        </TypographyStyles>
        <Typography variant="body2" sx={{ color: "white" }}>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SingleBlogPost;

const TypographyStyles = styled(Typography)`
  color: white;
  transition: text-decoration 2s;
  &:hover {
    color: #f2a71b;
    text-decoration: underline;
  }
`;
