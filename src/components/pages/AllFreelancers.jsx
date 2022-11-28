import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import HeroSection from "../Header/HeroSection";
import SubHeader from "../Header/SubHeader";
import { Grid, Typography, Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import image from "../../assests/images/main-banner.jpg";
import FullPageLoading from "../others/FullPageLoading";
import { Link } from "react-router-dom";
import FreelancerCard from "../cards/FreelancerCard";

const AllFreelancers = ({ header = true, homeSearch }) => {
  const [search, setSearch] = useState("");
  const [total, setTotla] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [freelancers, setFreelancers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  useEffect(() => {
    setSearch(homeSearch ? homeSearch : "");
  }, [homeSearch]);
  const fetchFreelancers = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:4000/user/freelancers?page=${page}&limit=${limit}&search=${search}`;
      const { data } = await axios.get(url);
      setLoading(false);
      setTotla(data.total);
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
  }, [page, search]);
  return (
    <>
      {header && (
        <>
          <Header />
          <SubHeader />
          <HeroSection setSearch={(search) => setSearch(search)} />
        </>
      )}
      {loading && (
        <Box>
          <FullPageLoading />
        </Box>
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
      {!loading && freelancers.length <= 0 && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Typography>No Freelancers To show</Typography>
        </Box>
      )}

      {freelancers && (
        <Grid container marginLeft={5}>
          {freelancers?.map((freelancer) => {
            return (
              <>
                <Grid item xs={12} md={4} lg={3} mt={10}>
                  <Link
                    to={`/freelancer/${freelancer?._id}`}
                    style={{ textTransform: "capitalize" }}
                  >
                    <FreelancerCard freelancer={freelancer} />
                  </Link>
                </Grid>
              </>
            );
          })}
        </Grid>
      )}

      {freelancers?.length > 0 && (
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
              count={Math.ceil(total / limit)}
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

export default AllFreelancers;
