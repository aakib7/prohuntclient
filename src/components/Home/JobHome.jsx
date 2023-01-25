import SingleBlogPost from "../cards/SingleBlogPost";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import SingleJobCard from "../cards/SingleJobCard";
import image from "../../assests/images/main-banner.jpg";

const JobHome = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:4000/jobs?page=${page}&limit=${limit}&search=${""}`;
      const { data } = await axios.get(url);
      setLoading(false);
      setJobs(data.Jobs);
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
      {loading && <Typography>Loading ...</Typography>}
      {!loading && error && <Typography>No gigs ...</Typography>}
      <Grid
        container
        spacing={2}
        alignItems="center"
        pl={{ xs: 2, md: 12, lg: 1 }}
      >
        {jobs?.map((job) => {
          return (
            <Grid item xs={12} md={6} lg={3}>
              <Link
                to={`/job/${job?._id}`}
                style={{ textTransform: "capitalize" }}
              >
                <SingleJobCard
                  title={job?.title}
                  avatar={"http://localhost:4000/" + job?.owner?.avatar?.url}
                  author={job?.owner?.firstName + " " + job?.owner?.lastName}
                  price={job?.price}
                  rating={job?.price}
                  image={`http://localhost:4000/${job?.image?.url}`}
                  deliveredTime={job?.deliveredTime}
                  createdAt={
                    job?.createdAt
                      ? job.createdAt
                      : "2023-01-16T08:28:26.028+00:00"
                  }
                />
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default JobHome;
