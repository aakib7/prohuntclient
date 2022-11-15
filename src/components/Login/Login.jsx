import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/Actions/User";
import Footer from "../Footer/Footer";

const Login = () => {
  const dispatch = useDispatch();
  const { error, isAuthenticated } = useSelector((state) => state.user);
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
    dispatch(loginUser(email, password));
  };
  useEffect(() => {
    if (error) {
      setOpen(true);
      setSeverity("error");
      setMessage(error);
      dispatch({ type: "clearErrors" });
    }
    if (isAuthenticated) {
      setOpen(true);
      setSeverity("success");
      setMessage("Welcome ");
      navigate("/");
    }
  }, [error, dispatch, isAuthenticated]);

  return (
    <Box
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(2, 94, 115, 0.25),rgba(255, 255, 255, 0.8),rgba(2, 94, 115, 0.3))",
      }}
    >
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
          backgroundImage:
            "linear-gradient(to right, rgba(2, 94, 115, 0.3),#fff)",
          boxShadow: "1px 1px 1px 1px #C0C0C0",
          marginTop: "65px",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 7,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ mt: 0, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mt: 2, mb: 3 }}>
            Sign in
          </Typography>
          <Box component="form" onSubmit={loginHandler}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
                required
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

            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // onClick={loginHandler}
            >
              Sign In
            </StyledButton>
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
      <Footer />
    </Box>
  );
};

export default Login;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const StyledButton = styled(Button)`
  background-color: #f2a71b;
  color: #fff;
  &:hover {
    background-color: #025e73;
  }
`;
