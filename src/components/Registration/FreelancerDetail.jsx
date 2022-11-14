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
import React from "react";
import AddchartIcon from "@mui/icons-material/Addchart";
import { useState } from "react";

const FreelancerDetail = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const top100Films = [
    { id: 0, title: "The Shawshank Redemption", year: 1994 },
    { id: 1, title: "The Godfather", year: 1972 },
    { id: 2, title: "The Godfather: Part II", year: 1974 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    expertise.skill = selectedOptions.map((e) => e.title);
  };

  const [expertise, setExperties] = useState({
    service: "",
    skill: [],
    overView: "",
  });
  const handleChange = (e) => {
    setExperties((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <Container component="main" maxWidth="xs">
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
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography fontSize={18} fontWeight={400} padding={1}>
                What is the main service you offer
              </Typography>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Services</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="service"
                  value={expertise.service}
                  label="Service"
                  required
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <MenuItem value={"Tecnoloy"}>Tecnoloy</MenuItem>
                  <MenuItem value={"Bussiness"}>Bussiness</MenuItem>
                  <MenuItem value={"web"}>web</MenuItem>
                  <MenuItem value={"moblile"}>moblile</MenuItem>
                  <MenuItem value={"Pakistan"}>Pakistan</MenuItem>
                  <MenuItem value={"India"}>India</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography fontSize={18} fontWeight={400} padding={1}>
                What skill do you offer to client
              </Typography>

              <Autocomplete
                multiple
                id="tags-outlined"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                onChange={(e, value) => setSelectedOptions(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="filterSelectedOptions"
                    placeholder="Skills"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography fontSize={18} fontWeight={400} padding={1}>
                Professional Overview
              </Typography>

              <TextField
                id="outlined-multiline-static"
                label="Highlight your skills and experinece"
                required
                name="overView"
                value={expertise.overView}
                multiline
                fullWidth
                rows={4}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            submitt
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FreelancerDetail;
