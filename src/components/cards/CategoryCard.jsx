import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";

const CategoryCard = ({ title, image }) => {
  return (
    <>
      <Card sx={{ maxWidth: 250 }}>
        <StyledCardHeader
          titleTypographyProps={{ fontSize: "14px", fontWeight: "600" }}
          title={title}
          sx={{
            paddingLeft: { xs: 8, md: 5, lg: 8 },
            bgcolor: "#025e73",
            color: "white",
          }}
        />
        <CardMedia
          component="img"
          height="194"
          image={`${image}`}
          alt="Paella dish"
        />
      </Card>
    </>
  );
};

export default CategoryCard;

const StyledCardHeader = styled(CardHeader)`
  background-color: #025e73;
  &:hover {
    color: #f2a71b;
    text-decoration: underline;
    cursor: pointer;
  }
`;
