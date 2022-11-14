import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadUser } from "../../store/Actions/User";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  FormControl,
  MenuItem,
  InputAdornment,
  Select,
  InputLabel,
  OutlinedInput,
  IconButton,
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useParams, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");
  const dispatch = useDispatch();
  const { role } = useParams();
  let navigate = useNavigate();

  const [values, setValues] = React.useState({ showPassword: false });
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    country: "",
    confirmPassword: "",
    role: role,
    userName: "",
  });

  const [validation, setValidation] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    country: "",
    confirmPassword: "",
    userName: "",
  });

  let errors = { ...validation };
  const checkValidation = () => {
    //first Name validation
    if (user.firstName.trim().length < 3) {
      errors.firstName = "First Name greater then 3 charactere";
    } else {
      errors.firstName = "";
    }
    if (user.userName.trim().length < 4) {
      errors.userName = "User Name greater then 4 charactere";
    } else {
      errors.userName = "";
    }
    //last Name validation
    if (user.lastName.trim().length < 3) {
      errors.lastName = "Last Name greater then 3 charactere";
    } else {
      errors.lastName = "";
    }

    // email validation
    var mailformat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if (!user.email.trim()) {
      errors.email = "Email is required";
    } else if (!user.email.match(mailformat)) {
      errors.email = `Please ingress a valid email address ${user.email}`;
    } else {
      errors.email = "";
    }

    //password validation
    const cond1 = /^(?=.*[a-z]).{6,20}$/;
    const cond2 = /^(?=.*[A-Z]).{6,20}$/;
    const cond3 = /^(?=.*[0-9]).{6,20}$/;
    const password = user.password;
    if (!password) {
      errors.password = "password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be longer than 6 characters";
    } else if (password.length >= 20) {
      errors.password = "Password must shorter than 20 characters";
    } else if (!password.match(cond1)) {
      errors.password = "Password must contain at least one lowercase";
    } else if (!password.match(cond2)) {
      errors.password = "Password must contain at least one capital letter";
    } else if (!password.match(cond3)) {
      errors.password = "Password must contain at least a number";
    } else {
      errors.password = "";
    }
    setValidation(errors);
  };

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleSubmit = (e) => {
    // matchPassword validation
    e.preventDefault();
    if (
      validation.firstName ||
      validation.lastName ||
      validation.confirmPassword ||
      validation.password ||
      validation.email
    ) {
      setOpen(true);
      setSeverity("error");
      setMessage("Please resolve errors first!! Thanks");
      return;
    }

    if (!user.confirmPassword) {
      setValidation((pre) => ({
        ...pre,
        confirmPassword: "Password confirmation is required",
      }));
      return;
    } else if (user.confirmPassword !== user.password) {
      setValidation((pre) => ({
        ...pre,
        confirmPassword: "Password does not match confirmation password",
      }));
      return;
    }

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .post(`http://localhost:4000/user/register`, user, config)
      .then((response) => {
        setSeverity(response.data.success ? "success" : "error");

        setMessage(
          response.data.success
            ? "Register Success fully"
            : response.data.message
        );
        setOpen(true);
        if (response.data.success) {
          dispatch(loadUser());
          navigate("detail");
        }
      })
      .catch((error) => {
        setMessage(error.message);
        setOpen(true);
      });
  };
  useEffect(() => {
    checkValidation();
  }, [user]);
  useEffect(() => {
    if (!user.confirmPassword) {
      setValidation((pre) => ({
        ...pre,
        confirmPassword: "Password confirmation is required",
      }));
      return;
    } else if (user.confirmPassword !== user.password) {
      setValidation((pre) => ({
        ...pre,
        confirmPassword: "Password does not match confirmation password",
      }));
      return;
    }
    setValidation((pre) => ({ ...pre, confirmPassword: "" }));
  }, [user.confirmPassword]);

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
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl sx={{ mt: 2, width: "100%" }}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={user.firstName}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  {user.firstName && (
                    <p style={{ color: "red" }}>{validation.firstName}</p>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl sx={{ mt: 2, width: "100%" }}>
                  <TextField
                    autoComplete="given-name"
                    name="lastName"
                    required
                    fullWidth
                    id="LastName"
                    label="Last Name"
                    value={user.lastName}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  {user.lastName && (
                    <p style={{ color: "red" }}>{validation.lastName}</p>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ mt: 2, width: "100%" }}>
                  <TextField
                    required
                    fullWidth
                    id="userName"
                    label="User Name"
                    name="userName"
                    value={user.userName}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  {user.userName && (
                    <p style={{ color: "red" }}>{validation.userName}</p>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ mt: 2, width: "100%" }}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={user.email}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  {user.email && (
                    <p style={{ color: "red" }}>{validation.email}</p>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl sx={{ mt: 2, width: "100%" }}>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>

                  <OutlinedInput
                    type={values.showPassword ? "text" : "password"}
                    name="password"
                    value={user.password}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    required
                  />
                  {user.password && (
                    <p style={{ color: "red" }}>{validation.password}</p>
                  )}
                </FormControl>

                <FormControl sx={{ mt: 2, width: "100%" }}>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Confirm Password
                  </InputLabel>

                  <OutlinedInput
                    type={values.showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirmpassword"
                    required
                  />
                </FormControl>
                {user.confirmPassword && (
                  <p style={{ color: "red" }}>{validation.confirmPassword}</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Country</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="country"
                    label="Country"
                    value={user.country}
                    required
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    <MenuItem value={"pakistan"}>Pakistan</MenuItem>
                    <MenuItem value={"india"}>India</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="Term And Conditions"
                      color="primary"
                      required
                    />
                  }
                  label="Agree terms and condition"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              disabled={false}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </>
  );
}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
