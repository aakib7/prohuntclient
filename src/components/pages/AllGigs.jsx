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
import Pagination from "@mui/material/Pagination";

const AllGigs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [gigs, setGigs] = useState([]);
  //pagination and search
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [total, setTotla] = useState(0);

  const fetchGigs = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:4000/gigs?page=${page}&limit=${limit}&search=${search}`;
      const { data } = await axios.get(url);
      setLoading(false);
      setGigs(data.Gigs);
      setTotla(total);
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
  }, [search, page]);
  return (
    <>
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
      {!loading && gigs.length <= 0 && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Typography>No Blogs To show</Typography>
        </Box>
      )}
      <Header />
      <SubHeader />
      <HeroSection setSearch={(search) => setSearch(search)} />
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
      {gigs?.length > 0 && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "60px",
          }}
        >
          <Pagination
            count={Math.ceil(total / limit)}
            onChange={(event, value) => {
              setPage(value);
            }}
            color="primary"
          />
        </Box>
      )}
      <Footer />
    </>
  );
};

export default AllGigs;
