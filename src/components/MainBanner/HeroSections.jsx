import { Box, Button, Grid, styled, Typography } from "@mui/material";
import img from "../../assests/images/main1.png";
import React from "react";
import SearchHome from "./SearchHome";

const HeroSections = ({ setSearch, setKeyword, keyword }) => {
  return (
    <>
      <Grid
        container
        sx={{ padding: "5rem " }}
        style={{
          backgroundImage:
            "linear-gradient(to top, #fff,rgba(2, 94, 115, 0.3))",
        }}
      >
        <Grid item xs={12} md={6}>
          <Box>
            <Grid item xs={12}>
              <Typography
                sx={{
                  margin: "24px 0",
                  color: "#51087E",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "31px",
                }}
              >
                Explore the opportunities, around the globe.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                // variant="h1"
                sx={{
                  margin: "15px 0",
                  color: "black",
                  fontSize: { xs: "33px", md: "64px" },
                  lineHeight: { xs: "33px", md: "74px" },
                  fontWeight: { xs: "400", md: "500" },
                }}
              >
                Say hello to professional life.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                sx={{
                  margin: "24px 0",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "31px",
                }}
              >
                There are so many variations passages of management Your mindset
                about bussines in your company or agency
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <SearchHome
                setKeyword={setKeyword}
                setSearch={setSearch}
                keyword={keyword}
              />
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <img src={img} />
        </Grid>
      </Grid>
    </>
  );
};

export default HeroSections;
const StyledButton = styled(Button)`
  background-color: #f2a71b;
  color: #fff;
  &:hover {
    background-color: #025e73;
  }
`;

function Search({ setSearch }) {}
