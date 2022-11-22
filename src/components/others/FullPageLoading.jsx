import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const FullPageLoading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "80vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default FullPageLoading;
