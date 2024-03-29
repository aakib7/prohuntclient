import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import Card from "./Card";
const DeshboardEmployer = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4} lg={3}>
          <Card text={"Jobs Completed"} count={user?.completedProject} />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <Card text={"Pending Jobs"} count={user?.onGoingProject} />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <Card text={"Active Jobs"} count={user?.jobs?.length} />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <Card text={"Blogs"} count={user?.blogs?.length} />
        </Grid>
      </Grid>
    </>
  );
};

export default DeshboardEmployer;
