import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/Actions/User";

const Login = () => {
  const dispatch = useDispatch();
  const { error, isAuthenticated, loading, user } = useSelector(
    (state) => state.user
  );
  let navigate = useNavigate();

  const [values, setValues] = React.useState({ showPassword: false });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const loginHandler = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setOpen(true);
      setSeverity("error");
      setMessage("Please fill Email And Password feildes");
      return;
    }

    dispatch(loginUser(email, password));
  };
  useEffect(() => {
    if (error) {
      setOpen(true);
      setSeverity("error");
      setMessage(error);
      console.log("err");
    }
    if (isAuthenticated) {
      setOpen(true);
      setSeverity("success");
      setMessage("Welcome " + user.firstName);
      navigate("/");
    }
  }, [error, isAuthenticated]);

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          style={{ textTransform: "capitalize" }}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Header />

      <Container
        component="main"
        maxWidth="xs"
        sx={{
          backgroundColor: "#F7F7F7",
          boxShadow: "2px 2px 2px 2px #C0C0C0",
          marginTop: "30px",
        }}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <FormControl sx={{ mt: 2, width: "100%" }}>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              onClick={loginHandler}
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
    </>
  );
};

export default Login;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
