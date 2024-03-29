import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
// import image from "../../assests/images/main-banner1.jpg";
import SingleGigCard from "../cards/SingleGigCard";
import axios from "axios";
import FullPageLoading from "../others/FullPageLoading";
import FilterButton from "../SubCategories/FilterButton";
const GigsList = ({ search }) => {
  const { subcategory } = useParams();
  const [gigs, setGigs] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    function fetchCategories() {
      setLoading(true);
      const url = `http://localhost:4000/gigs?category=${subcategory}&search=${search}`;
      axios
        .get(url)
        .then((response) => {
          setGigs(response.data.Gigs);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(true);
        });
    }
    fetchCategories();
  }, [search]);
  const minprice = () => {
    const numDescending = [...gigs].sort((a, b) => b.price - a.price);
    setGigs(numDescending);
  };
  const maxprice = () => {
    const numDescending = [...gigs].sort((a, b) => a.price - b.price);
    setGigs(numDescending);
  };

  return (
    <Box>
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
          <Typography>No Gigs To show</Typography>
        </Box>
      )}
      {!loading && gigs.length > 0 && (
        <Box
          sx={{
            marginRight: "30px",
            marginTop: "20px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <FilterButton onClick={minprice} onClick1={maxprice} />
        </Box>
      )}
      {/* Cards */}
      <Box
        sx={{
          display: "flex",
          mt: 7,
          width: "100%",
          paddingX: "3%",
        }}
      >
        <Grid container spacing={2}>
          {gigs?.map((gig) => (
            <>
              <Grid item xs={12} md={6} lg={4}>
                <Link
                  to={`/gig/${gig._id}`}
                  style={{ textTransform: "capitalize" }}
                >
                  <SingleGigCard
                    title={gig.title}
                    imgage={"http://localhost:4000/" + gig?.image?.url}
                    avatar={"http://localhost:4000/" + gig?.owner?.avatar.url}
                    price={gig.price}
                    author={`${
                      gig?.owner?.firstName ? gig?.owner?.firstName : "user"
                    } ${gig?.owner?.lastName ? gig?.owner?.lastName : "user"}`}
                    rating={gig.rating}
                  />
                </Link>
              </Grid>
            </>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default GigsList;
// const StyledButton = styled(Button)`
//   background-color: #f2a71b;
//   color: #fff;
//   &:hover {
//     background-color: #025e73;
//   }
// `;
