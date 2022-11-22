import React, { useEffect, useState } from "react";
import { Box, Grid, Pagination } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import image from "../../assests/images/main-banner1.jpg";
import SingleGigCard from "../cards/SingleGigCard";
import axios from "axios";
const GigsList = () => {
  const { subcategory } = useParams();
  const [gigs, setGigs] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    function fetchCategories() {
      setLoading(true);
      axios
        .get("/gigs?category=" + subcategory)
        .then((response) => {
          setGigs(response.data.Gigs);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
    fetchCategories();
  }, []);
  return (
    <Box>
      {/* main Nav  */}

      {/* <Box>
        <Header />
        <SubHeader />
        <HeroSection />
      </Box> */}

      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "flextStart",
          mt: 7,
          ml: { xs: 4, md: 10 },
        }}
      >
        <FilterSideBar />
        <StyledButton
          startIcon={<BadgeIcon />}
          sx={{
            ml: { xs: 4, md: 10 },
          }}
        >
          Gigs
        </StyledButton>
        <StyledButton
          startIcon={<WorkIcon />}
          sx={{
            ml: { xs: 4, md: 10 },
          }}
        >
          Jobs
        </StyledButton>
        <StyledButton
          startIcon={<ArticleIcon />}
          sx={{
            ml: { xs: 4, md: 10 },
          }}
        >
          Blogs
        </StyledButton>
      </Box> */}

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
          {!loading && gigs.length == 0 && <h1>No Gigs</h1>}
          {loading
            ? "loading"
            : gigs.map((gig) => (
                <>
                  <Grid item xs={12} md={6} lg={4}>
                    <Link
                      to={`/gig/${gig._id}`}
                      style={{ textTransform: "capitalize" }}
                    >
                      <SingleGigCard
                        title={gig.title}
                        imgage={image}
                        avatar={image}
                        price={gig.price}
                        author={`${
                          gig?.owner?.firstName ? gig?.owner?.firstName : "user"
                        } ${
                          gig?.owner?.lastName ? gig?.owner?.lastName : "user"
                        }`}
                        rating={gig.rating}
                      />
                    </Link>
                  </Grid>
                </>
              ))}
        </Grid>
      </Box>
      {gigs?.length >= 12 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Box>
      )}
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
