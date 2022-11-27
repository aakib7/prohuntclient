import SingleBlogPost from "../cards/SingleBlogPost";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import SingleGigCard from "../cards/SingleGigCard";

const GigHome = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [gigs, setGigs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const fetchGigs = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:4000/gigs?page=${page}&limit=${limit}&search=${""}`;
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
      {loading && <Typography>Loading ...</Typography>}
      {!loading && error && <Typography>No gigs ...</Typography>}
      <Grid
        container
        spacing={2}
        alignItems="center"
        pl={{ xs: 2, md: 12, lg: 1 }}
      >
        {gigs?.map((gig) => {
          return (
            <Grid item xs={12} md={6} lg={3}>
              <Link
                to={`/gig/${gig?._id}`}
                style={{ textTransform: "capitalize" }}
              >
                <SingleGigCard
                  title={gig?.title}
                  avatar={"http://localhost:4000/" + gig?.owner?.avatar?.url}
                  author={gig?.owner?.firstName + " " + gig?.owner?.lastName}
                  price={gig?.price}
                  rating={gig?.rating}
                  imgage={"http://localhost:4000/" + gig.image.url}
                  deliveredTime={gig?.deliveredTime}
                />
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default GigHome;
