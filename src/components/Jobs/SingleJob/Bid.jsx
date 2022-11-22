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
import React, { useState, useEffect, useCallback } from "react";
import img1 from "../../../assests/images/main-banner.jpg";
import ReadMore from "../../others/ReadMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
const Bid = () => {
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
            <Avatar
              sx={{ width: "120px", height: "120px" }}
              alt="Travis Howard"
              src={img1}
            />
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
            <Typography>Umer Farooq</Typography>
          </Grid>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={12} md={8} mt={2}>
          <Typography sx={{ textAlign: "left", padding: "10px" }}>
            <ReadMore words={250}>
              Hi, I am very much interested in handling all tasks relevant to
              Designing/Developing Marketing for your One Product Selling
              Dropshipping Shopify webstore with all your requirements and
              available to start work on it immediately. Please have a look at
              my recently completed works on Shopify Web-Stores: 1. [login to
              view URL] (DropShipping Webstore) 2. [login to view URL] (Custom
              Design) 3. [login to view URL] (Custom Design) 4. [login to view
              URL] (Fashion Store) I am very much interested in handling all
              tasks relevant to Designing/Developing Marketing for your One
              Product Selling Dropshipping Shopify webstore with all your
              requirements and available to start work on it immediately. Please
              have a look at my recently completed works on Shopify Web-Stores:
              1. [login to view URL] (DropShipping Webstore) 2. [login to view
              URL] (Custom Design) 3. [login to view URL] (Custom Design) 4.
              [login to view URL] (Fashion Store)
            </ReadMore>
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
              Budget: $900
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
            <StyledButton fullWidth startIcon={<CheckCircleOutlineIcon />}>
              Hire
            </StyledButton>
          </Box>
        </Grid>
      </Grid>
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
