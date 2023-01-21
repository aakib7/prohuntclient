import { Card, CardMedia, Grid, Rating, Typography } from "@mui/material";
import React from "react";
import { Box, Stack } from "@mui/system";
import img1 from "../../assests/images/main-banner.jpg";
import VerifiedIcon from "@mui/icons-material/Verified";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const About = ({ user, id }) => {
  const [portfolio, setPortfolio] = React.useState([]);
  const navigate = useNavigate();
  const fetchPortfolio = () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    axios
      .get(`http://localhost:4000/portfolio/user/${id}`, config)
      .then((response) => {
        console.log("p");
        setPortfolio(response.data.portfolio);
        console.log(response.data.portfolio);
      })
      .catch((error) => {});
  };
  React.useEffect(() => {
    fetchPortfolio();
  }, []);
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
            <Rating
              name="read-only"
              value={user?.rating ? user?.rating : 0}
              readOnly
            />
          </Stack>
        </Grid>

        <Grid item xs={6}>
          <Stack direction="row" spacing={1} alignItems={"center"}>
            <Typography variant="h6" color={"green"}>
              {user?.role === "client" ? user.jobs?.length : user.gigs?.length}
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
              {portfolio?.slice(0, 3).map((port) => {
                return (
                  <Grid item xs={12} md={4}>
                    <Link to={`/portfolio/${port._id}`}>
                      <Card sx={{ maxWidth: 345 }} style={{ marginBottom: 25 }}>
                        <CardMedia
                          component="img"
                          height="194"
                          image={`http://localhost:4000/${port.pictures[0]}`}
                        />
                      </Card>
                    </Link>
                  </Grid>
                );
              })}
              {!portfolio && (
                <Box style={{ display: "flex", marginLeft: 25 }}>
                  <Typography>No PortFolio Added Yet</Typography>
                </Box>
              )}
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default About;
