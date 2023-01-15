import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Contact from "../../assets/images/Contact.jpg";
import Grid from "@mui/material/Grid";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import "./contactus.css";

const ContactForm = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <img className="img" src={Contact} />
        </Grid>
        <Grid item md={6} xs={12} sm={12}>
          <div classNmae="container">
            <div className="form">
              <RecentActorsIcon />
              <h1>CONTACT US NOW</h1>
              <TextField
                className="text_field"
                id="name"
                label="Your Name"
                variant="standard"
              />
              <TextField
                className="text_field"
                id="email"
                label="Your Email"
                variant="standard"
              />
              <TextField
                className="text_field"
                id="message"
                label="Your Message"
                multiline
                maxRows={10}
                variant="standard"
              />
              <div>
                <br />
                <btn className="btn1">Submit</btn>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default ContactForm;
