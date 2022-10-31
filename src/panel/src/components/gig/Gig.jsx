import { Box, Typography, Button, styled, Divider } from "@mui/material";
import React from "react";
import GigCard from "./GigCard";
import AddIcon from "@mui/icons-material/Add";

const Gig = () => {
  const count = 0;
  return (
    <Box>
      <Box>
        <Typography variant="h3">Gigs</Typography>
      </Box>
      <Box>
        {count ? (
          <>
            <Typography variant="h3">
              No Gigs Added Please Add New Gig
            </Typography>
          </>
        ) : (
          <>
            <GigCard />
            <Divider sx={{ width: "95%" }} />
            <GigCard />
            <Divider sx={{ width: "95%" }} />
            <GigCard />
            <Divider sx={{ width: "95%" }} />
            <GigCard />
            <Divider sx={{ width: "95%" }} />
            <GigCard />
            <Divider sx={{ width: "95%" }} />
          </>
        )}
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "30px",
          height: "45px",
        }}
      >
        <StyledButton startIcon={<AddIcon />}>Add New Gig</StyledButton>
      </Box>
    </Box>
  );
};

export default Gig;

const StyledButton = styled(Button)`
  background-color: #f2a71b;
  color: #fff;
  &:hover {
    background-color: green;
  }
`;
