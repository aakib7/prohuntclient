import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import About from "./About";
import SideBar from "./SideBar";
import axios from "axios";

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchUser = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:4000/user/user/${userId}`;
      const { data } = await axios.get(url);
      setLoading(false);
      setUser(data.user);
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        // setError(error.response.data.message);
        navigate("/404");
        setError(true);
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, [userId]);
  return (
    <>
      <Box
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff,rgba(2, 94, 115, 0.4))",
        }}
      >
        <Header />
        {loading && <Typography>Loading...</Typography>}
        {!loading && error && <Typography>User Not Found</Typography>}
        <Container
          sx={{
            width: "90%",
            backgroundImage:
              "linear-gradient(to top,rgba(192, 192, 192, 0.3) ,#fff)",
            marginTop: 3,
          }}
        >
          <Grid container spacing={2}>
            <Grid item md={3}>
              <SideBar user={user} />
            </Grid>

            <Divider orientation="vertical" flexItem />

            <Grid item md={8}>
              <About user={user} id={userId} />
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default UserProfile;
