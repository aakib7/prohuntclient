import React from "react";
import SingleBlogPost from "../cards/SingleBlogPost";

import Grid from "@mui/material/Grid";

const ExperOpinion = () => {
  return (
    <Grid
      container
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
      pl={{ xs: 2, md: 12, lg: 1 }}
    >
      <Grid item xs={12} md={6} lg={3}>
        <SingleBlogPost />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SingleBlogPost />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SingleBlogPost />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SingleBlogPost />
      </Grid>
    </Grid>
  );
};

export default ExperOpinion;
