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
import moment from "moment/moment";
import TelegramIcon from "@mui/icons-material/Telegram";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import BuyGig from "./BuyGig";
import React from "react";

const RightSideBar = ({
  price,
  deliverTime,
  authorName,
  userId,
  authorImage,
  gig,
  createdAt,
  block,
}) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [openGigModel, setOpenGigModel] = React.useState(false);
  const handleOpenHireModel = () => setOpenGigModel(true);
  const handleCloseGigModel = () => setOpenGigModel(false);
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
          <StyledButton
            variant="contained"
            fullWidth={true}
            disabled={block}
            onClick={() => {
              handleOpenHireModel();
            }}
          >
            Buy Now
          </StyledButton>
        </Grid>
        <Grid item xs={6} mt={2}>
          <TelegramIcon />
          <Typography>Delivered in {deliverTime}</Typography>
        </Grid>
        <Grid item xs={6} mt={2}>
          <AccessTimeIcon />
          <Typography>
            Created At {moment(createdAt).format("MMM Do YYYY")}
          </Typography>
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
      <BuyGig
        open={openGigModel}
        handleClose={handleCloseGigModel}
        name={gig?.owner?.firstName}
        gig={gig}
      />
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
