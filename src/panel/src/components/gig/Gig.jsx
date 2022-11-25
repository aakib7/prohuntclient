import { Box, Typography, Button, styled, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import GigCard from "./GigCard";
import AddIcon from "@mui/icons-material/Add";
import GigForm from "./GigForm";
import axios from "axios";
import { Link } from "react-router-dom";

const Gig = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGigs = () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    setLoading(true);
    axios
      .get(`http://localhost:4000/user/gigs`, config)
      .then((response) => {
        setLoading(false);
        setGigs(response.data.gigs);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchGigs();
  }, []);

  return (
    <Box>
      <Box>
        <Typography variant="h4">Gigs</Typography>
      </Box>
      <Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading && <Typography variant="h6">Loading...</Typography>}
          {!loading && gigs?.length <= 0 && (
            <Typography variant="h6">
              No Gigs Added Please Add New Gig
            </Typography>
          )}
        </Box>

        {gigs?.length <= 0 ? (
          ""
        ) : (
          <>
            {gigs.map((gig) => {
              return (
                <>
                  <GigCard
                    title={gig.title}
                    description={gig.description}
                    id={gig._id}
                  />

                  <Divider sx={{ width: "95%" }} />
                </>
              );
            })}
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
        <StyledButton
          onClick={() => {
            setOpen((pre) => !pre);
          }}
          startIcon={<AddIcon />}
        >
          Add New Gig
        </StyledButton>
      </Box>
      <GigForm
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        edit={false}
      />
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
