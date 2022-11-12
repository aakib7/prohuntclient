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
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import React from "react";
import AddchartIcon from "@mui/icons-material/Addchart";

const FreelancerDetail = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  console.log(errors);

  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
    {
      title: "The Lord of the Rings: The Return of the King",
      year: 2003,
    },
    { title: "The Good, the Bad and the Ugly", year: 1966 },
    { title: "Fight Club", year: 1999 },
    {
      title: "The Lord of the Rings: The Fellowship of the Ring",
      year: 2001,
    },
    {
      title: "Star Wars: Episode V - The Empire Strikes Back",
      year: 1980,
    },
    { title: "Forrest Gump", year: 1994 },
    { title: "Inception", year: 2010 },
    {
      title: "The Lord of the Rings: The Two Towers",
      year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: "Goodfellas", year: 1990 },
    { title: "The Matrix", year: 1999 },
    { title: "Seven Samurai", year: 1954 },
    {
      title: "Star Wars: Episode IV - A New Hope",
      year: 1977,
    },
    { title: "City of God", year: 2002 },
    { title: "Se7en", year: 1995 },
    { title: "The Silence of the Lambs", year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: "Life Is Beautiful", year: 1997 },
    { title: "The Usual Suspects", year: 1995 },
    { title: "Léon: The Professional", year: 1994 },
    { title: "Spirited Away", year: 2001 },
    { title: "Saving Private Ryan", year: 1998 },
  ];
  
  return (
    <Container
      component="main"
      maxWidth="xs"
      
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {" "}
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
              What is te main service you offer
            </Typography>
            <Controller
                control={control}
                name="Services"
                rules={{ required: "this field is required." }}
                render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Services</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Service"
                
                // onChange={handleChange}
                {...field}
                error={Boolean(errors?.Services)}
                helperText={errors.Services?.message}
              >
                <MenuItem value={10}>Tecnoloy</MenuItem>
                <MenuItem value={20}>Bussiness</MenuItem>
                <MenuItem value={30}>web</MenuItem>
                <MenuItem value={40}>moblile</MenuItem>
                <MenuItem value={50}>Pakistan</MenuItem>
                <MenuItem value={60}>Pakistan</MenuItem>
              </Select>
            </FormControl>)}/>
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
              renderInput={(params) => (
                
                <TextField
                  {...params}
                  label="select Skill"
                  placeholder="Favorites"
                 
                />
              )}
            
            />
           
          </Grid>
          <Grid item xs={12}>
            <Typography fontSize={18} fontWeight={400} padding={1}>
              Professional Overview
            </Typography>
           
            <Controller
                control={control}
                name="Experience"
                rules={{ required: "this field is required." }}
                render={({ field }) => (
<TextField
          id="outlined-multiline-static"
          label="Highlight your skills and experinece"
          multiline
          fullWidth
          rows={4}
          defaultValue="Default Value"
          {...field}
                error={Boolean(errors?.Experience)}
                helperText={errors.Experience?.message}
        />)}/>
          </Grid>
        </Grid>
        
      </Box>
    </Container>
  );
};

export default FreelancerDetail;
