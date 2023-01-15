import React from "react";
import { Grid } from "@mui/material";
import "./about.css";
import Teamwork_Illustration from "../../assets/images/Teamwork_Illustration.jpg";
import Sign from "../../assets/images/sign.png";
import Card from "../Card";
const About = () => {
  return (
    <>
      <div className="slider1">
        <Grid sx={{ p: 2 }} className="about">
          <h1>About Us</h1>
          <h3>Know more about us</h3>
        </Grid>
      </div>
      <Grid container spacing={2} sx={{ p: 4 }}>
        <Grid md={6}>
          <h2>Who We Are?</h2>
          <p>
            We are prohunt. We are the best freelancing platform. We provide a
            freelancing platform that helps businesses connect with top talent
            from around the world. We offer a wide range of services that allow
            businesses to post projects and receive bids from interested
            freelancers. We have a large pool of pre-vetted, top-rated talent to
            choose from, so businesses can be sure they're getting the best
            possible service.
          </p>
          <p>
            We're dedicated to providing the best possible experience for both
            businesses and freelancers, and our team is available 24/7 to answer
            any questions or help with any issues. We're always looking for ways
            to improve our platform, and we welcome feedback from our users. If
            you're looking for a freelancing platform that offers great
            features, user-friendly interface, and top-notch customer support,
            look no further than prohunt! We are prohunt. We are t
          </p>
          <p>
            We provide a freelancing marketplace for businesses and individuals
            to connect and work together seamlessly. We offer a variety of
            services that allow businesses of all sizes to find the perfect
            freelancer for their project. We also offer a wide range of tools
            and resources to help freelancers succeed.
          </p>
          <img className="imgsmall" src={Sign} alt="SIGN" />
          <br />
          <button className="btn1">CONTACT US</button>
        </Grid>
        <Grid sx={{ p: 2 }} md={6}>
          <img className="img" src={Teamwork_Illustration} alt="ABOUT" />
        </Grid>

        <Grid container className="tc" spacing={2} sx={{ mt: 4 }}>
          <Grid>
            <h2>Our Founding Memebers</h2>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid md={3} sx={{ p: 2 }}>
            <Card />
          </Grid>
          <Grid md={3} sx={{ p: 2 }}>
            <Card />
          </Grid>
          <Grid md={3} sx={{ p: 2 }}>
            <Card />
          </Grid>
          <Grid md={3} sx={{ p: 2 }}>
            <Card />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default About;
