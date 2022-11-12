import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import React, { useState } from "react";
import FreelancerDetail from "./FreelancerDetail";
import Profile from "./Profile";
import SignUp from "./SignUp";
import ClientSignup from "./ClientSignup";
import ClientDetail from "./ClientDetail";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";

function getSteps() {
  return ["Sign Up", "Experties", "Profile Picture"];
}

function getStepContent(step, role) {
  if (role === "freelancer") {
    switch (step) {
      case 0:
        return <SignUp />;

      case 1:
        return <FreelancerDetail />;
      case 2:
        return (
          <>
            <Profile />
          </>
        );

      default:
        return "unknown step";
    }
  }

  if (role === "client") {
    switch (step) {
      case 0:
        return <SignUp />;

      case 1:
        return <ClientSignup />;
      case 2:
        return (
          <>
            <Profile />
          </>
        );

      default:
        return "unknown step";
    }
  }
}

const LinaerStepper = () => {
  const { role } = useParams();
  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      nickName: "",
      email: "",
      Services: "",
      Skill: "",
      headline: "",
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const handleNext = (data) => {
    console.log(data.Skill);
    if (activeStep == steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div>
      {/* <Header /> */}
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          backgroundColor: "#F7F7F7",
          boxShadow: "2px 2px 2px 2px #C0C0C0",
          mt: 5,
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%", mt: 2 }}>
            <Stepper alternativeLabel activeStep={activeStep}>
              {steps.map((step, index) => {
                const labelProps = {};
                const stepProps = {};
                return (
                  <Step {...stepProps} key={index}>
                    <StepLabel {...labelProps}>{step}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Box>

          {activeStep === steps.length ? (
            <Typography variant="h3" align="center">
              Thank You
            </Typography>
          ) : (
            <>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleNext)}>
                  {getStepContent(activeStep, role)}
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    padding={2}
                  >
                    <Grid item={12}>
                      <Button disabled={activeStep === 0} onClick={handleBack}>
                        back
                      </Button>
                    </Grid>
                    <Grid item={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        // onClick={handleNext}
                        type="submit"
                      >
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </FormProvider>
            </>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default LinaerStepper;
