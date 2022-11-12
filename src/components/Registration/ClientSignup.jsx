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

const ClientSignup = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  console.log(errors);
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
              Write headline of your job post
            </Typography>
            <Controller
              control={control}
              name="headline"
              rules={{ required: "this field is required." }}
              render={({ field }) => (
                <TextField
                  autoComplete="given-name"
                  name="headline"
                  required
                  multiline
                  fullWidth
                  rows={4}
                  id="headline"
                  label="headline"
                  autoFocus
                  {...field}
                  error={Boolean(errors?.headline)}
                  helperText={errors.headline?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ClientSignup;
