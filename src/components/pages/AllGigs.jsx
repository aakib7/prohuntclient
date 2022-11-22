import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import HeroSection from "../Header/HeroSection";
import SubHeader from "../Header/SubHeader";
import { Grid, Typography, Box } from "@mui/material";
import SingleGigCard from "../cards/SingleGigCard";
import image from "../../assests/images/main-banner.jpg";
import FullPageLoading from "../others/FullPageLoading";
import { Link } from "react-router-dom";

const AllGigs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [gigs, setGigs] = useState([]);
  const fetchGigs = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:4000/gigs`;
      const { data } = await axios.get(url);
      setLoading(false);
      setGigs(data.Gigs);
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        // setError(error.response.data.message);
        setError(true);
      }
    }
  };
  useEffect(() => {
    fetchGigs();
  }, []);
  return (
    <>
      <Header />
      <SubHeader />
      <HeroSection />
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "80vh",
          }}
        >
          <FullPageLoading />
        </Box>
      )}
      {!loading && error && (
        <Typography>Somthing happend bad try again Later</Typography>
      )}{" "}
      {/* {!loading && gigs.length <= 0 && <Typography>No Gigs To Show</Typography>} */}
      {gigs && (
        <Grid container marginLeft={5}>
          {gigs?.map((gig) => {
            return (
              <>
                <Grid item xs={12} md={6} lg={4} mt={10}>
                  <Link
                    to={`/gig/${gig?._id}`}
                    style={{ textTransform: "capitalize" }}
                  >
                    <SingleGigCard
                      title={gig?.title}
                      avatar={
                        "http://localhost:4000/" + gig?.owner?.avatar?.url
                      }
                      author={
                        gig?.owner?.firstName + " " + gig?.owner?.lastName
                      }
                      price={gig?.price}
                      rating={gig?.price}
                      imgage={image}
                      deliveredTime={gig?.deliveredTime}
                    />
                  </Link>
                </Grid>
              </>
            );
          })}
        </Grid>
      )}
      <Footer />
    </>
  );
};

export default AllGigs;
