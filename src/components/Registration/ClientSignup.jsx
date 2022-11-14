import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddchartIcon from "@mui/icons-material/Addchart";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ClientSignup = () => {
  const [data, setData] = useState({ about: "" });
  const navigate = useNavigate();
  const { role } = useParams();

  const handleChange = (e) => {
    setData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .put(`http://localhost:4000/user/update`, data, config)
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          navigate(`/registration/${role}/detail/profilepicture`);
        }
      })
      .catch((error) => {
        console.log(error.data);
      });
  };
  return (
    <>
      <Container component="form" maxWidth="xs" onSubmit={handleSubmit}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AddchartIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Expertise
          </Typography>
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography fontSize={18} fontWeight={400} padding={1}>
                About
              </Typography>
              <TextField
                autoComplete="given-name"
                name="about"
                required
                value={data.about}
                multiline
                fullWidth
                rows={6}
                id="About"
                label="About"
                autoFocus
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                disabled={false}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submitt
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ClientSignup;
