import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardMedia } from "@mui/material";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

const SingleBlogPost = ({ title, description, image }) => {
  return (
    <Card sx={{ maxWidth: 340 }}>
      <CardMedia component="img" height="210" image={image} alt="Blog Image" />
      <CardContent sx={{ backgroundColor: "#F7F7F7" }}>
        <TypographyStyles
          fontSize={20}
          fontWeight={600}
          sx={{
            color: "black",
            cursor: "pointer",
            height: "60px",
            overflow: "hidden",
          }}
        >
          {!title && <>Start an online business and work from home</>}

          {title}
        </TypographyStyles>
        <Typography
          variant="body2"
          sx={{ color: "black" }}
          style={{ height: "100px", marginTop: "5px", overflow: "hidden" }}
        >
          {!description && (
            <>
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </>
          )}
          {/* <ReadMore words={250}>{description}</ReadMore> */}
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SingleBlogPost;

const TypographyStyles = styled(Typography)`
  color: black;
  transition: text-decoration 2s;
  &:hover {
    color: #011f26;
    text-decoration: underline;
  }
`;
