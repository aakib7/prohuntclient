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
import Pagination from "@mui/material/Pagination";

const AllJobs = ({ header = true, homeSearch }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  useEffect(() => {
    setSearch(homeSearch ? homeSearch : "");
  }, [homeSearch]);
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:4000/jobs?page=${page}&limit=${limit}&search=${search}`;
      const { data } = await axios.get(url);
      setLoading(false);
      setJobs(data.Jobs);
      setTotal(data.total);
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
  }, [search, page]);
  return (
    <>
      {header && (
        <>
          <Header />
          <SubHeader />
          <HeroSection setSearch={(search) => setSearch(search)} />
          {loading && <FullPageLoading />}
        </>
      )}

      {!loading && error && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Typography>Somthing happend bad try again Later</Typography>
        </Box>
      )}
      {!loading && jobs.length <= 0 && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Typography>No Jobs To show</Typography>
        </Box>
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
                      rating={job?.rating}
                      image={`http://localhost:4000/${job?.image.url}`}
                      deliveredTime={job?.deliveredTime}
                    />
                  </Link>
                </Grid>
              </>
            );
          })}
        </Grid>
      )}
      {jobs?.length > 0 && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "60px",
          }}
        >
          {header && (
            <Pagination
              count={Math.ceil(total / 10)}
              onChange={(event, value) => {
                setPage(value);
              }}
              color="primary"
            />
          )}
        </Box>
      )}
      {header && <Footer />}
    </>
  );
};

export default AllJobs;
