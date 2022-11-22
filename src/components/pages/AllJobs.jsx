import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import HeroSection from "../Header/HeroSection";
import SubHeader from "../Header/SubHeader";
import { Grid, Typography, Box } from "@mui/material";
import image from "../../assests/images/main-banner.jpg";
import FullPageLoading from "../others/FullPageLoading";
import { Link } from "react-router-dom";
import SingleJobCard from "../cards/SingleJobCard";

const AllJobs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [jobs, setJobs] = useState([]);
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:4000/jobs/jobs`;
      const { data } = await axios.get(url);
      setLoading(false);

      setJobs(data.jobs);
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
    fetchJobs();
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
      )}

      {jobs && (
        <Grid container marginLeft={5}>
          {jobs?.map((job) => {
            return (
              <>
                <Grid item xs={12} md={6} lg={4} mt={10}>
                  <Link
                    to={`/job/${job?._id}`}
                    style={{ textTransform: "capitalize" }}
                  >
                    <SingleJobCard
                      title={job?.title}
                      avatar={
                        "http://localhost:4000/" + job?.owner?.avatar?.url
                      }
                      author={
                        job?.owner?.firstName + " " + job?.owner?.lastName
                      }
                      price={job?.price}
                      rating={job?.price}
                      imgage={image}
                      deliveredTime={job?.deliveredTime}
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

export default AllJobs;
