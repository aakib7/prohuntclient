import React from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import GoogleIcon from "@mui/icons-material/Google";
// import Side_img from "../assets/images/Side_img.png";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useState } from "react";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }
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
              <h1 className="login_form_title">LOGIN NOW</h1>
              <TextField
                className="text_field"
                id="email"
                label="Email"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                className="text_field"
                id="password"
                label="Password"
                type="password"
                variant="standard"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember me"
              />
              <div className="submit_button">
                <Button variant="contained" onSubmit={handleSubmit}>
                  Submit
                </Button>
              </div>

              <h5>
                Are you new to this platform?{" "}
                <a
                  href="https://www.w3schools.com/html/"
                  title="Go to W3Schools HTML section"
                >
                  <span style={{ color: "#1665C0" }}> Register Now </span>
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

export default Login;
