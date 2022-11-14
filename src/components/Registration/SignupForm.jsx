import React from "react";
import {
  Container,
  Typography,
  Box,
  Stack,
  Button,
  Grid,
  CssBaseline,
  responsiveFontSizes,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "../Header/Header";
import SubHeader from "../Header/SubHeader";

const SignupForm = () => {
  const [freelancer, setFreelancer] = React.useState();
  const [client, setClient] = React.useState(false);

  const [choice, setChoice] = React.useState();

  const handleClient = () => {
    setClient((pre) => !pre);
    setFreelancer(false);
    setChoice("client");
  };

  const handleFreelancer = () => {
    setFreelancer((pre) => !pre);
    setClient(false);
    setChoice("freelancer");
  };

  useEffect(() => {
    if (choice === "freelancer" || choice === "client") {
      console.log(choice);
    }
  }, [choice]);

  return (
    <>
      <Header />
      <SubHeader />
      <Container
        component={"main"}
        maxWidth={"sm"}
        sx={{
          backgroundColor: "white",
          boxShadow: "2px 2px 2px 2px lightgray",
          borderRadius: "10px",
          mt: 7,
        }}
      >
        <CssBaseline />
        <Box sx={{ mt: 10 }}>
          <Typography
            variant="h4"
            align="center"
            sx={{ pt: 3, fontSize: { xs: 24, md: 30 } }}
          >
            Join as a client or freelancer
          </Typography>

          <Stack direction={"row"} spacing={2} mt={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box
                  onClick={handleClient}
                  sx={{
                    alignContent: "center",
                    justifyContent: "center",
                    backgroundColor: "",
                    border: 2,
                    borderColor: client ? "green" : "lightgray",
                    "&:hover": {
                      borderColor: "green",
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    align="center"
                    marginTop={5}
                    sx={{ pb: { xs: "34px", md: "0" } }}
                  >
                    I’m a client, hiring for a project
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  onClick={handleFreelancer}
                  sx={{
                    backgroundColor: "white",
                    border: 2,
                    borderColor: freelancer ? "green" : "lightgray",
                    "&:hover": {
                      borderColor: "green",
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    align="center"
                    marginTop={5}
                    sx={{ pb: { xs: "34px", md: "0" } }}
                  >
                    I’m a freelancer, looking for work
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Stack>

          <Grid container direction="row" justifyContent="center " mt={3}>
            <Link to={`${choice}`}>
              <Button
                variant="contained"
                color="success"
                size="large"
                disabled={!choice}
                sx={{ width: { xs: 110, md: 200 }, marginBottom: "20px" }}
              >
                Join As {client && "client"} {freelancer && "freelancer"}
              </Button>
            </Link>
          </Grid>

          <Grid>
            <Stack direction="row" justifyContent="center" mt={2}>
              <Typography sx={{ marginBottom: "20px", marginRight: "2px" }}>
                Already have an account
              </Typography>
              <Typography>Login?</Typography>
            </Stack>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default SignupForm;
