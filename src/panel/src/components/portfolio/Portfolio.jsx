import React, { useState, useEffect } from "react";
import { Box, Typography, Button, styled, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FullPageLoading from "../../../../components/others/FullPageLoading";
import PortfolioCard from "./PortfolioCard";
import PortfolioForm from "./PortfolioForm";
import axios from "axios";
const Portfolio = () => {
  const [portfolio, setportfolio] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const fetchPortfolio = () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    setLoading(true);
    axios
      .get(`http://localhost:4000/portfolio`, config)
      .then((response) => {
        setLoading(false);

        setportfolio(response.data.portfolio);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchPortfolio();
  }, []);

  return (
    <>
      <Box>
        <Box>
          <Typography variant="h4">Portfolio</Typography>
        </Box>
        <Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loading && <FullPageLoading />}
            {!loading && portfolio?.length <= 0 && (
              <Typography variant="h6">
                No Portfolio Added Please Add New Portfolio
              </Typography>
            )}
          </Box>
          {portfolio?.length <= 0
            ? ""
            : portfolio?.map((port) => {
                return (
                  <PortfolioCard
                    title={port.introduction}
                    id={port._id}
                    image={`http://localhost:4000/${port.pictures[0]}`}
                  />
                );
              })}

          <Divider sx={{ width: "95%" }} />
          {/* </>
                );
              })} */}
          {/* )} */}
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
            Add New Portfolio
          </StyledButton>
        </Box>
        <PortfolioForm
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      </Box>
    </>
  );
};

export default Portfolio;

const StyledButton = styled(Button)`
  background-color: #f2a71b;
  color: #fff;
  &:hover {
    background-color: green;
  }
`;
