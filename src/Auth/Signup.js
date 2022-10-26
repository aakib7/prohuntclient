import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import GoogleIcon from "@mui/icons-material/Google";
// import Side_img from "../assets/images/Side_img.png";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FormControlLabel from "@mui/material/FormControlLabel";

function getSteps() {
  return ["Basic information", "Set Credentials", "Verification"];
}

const Signup = () => {
  const [alignment, setAlignment] = React.useState("Buyer");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <>
            <div>
              <TextField
                id="full-name"
                label="Full Name"
                variant="standard"
                fullWidth
                margin="dense"
                placeholder="Enter Your Full Name"
                onChange={handleName}
              />
              <TextField
                id="email"
                label="Email"
                variant="standard"
                fullWidth
                margin="dense"
                placeholder="Enter Your E-mail Address"
                onChange={handleEmail}
              />
            </div>
          </>
        );

      case 1:
        return (
          <>
            <div className="form_group">
              <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
              >
                <ToggleButton value="Buyer" aria-label="left aligned">
                  <PersonOutlineIcon />I am an Employer
                </ToggleButton>
                <ToggleButton value="Freelancer" aria-label="left aligned">
                  <PersonOutlineIcon />I am a Freelancer
                </ToggleButton>
              </ToggleButtonGroup>
              <div className="padder">
                <TextField
                  id="set-password"
                  label="Password"
                  type="password"
                  variant="standard"
                  fullWidth
                  margin="dense"
                  placeholder="Password minimum (8 characters)"
                  onChange={handlePassword}
                />
                <TextField
                  id="confirm-password"
                  label="Confirm Password"
                  variant="standard"
                  type="password"
                  fullWidth
                  margin="dense"
                  placeholder="Password minimum (8 characters)"
                  onChange={handlePassword}
                />
              </div>
              <FormControlLabel
                className="padder"
                control={<Checkbox defaultChecked />}
                label="I agree to the Privacy Policy, Terms of Service and IP Policy."
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="form_group">
              <h4>
                Enter verification code that was recently sent to your email.
              </h4>
              <TextField
                id="otp"
                label="Verification"
                variant="standard"
                fullWidth
                type="text"
                margin="dense"
                placeholder="Enter 4 digit verification code"
              />
            </div>
          </>
        );
      default:
        return "unknown step";
    }
  }

  // States for registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>User {name} successfully registered!!</h1>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <>
      <Grid container className="page_size" spacing={2}>
        <Grid item md={6} xs={12} sm={12}>
          <img className="side_image" />
        </Grid>
        <Grid item md={6} xs={12} sm={12}>
          <div className="login_form">
            <div className="login-form-container">
              <LockOpenIcon className="login_form_title_icon" />
              <h1 className="login_form_title"> REGISTER NOW</h1>

              {/* Step Handling */}

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

              {activeStep === steps.length ? (
                <Typography variant="h6" padding={5} align="center">
                  Thank you. Your request has been submitted.
                </Typography>
              ) : (
                <>
                  <form>{getStepContent(activeStep)}</form>{" "}
                  <div className="button_group">
                    <div className="back_button">
                      <Button
                        disabled={activeStep === 0}
                        variant="contained"
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                    </div>
                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                      >
                        {activeStep === steps.length - 1 ? "SUBMIT" : "Next"}
                      </Button>
                    </div>
                  </div>
                </>
              )}

              <h5>
                Are you already a member?{" "}
                <a
                  href="https://www.w3schools.com/html/"
                  title="Go to W3Schools HTML section"
                >
                  <span style={{ color: "#1665C0" }}> Login Now </span>
                </a>
              </h5>

              <Button
                variant="outlined"
                color="error"
                startIcon={<GoogleIcon />}
              >
                Sign In With Google
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Signup;
