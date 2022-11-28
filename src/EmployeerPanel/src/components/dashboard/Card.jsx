import React from "react";
import { Box, Typography } from "@mui/material";
import CountUp from "react-countup";
const Card = ({ text = "hello", count = 0 }) => {
  return (
    <>
      <Box
        style={{
          display: "flex",
          width: "240px",
          height: "135px",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#334252",
          flexDirection: "column",
          textTransform: "capitalize",
          color: "white",
          borderRadius: "5px",
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight={500}>
            {text}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5">
            <CountUp end={count} duration={1} />
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Card;
