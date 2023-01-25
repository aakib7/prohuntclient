import React from "react";
import { useSelector } from "react-redux";
import { Grid, Box, Typography } from "@mui/material";
import Card from "./Card";
const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4} lg={3}>
          <Card text={"Jobs  Completed"} count={user?.completedProject} />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <Card text={"Pending  Jobs"} count={user?.onGoingProject} />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <Card text={"Active Gigs"} count={user?.gigs?.length} />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <Card text={"Bids on Jobs"} count={user?.bids?.length} />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
