import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  FilledInput,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import React, { useState } from "react";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import SellIcon from "@mui/icons-material/Sell";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Stack } from "@mui/system";
const ClientDetail = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  console.log(errors);

  const [hourly, setHourly] = React.useState();
  const [project, setProject] = React.useState(false);
  const handleClient = () => {
    setHourly((pre) => !pre);
    setProject(false);
  };

  const handleFreelancer = () => {
    setProject((pre) => !pre);
    setHourly(false);
  };
  return (
    // <>
    //   <Container
    //     component="main"
    //     maxWidth="xs"

    //   >
    //     <CssBaseline />
    //     <Box
    //       sx={{
    //         marginTop: 5,
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center",
    //       }}
    //     >
    //       <Grid container >
    //         <Grid item xs={10} md={6} sx={{border:'2px solid green'}} padding={1} >

    //                     <QueryBuilderIcon/>
    //                 <Typography>Hourly rate</Typography>

    //         </Grid>
    //         <Grid item xs={12} md={6} sx={{border:'2px solid green',marginTop:{xs:'5px',md:'0px'}}} padding={1} >
    //             <SellIcon/>
    //             <Typography>Project budget</Typography>

    //         </Grid>
    //       </Grid>
    //     </Box>
    //   </Container>
    // </>
    <Container component={"main"} maxWidth={"md"}>
      <CssBaseline />
      <Box   sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 10
        }}>
           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <PriceChangeIcon />
        </Avatar>
          <Typography component="h1" variant="h5"> Tell about your budget</Typography>
        <Stack direction={"row"} mt={3}>
          <Grid container spacing={3}>
            
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="AmoutFrom"
                rules={{ required: "this field is required." }}
                render={({ field }) => (
                  <Box
                    onClick={handleClient}
                    sx={{
                      alignContent: "center",
                      justifyContent: "center",
                      backgroundColor: "",
                      border: 2,
                      borderColor: hourly ? "green" : "lightgray",
                      "&:hover": {
                        borderColor: "green",
                        opacity: [0.9, 0.8, 0.7],
                      },
                    }}
                  >
                    <QueryBuilderIcon />
                    <Typography variant="h6" align="center" padding={5}>
                      Hourly
                    </Typography>
                  </Box>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="AmoutFrom"
                rules={{ required: "this field is required." }}
                render={({ field }) => (
                  <Box
                    onClick={handleFreelancer}
                    sx={{
                      border: 2,
                      borderColor: project ? "green" : "lightgray",
                      "&:hover": {
                        borderColor: "green",
                        opacity: [0.9, 0.8, 0.7],
                      },
                    }}
                  >
                    <SellIcon />
                    <Typography variant="h6" align="center" padding={5}>
                      Project
                    </Typography>
                  </Box>
                )}
              />
            </Grid>
          </Grid>
        </Stack>
      </Box>

      <></>

      {hourly ? (
        <Grid container mt={3}>
          <Grid item xs={6}>
            <Typography>From</Typography>
            <Controller
              control={control}
              name="AmoutFrom"
              rules={{ required: "this field is required." }}
              render={({ field }) => (
                <FormControl sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Amount
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    // value={values.amount}
                    // onChange={handleChange('amount')}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Amount"
                    required
                    {...field}
                    error={Boolean(errors?.AmoutFrom)}
                    helperText={errors.AmoutFrom?.message}
                  />
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>To</Typography>
            <Controller
              control={control}
              name="AmoutTo"
              rules={{ required: "this field is required." }}
              render={({ field }) => (
                <FormControl sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Amount
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    // value={values.amount}
                    // onChange={handleChange('amount')}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Amount"
                    required
                    {...field}
                    error={Boolean(errors?.AmoutTo)}
                    helperText={errors.AmoutTo?.message}
                  />
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
      ) : (
        ""
      )}
      {project ? (
        <Grid container mt={3}>
          <Grid item xs={12}>
            <Typography>Total Price</Typography>
            <Controller
              control={control}
              name="Amount"
              rules={{ required: "this field is required." }}
              render={({ field }) => (
                <FormControl sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Amount
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    // value={values.amount}
                    // onChange={handleChange('amount')}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Amount"
                    required
                    {...field}
                    error={Boolean(errors?.Amount)}
                    helperText={errors.Amount?.message}
                  />
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
      ) : (
        ""
      )}
    </Container>
  );
};

export default ClientDetail;
