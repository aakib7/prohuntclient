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
import { Link } from "react-router-dom";
import React from "react";

const RightSideBar = ({
  price,
  deliverTime,
  authorName,
  userId,
  authorImage,
}) => {
  return (
    <Box
      bgcolor={"#f7f7f7"}
      sx={{ marginRight: { xs: 2, md: 0, height: "80vh" } }}
    >
      <Grid container spacing={0} align="center" justify="center">
        <Grid item xs={12} padding={3}>
          <Typography variant="h5" fontWeight={500}>
            Price: ${price}
          </Typography>
        </Grid>
        <Grid item xs={12} mt={1.5}>
          <StyledButton variant="contained" fullWidth={true}>
            Buy Now
          </StyledButton>
        </Grid>
        <Grid item xs={6} mt={2}>
          <TelegramIcon />
          <Typography>Deliver in {deliverTime}</Typography>
        </Grid>
        <Grid item xs={6} mt={2}>
          <ThumbUpOffAltIcon />
          <Typography>Rating 100%</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
        <Link to={`/profile/${userId}`}>
          <CardHeader
            style={{
              textTransform: "capitalize",
              color: "black",
              fontWeight: "500",
              fontSize: "18px",
            }}
            avatar={
              <Avatar
                aria-label={`${authorName}`}
                sx={{ width: 50, height: 50 }}
                src={authorImage}
              />
            }
            title={authorName}
          />
        </Link>

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
