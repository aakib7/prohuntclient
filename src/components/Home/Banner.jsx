import React from "react";
import BannerImage from "../../assests/images/main-banner.jpg";
import { Box } from "@mui/system";
import Search from "./Search";
import { Typography } from "@mui/material";
// import { color  from "../../constant.jsx";

const Banner = () => {
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${BannerImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          position: "relative",
          // filter: "blur(3px)",
        }}
      ></Box>
      <Box>
        <Box
          sx={{
            width: { xs: "300", md: "450px" },
            height: { md: "200px" },
            position: "absolute",
            top: { md: 200 },
            left: { xs: 10, sm: 20, md: 280 },
            bottom: { xs: 340, sm: 130 },
          }}
        >
          <Typography
            sx={{
              color: "#f2a71b",
              fontWeight: "bolder",
              fontSize: { xs: "35px", md: "50px" },
              textShadow: "2px 2px #025e73",
            }}
          >
            Say Hello To Your &nbsp;&nbsp;Professional Life!!
          </Typography>
        </Box>
        <Box
          sx={{
            //   backgroundColor: "red",
            width: { xs: "300", sm: "400", md: "450px" },
            height: { md: "50px" },
            position: "absolute",
            top: { md: 410 },
            left: { xs: 50, sm: 170, md: 380 },
            bottom: { xs: 259 },
          }}
        >
          <Search />
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
