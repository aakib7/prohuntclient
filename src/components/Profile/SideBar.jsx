import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { useSelector } from "react-redux";
import img1 from "../../assests/images/profile.jpeg";
import DoneIcon from "@mui/icons-material/Done";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import moment from "moment";
import RememberMeIcon from "@mui/icons-material/RememberMe";
import { Link, useNavigate } from "react-router-dom";
const SideBar = () => {
  const { user } = useSelector((state) => state.user);
  const { navigate } = useNavigate();

  return (
    <Container component={"main"} maxWidth="xs">
      <Grid container>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar
              sx={{ width: "200px", height: "200px" }}
              alt="Travis Howard"
              src={user?.avatar.url}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Link to={"/registration/detail/profilepicture/" + user._id}>
            <Button>Change Profile Picture</Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" marginLeft={1.5} spacing={1} mt={2.25}>
            <EmailOutlinedIcon fontSize="small" />
            <Typography
              variant="p"
              alignItems={"center"}
              sx={{ wordBreak: "break-all" }}
            >
              {user.email}
            </Typography>
          </Stack>
          <Stack direction="row" marginLeft={1.5} spacing={1} mt={2}>
            <LocationSearchingIcon fontSize="small" />
            <Typography
              variant="p"
              alignItems={"center"}
              style={{ textTransform: "capitalize" }}
            >
              {user.country}
            </Typography>
          </Stack>

          <Stack direction="row" marginLeft={1.5} spacing={1} mt={2.25}>
            <DoneIcon fontSize="small" />
            <Typography variant="p" alignItems={"center"}>
              {user?.verified ? "varified" : ""}
            </Typography>
          </Stack>

          <Stack direction="row" marginLeft={1.5} spacing={1} mt={2.25}>
            <LanguageIcon fontSize="small" />
            <Typography variant="p" alignItems={"center"}>
              {user?.language}
            </Typography>
          </Stack>
          <Stack direction="row" marginLeft={1.5} spacing={1} mt={2.25}>
            <RememberMeIcon fontSize="small" />
            <Typography variant="p" alignItems={"center"}>
              {user.joined ? moment(user.joined).format("MMMM Do YYYY") : ""}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SideBar;
