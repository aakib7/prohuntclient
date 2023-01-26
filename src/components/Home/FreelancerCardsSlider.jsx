import React, { useState, useEffect } from "react";
import Carousel from "react-elastic-carousel";
import FreelancerCard from "../cards/FreelancerCard";
import axios from "axios";
import { Link } from "react-router-dom";
import { Skeleton, Box, Stack } from "@mui/material";

const FreelancerCardsSlider = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [freelancers, setFreelancers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const fetchFreelancers = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:4000/user/freelancers?page=${page}&limit=${limit}&search=${""}`;
      const { data } = await axios.get(url);
      setLoading(false);

      setFreelancers(data.freelancer);
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
    fetchFreelancers();
  }, []);
  return (
    <Carousel breakPoints={breakPoints} pagination={false}>
      {loading ? (
        <Stack direction="row" spacing={3.5}>
          <Box sx={{ pt: 0.5 }}>
            <Stack spacing={1} justifyContent="center" alignItems="center">
              <Skeleton variant="circular" width={110} height={110} />
              <Skeleton variant="rectangular" width={310} height={250} />
              <Skeleton variant="rectangular" width={310} height={70} />
            </Stack>
          </Box>
          <Box sx={{ pt: 0.5 }}>
            <Stack spacing={1} justifyContent="center" alignItems="center">
              <Skeleton variant="circular" width={110} height={110} />
              <Skeleton variant="rectangular" width={310} height={250} />
              <Skeleton variant="rectangular" width={310} height={70} />
            </Stack>
          </Box>
          <Box sx={{ pt: 0.5 }}>
            <Stack spacing={1} justifyContent="center" alignItems="center">
              <Skeleton variant="circular" width={110} height={110} />
              <Skeleton variant="rectangular" width={310} height={250} />
              <Skeleton variant="rectangular" width={310} height={70} />
            </Stack>
          </Box>
          <Box sx={{ pt: 0.5 }}>
            <Stack spacing={1} justifyContent="center" alignItems="center">
              <Skeleton variant="circular" width={110} height={110} />
              <Skeleton variant="rectangular" width={310} height={250} />
              <Skeleton variant="rectangular" width={310} height={70} />
            </Stack>
          </Box>
        </Stack>
      ) : (
        freelancers.map((freelancer) => {
          return (
            <Link to={`/profile/${freelancer._id}`}>
              <FreelancerCard freelancer={freelancer} />
            </Link>
          );
        })
      )}
    </Carousel>
  );
};

export default FreelancerCardsSlider;

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 600, itemsToShow: 2 },
  { width: 900, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];
