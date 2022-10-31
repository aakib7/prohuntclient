import { Grid } from "@mui/material";
import React from "react";
import RightSideBar from "./RightSideBar";
import GigDetail from "./GigDetail";
import Header from "../../Header/Header";
import SubHeader from "../../Header/SubHeader";

const SingleGig = () => {
  return (
    <>
      <Header />
      <SubHeader />
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          mt: 6,
        }}
      >
        <Grid item md={8}>
          <GigDetail />
        </Grid>
        <Grid
          item
          md={4}
          sx={{
            display: { xs: "none", md: "block" },
            position: { md: "fixed" },
            right: 0,
          }}
        >
          <RightSideBar />
        </Grid>
      </Grid>
    </>
  );
};
export default SingleGig;
