import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Contact from "../../../assests/images/Contact.jpg";
import Grid from "@mui/material/Grid";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import "./contactusstyle.css";
import HomeIcon from "@mui/icons-material/Home";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";
import { styled } from "@mui/system";
import Header from "../../Header/Header";
import Footer from "../Footer";
import { Box } from "@mui/material";

const Contactus = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [validation, setValidation] = useState({ email: "" });
  let errors = { ...validation };
  const checkValidation = () => {
    var mailformat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if (!user.email.trim()) {
      errors.email = "Email is required";
    } else if (!user.email.match(mailformat)) {
      errors.email = `Please enter a valid email address `;
    } else {
      errors.email = "";
    }
    setValidation(errors);
  };
  const Handler = (e) => {
    e.preventDefault();
    console.log(user);
  };
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    checkValidation();
  }, [user]);
  return (
    <>
      <Header />
      <div className="slider1">
        <Grid sx={{ p: 2 }} className="about">
          <h1>CONTACT US</h1>
          <h3>REACH TO US NOW</h3>
        </Grid>
      </div>
      <Grid container spacing={2} sx={{ p: 4 }}>
        <br />
        <Grid md={4}>
          <div className="step">
            <HomeIcon sx={{ fontSize: 52 }} />
            <h2>Reach Our Office</h2>
            <h4>LDA Avenue 1, Defence Road.</h4>
            <p>Lahore, Pakistan</p>
          </div>
        </Grid>
        <br />
        <Grid md={4}>
          <div className="step">
            <PhoneAndroidIcon sx={{ fontSize: 52 }} />
            <h2>Call Us for Support</h2>
            <h4>+92305-1222130</h4>
            <h4>+92300-4199222</h4>
            <h4>+92302-6214311</h4>
          </div>
        </Grid>
        <br />
        <Grid md={4}>
          <div className="step">
            <EmailIcon sx={{ fontSize: 52 }} />
            <h2>Electronic Contact</h2>
            <h4>ajmehdi5@gmail.com</h4>
            <h4>dev.usamash@gmail.com</h4>
            <h4>abdulrehman6214311@gmail.com</h4>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={2} marginTop={2} padding={4}>
        <Grid item md={6}>
          <img className="img" src={Contact} />
        </Grid>
        <Grid item md={6} xs={12} sm={12}>
          <div classNmae="container">
            <div className="form">
              <RecentActorsIcon />
              <h1>CONTACT US NOW</h1>
              <Box component="form" onSubmit={Handler}>
                <TextField
                  className="text_field"
                  required
                  fullWidth
                  id="name"
                  label="Your Name"
                  variant="standard"
                  name="name"
                  value={user.name}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <br />
                <TextField
                  className="text_field"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="Your Email"
                  variant="standard"
                  value={user.email}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                {user.email && (
                  <p style={{ color: "red" }}>{validation.email}</p>
                )}
                <br />
                <TextField
                  className="text_field"
                  required
                  fullWidth
                  id="message"
                  name="message"
                  label="Your Message"
                  multiline
                  rows={5}
                  variant="standard"
                  value={user.message}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <div>
                  <br />
                  <StyledButton type="submit">Submit</StyledButton>
                </div>
              </Box>
            </div>
          </div>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Contactus;

const StyledButton = styled(Button)`
  background-color: #f2a71b;
  color: #fff;
  &:hover {
    background-color: #025e73;
  }
`;
