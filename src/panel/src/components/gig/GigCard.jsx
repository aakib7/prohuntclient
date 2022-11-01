import React from "react";
import { Box, Grid, Button, styled, Typography, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import BannerImage from "../../../../assests/images/main-banner.jpg";

const GigCard = () => {
  return (
    <Grid
      container
      sx={{ backgroundColor: "#a5a692" }}
      style={{
        width: "100%",
        height: "80px",
        marginTop: "4px",
      }}
    >
      <Grid
        item
        style={{
          width: "20%",
          height: "100%",
        }}
      >
        <img style={{ height: "100%", width: "100%" }} src={BannerImage} />
      </Grid>
      <Grid
        item
        style={{
          width: "60%",
          height: "100%",
        }}
      >
        <Grid container direction={"column"}>
          <Grid item>
            <Typography variant="h6" sx={{ ml: 2 }}>
              I Make You a Responsive website.
            </Typography>
          </Grid>
          <Grid
            item
            sx={{ display: { xs: "none", sm: "none", lg: "block" }, ml: 2 }}
          >
            <Typography variant="p" sx={{ textAlign: "center" }}>
              I Make You a Responsive websiteI Make You a Responsive websiteI
              Make You a Responsive websiteI Make You a Responsive website
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        style={{
          width: "20%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid container direction={"column"}>
          <Grid item>
            <Box
              sx={{
                display: { xs: "block", lg: "none" },
                marginLeft: 2,
                mt: 1,
              }}
            >
              <Tooltip title="Delete Gig">
                <DeleteIcon />
              </Tooltip>
            </Box>
            <Box
              sx={{
                display: { xs: "none", lg: "block" },
                marginLeft: { lg: 4 },
              }}
            >
              <StyledButtonDelete startIcon={<DeleteIcon />}>
                Delete Gig
              </StyledButtonDelete>
            </Box>
          </Grid>
          <Grid item marginTop={"5px"}>
            <Box
              sx={{
                display: { xs: "block", lg: "none" },
                marginLeft: 2,
                mt: 1,
              }}
            >
              <Tooltip title="Edit Gig">
                <EditIcon />
              </Tooltip>
            </Box>
            <Box
              sx={{
                display: { xs: "none", lg: "block" },
                marginLeft: { lg: 4 },
              }}
            >
              <StyledButtonEdit startIcon={<EditIcon />}>
                Edit Gig
              </StyledButtonEdit>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GigCard;
const StyledButtonDelete = styled(Button)`
  background-color: #f2a71b;
  color: #fff;
  width: 130px;
  margin-left: 48px;
  &:hover {
    background-color: red;
  }
`;
const StyledButtonEdit = styled(Button)`
  background-color: #025e73;
  color: #fff;
  width: 130px;
  margin-left: 48px;
  &:hover {
    background-color: purple;
  }
`;

<Tooltip title="Delete"></Tooltip>;
