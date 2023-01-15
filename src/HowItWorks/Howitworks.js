import React from "react";
import { Grid } from "@mui/material";
import "./howitworks.css";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Howitwork from "../assests/images/main-banner.jpg";
// import Sign from "../../assets/images/sign.png";
// import Card from "../Card";
const Howitworks = () => {
  return (
    <>
      <Header />
      <div className="slider1">
        <Grid sx={{ p: 2 }} className="about">
          <h1>How It Works</h1>
          <h3>Know the work flow of our platform</h3>
        </Grid>
      </div>
      <Grid container spacing={2} sx={{ p: 4 }}>
        <Grid md={3}>
          <div className="step">
            <h2>Step 1</h2>
            <h3>Register / Login To Platform</h3>
            <p>
              You have to register yourself to the platform by filling required
              information. If you already have an account, you can login to the
              platform by providing credentials
            </p>
          </div>
        </Grid>
        <br />
        <Grid md={3}>
          <div className="step">
            <h2>Step 2</h2>
            <h3>Choose Your Role</h3>
            <p>
              You have to choose your role, whether you are working as an
              employer or an employee. You can also switch the roles later on.
            </p>
          </div>
        </Grid>
        <br />
        <Grid md={3}>
          <div className="step">
            <h2>Step 3</h2>
            <h3>Connect People</h3>
            <p>
              You have to bid on projects, or upload gigs according to your
              role. Once the project is initialized you can start the work.
            </p>
          </div>
        </Grid>
        <br />
        <Grid md={3}>
          <div className="step">
            <h2>Step 4</h2>
            <h3>Payments</h3>
            <p>
              Send or recieve payments accordin to projects. You can have
              multiple options regarding your payments that will include your
              wallets as well.
            </p>
          </div>
        </Grid>
      </Grid>
      <Grid container className="tc" spacing={2} sx={{ mt: 4 }}>
        <Grid>
          <img className="imgsmall" src={Howitwork} alt="flow" />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Howitworks;
