import { Card, CardMedia, Grid, Rating, Typography } from "@mui/material";
import React from "react";
import { Box, Stack } from "@mui/system";
import img1 from "../../assests/images/main-banner.jpg";
import { useSelector } from "react-redux";
import VerifiedIcon from "@mui/icons-material/Verified";
const About = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            fontWeight={600}
            style={{ textTransform: "capitalize" }}
          >
            {user.firstName + " " + user.lastName}
            {user.verified && (
              <span style={{ marginLeft: "20px", marginTop: "5px" }}>
                <VerifiedIcon />
              </span>
            )}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography fontSize={18} fontWeight={300}>
            Team works make dream works
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Stack direction={"row"} spacing={2}>
            <Typography>Rating</Typography>
            <Rating name="read-only" value={4} readOnly />
          </Stack>
        </Grid>

        <Grid item xs={6}>
          <Stack direction="row" spacing={1} alignItems={"center"}>
            <Typography variant="h6" color={"green"}>
              {user?.role === "client" ? user.jobs.length : user.gigs.length}
            </Typography>
            <Typography variant="p">
              Active {user?.role === "client" ? <>Jobs</> : <>Gigs</>}{" "}
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
          <Stack direction="row" spacing={1} alignItems={"center"}>
            <Typography variant="h6" color={"green"}>
              100%
            </Typography>
            <Typography variant="p"> on budget </Typography>
          </Stack>
        </Grid>

        <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
          <Stack direction="row" spacing={1} alignItems={"center"}>
            <Typography variant="h6" color={"green"}>
              100%
            </Typography>
            <Typography variant="p"> on Time </Typography>
          </Stack>
        </Grid>

        <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
          <Stack direction="row" spacing={1} alignItems={"center"}>
            <Typography variant="h6" color={"green"}>
              33%
            </Typography>
            <Typography variant="p"> Repeat hire </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} mt={2}>
          <Typography variant="h6" style={{ textTransform: "capitalize" }}>
            About {user?.firstName + " " + user?.lastName}
          </Typography>
          <Typography style={{ mt: 2 }} variant="p">
            {user?.about}
          </Typography>
        </Grid>
        {user?.role === "freelancer" && (
          <>
            <Typography
              variant="h6"
              style={{ textTransform: "capitalize", marginTop: 10 }}
            >
              {user?.firstName + "'s"} Skills
            </Typography>

            {user.skills?.map((skill, index) => (
              <Grid item xs={12} mt={2}>
                <Typography variant="p">
                  {index + 1} {skill}
                </Typography>
              </Grid>
            ))}

            <Grid container spacing={3} mt={0.5}>
              <Grid item xs={12}>
                <Typography variant="h6">Portfolio</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia component="img" height="194" image={img1} />
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia component="img" height="194" image={img1} />
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia component="img" height="194" image={img1} />
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia component="img" height="194" image={img1} />
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia component="img" height="194" image={img1} />
                </Card>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default About;
