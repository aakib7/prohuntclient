import {
  Avatar,
  Box,
  Button,
  CardHeader,
  Divider,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import React from "react";

const RightSideBar = () => {
  return (
    <Box
      bgcolor={"#f7f7f7"}
      sx={{ marginRight: { xs: 2, md: 0, height: "80vh" } }}
    >
      <Grid container spacing={0} align="center" justify="center">
        <Grid item xs={12} padding={3}>
          <Typography variant="h3">$15</Typography>
        </Grid>
        <Grid item xs={12} mt={2}>
          <StyledButton variant="contained" fullWidth={true}>
            Buy Now
          </StyledButton>
        </Grid>
        <Grid item xs={4} mt={2}>
          <TelegramIcon />
          <Typography>Delivery in 1 day</Typography>
        </Grid>
        <Grid item xs={4} mt={2}>
          <ThumbUpOffAltIcon />
          <Typography>Rating 100%</Typography>
        </Grid>
        <Grid item xs={4} mt={2}>
          <AccessTimeIcon />
          <Typography>Response time within a few hours</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              R
            </Avatar>
          }
          title="John Doe"
          subheader="September 14, 2022"
        />
        <Divider />
      </Grid>
    </Box>
  );
};

export default RightSideBar;

const StyledButton = styled(Button)`
  background-color: #f2a71b;
  color: #fff;
  &:hover {
    background-color: #025e73;
  }
`;
