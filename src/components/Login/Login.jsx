import React from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import IconButton from "@mui/material/IconButton";

const theme = createTheme();

const Login = () => {
  const [values, setValues] = React.useState({ showPassword: false });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ backgroundColor: "#F7F7F7", boxShadow: "2px 2px 2px 2px #C0C0C0" }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "70vh",
        }}
      >
        <Avatar sx={{ mt: 6, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
          Sign in
        </Typography>
        <Box component="form">
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />

          <FormControl sx={{ mt: 2, width: "100%" }}>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              //onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <Grid container sx={{ mt: "15px" }}>
            <Grid
              display={"flex"}
              direction="column"
              justifyContent="flex-end"
              alignItems="flex-end"
              item
              xs
            >
              <Typography variant="body2">Forgot password?</Typography>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid
              display={"flex"}
              direction="row"
              justifyContent="center"
              alignItems="center"
              item
              xs
              sx={{ mt: 3 }}
            >
              <Typography variant="body2">
                {"Don't have an account? Sign Up"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
