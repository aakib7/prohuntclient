import {
  CssBaseline,
  Grid,
  styled,
  Button,
  Typography,
  Stack,
  Avatar,
  Divider,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import img1 from "../../../assests/images/main-banner.jpg";
import ReadMore from "../../others/ReadMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useSelector } from "react-redux";
import HireModel from "./HireModel";
const Bid = ({ bid, ownerId, job }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [openHireModel, setOpenHireModel] = React.useState(false);
  const handleOpenHireModel = () => setOpenHireModel(true);
  const handleCloseHireModel = () => setOpenHireModel(false);
  return (
    <>
      <Grid
        container
        maxWidth={"100%"}
        sx={{
          backgroundImage:
            "linear-gradient(to top,rgba(192, 192, 192, 0.3) ,#fff)",
          boxShadow: "1px 1px 1px 1px #C0C0C0",
          marginTop: "65px",
        }}
      >
        <Grid item xs={12} md={3} mt={2}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Link to={`/profile/${bid?.owner?._id}`}>
              <Avatar
                sx={{ width: "120px", height: "120px" }}
                alt={bid?.owner?.firstName}
                src={`http://localhost:4000/${bid?.owner?.avatar.url}`}
              />
            </Link>
          </Box>
          <Grid
            item
            xs={12}
            sx={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link to={`/profile/${bid?.owner?._id}`}>
              <Typography
                style={{ textTransform: "capitalize", color: "black" }}
              >
                {bid?.owner?.firstName + " " + bid?.owner?.lastName}
              </Typography>
            </Link>
          </Grid>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={12} md={8} mt={2}>
          <Typography
            sx={{ textAlign: "left", padding: "10px", wordBreak: "break-all" }}
          >
            <ReadMore words={250}>{bid?.description}</ReadMore>
          </Typography>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "30px",
            }}
          >
            <Typography fontSize={18} fontWeight={500}>
              Budget: ${bid.budget}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "flex-end",

            paddingX: "25px",
          }}
        >
          <Box
            style={{
              width: "200px",
              height: "45px",
            }}
          >
            {isAuthenticated
              ? user._id.toString() === ownerId && (
                  <StyledButton
                    fullWidth
                    startIcon={<CheckCircleOutlineIcon />}
                    onClick={() => {
                      handleOpenHireModel();
                    }}
                  >
                    Hire
                  </StyledButton>
                )
              : ""}
          </Box>
        </Grid>
      </Grid>
      <HireModel
        open={openHireModel}
        handleClose={handleCloseHireModel}
        name={bid?.owner?.firstName}
        job={job}
        bid={bid}
      />
    </>
  );
};

export default Bid;
const StyledButton = styled(Button)`
  background-color: #f2a71b;

  color: #fff;
  &:hover {
    background-color: #025e73;
  }
`;
