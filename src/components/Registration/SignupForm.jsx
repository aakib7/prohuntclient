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
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "../Header/Header";
import SubHeader from "../Header/SubHeader";
import Footer from "../Footer/Footer";

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
    <Box
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(2, 94, 115, 0.25),rgba(255, 255, 255, 0.8),rgba(2, 94, 115, 0.3))",
      }}
    >
      <Header />
      <SubHeader />
      <Container
        component={"main"}
        maxWidth={"sm"}
        sx={{
          backgroundImage:
            "linear-gradient(to top, rgba(2, 94, 115, 0.20),#fff)",
          boxShadow: "1px 1px 1px 1px #C0C0C0",

          mt: 7,
        }}
      >
        <CssBaseline />
        <Box>
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
                    borderColor: client ? "#f2a71b" : "lightgray",
                    "&:hover": {
                      borderColor: "#f2a71b",
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    align="center"
                    fontWeight={400}
                    padding={2}
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
                    border: 2,
                    borderColor: freelancer ? "#f2a71b" : "lightgray",
                    "&:hover": {
                      borderColor: "#f2a71b",
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    align="center"
                    fontWeight={400}
                    padding={2}
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
              <StyledButton
                variant="contained"
                color="success"
                size="large"
                disabled={!choice}
                sx={{ width: { xs: 110, md: 200 }, marginBottom: "20px" }}
              >
                Join As {client && "client"} {freelancer && "freelancer"}
              </StyledButton>
            </Link>
          </Grid>

          <Grid>
            <Stack direction="row" justifyContent="center" mt={2}>
              <Typography sx={{ marginBottom: "20px", marginRight: "2px" }}>
                Already have an account? <Link to={"/login"}>Login</Link>
              </Typography>
            </Stack>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default SignupForm;

const StyledButton = styled(Button)`
  background-color: #f2a71b;
  color: #fff;
  &:hover {
    background-color: #025e73;
  }
`;
