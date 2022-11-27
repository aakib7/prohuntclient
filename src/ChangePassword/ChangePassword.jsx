import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputAdornment,
  styled,
  InputLabel,
  OutlinedInput,
  IconButton,
  Snackbar,
  Alert,
  Container,
  Typography,
  Grid,
  Box,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";

function ChangePassword() {
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");
  const [values, setValues] = React.useState({ showPassword: false });
  const [val, setVal] = React.useState({ showConformPassword: false });
  const [user, setUser] = useState({
    password: "",
    confirmPassword: "",
    oldPassword: "",
  });
  const [validation, setValidation] = useState({
    password: "",
    confirmPassword: "",
    oldPassword: "",
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowPassword1 = () => {
    setVal({
      ...val,
      showConformPassword: !val.showConformPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    // matchPassword validation
    e.preventDefault();

    if (
      validation.confirmPassword ||
      validation.password ||
      validation.oldPassword
    ) {
      setOpen(true);
      setSeverity("error");
      setMessage("Please resolve errors first!! Thanks");
      return;
    }
    if (user.oldPassword === user.password) {
      setOpen(true);
      setSeverity("error");
      setMessage("Old and New Passwords are same please change it.");
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
      .post(
        `http://localhost:4000/user/changepassword`,
        {
          oldPassword: user.oldPassword,
          newPassword: user.password,
        },
        config
      )
      .then((response) => {
        setSuccess(true);
        setOpen(true);
        setSeverity("success");
        setMessage("Password Change SuccessFully");
        window.location.reload(true);
      })
      .catch((error) => {
        setError(true);
        setOpen(true);
        setSeverity("error");
        setMessage(error.response.data.message);
        console.log(error.response.data.message);
      });
  };

  let errors = { ...validation };

  const checkValidation = () => {
    //password validation
    const cond1 = /^(?=.*[a-z]).{6,20}$/;
    const cond2 = /^(?=.*[A-Z]).{6,20}$/;
    const cond3 = /^(?=.*[0-9]).{6,20}$/;
    const password = user.password;
    const oldPassword = user.oldPassword;

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
    if (!oldPassword) {
      errors.oldPassword = "password is required";
    } else if (oldPassword.length < 6) {
      errors.oldPassword = "Password must be longer than 6 characters";
    } else if (oldPassword.length >= 20) {
      errors.oldPassword = "Password must shorter than 20 characters";
    } else if (!oldPassword.match(cond1)) {
      errors.oldPassword = "Password must contain at least one lowercase";
    } else if (!oldPassword.match(cond2)) {
      errors.oldPassword = "Password must contain at least one capital letter";
    } else if (!oldPassword.match(cond3)) {
      errors.oldPassword = "Password must contain at least a number";
    } else {
      errors.oldPassword = "";
    }
    setValidation(errors);
  };
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      <Container
        component={"main"}
        maxWidth={"xs"}
        sx={{
          backgroundImage:
            "linear-gradient(to top,rgba(192, 192, 192, 0.5) ,#fff)",
          backgroundColor: "white",
          boxShadow: "2px 2px 2px 2px lightgray",
          borderRadius: "3px",
          mt: 2,
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
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
        <Typography
          sx={{
            fontSize: { xs: 16, sm: 18, md: 24 },
            textAlign: "center",
            fontWeight: "400",
          }}
          variant="h5"
        >
          Change Password
        </Typography>

        <Box component="form" mb={2} onSubmit={handleSubmit}>
          <Grid item xs={12} mb={2}>
            <FormControl sx={{ mt: 2, width: "100%" }}>
              <InputLabel htmlFor="outlined-adornment-password">
                Old Password
              </InputLabel>

              <OutlinedInput
                type={values.showPassword ? "text" : "password"}
                name="oldPassword"
                value={user.oldPassword}
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
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Old Password"
                required
              />
              {user.oldPassword && (
                <p style={{ color: "red" }}>{validation.oldPassword}</p>
              )}
            </FormControl>
            {/* /// */}
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
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
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

            <FormControl sx={{ mt: 3, width: "100%" }}>
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm Password
              </InputLabel>

              <OutlinedInput
                type={val.showConformPassword ? "text" : "password"}
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={(e) => {
                  handleChange(e);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword1}
                      onMouseDown={handleMouseDownPassword1}
                      edge="end"
                    >
                      {val.showConformPassword ? (
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
              {user.confirmPassword && (
                <p style={{ color: "red" }}>{validation.confirmPassword}</p>
              )}
            </FormControl>
          </Grid>
          <StyledButton
            type="submit"
            fullWidth
            disabled={false}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Change Password
          </StyledButton>
        </Box>
      </Container>
    </>
  );
}

export default ChangePassword;
const StyledButton = styled(Button)`
  background-color: #f2a71b;
  color: #fff;
  &:hover {
    background-color: #025e73;
  }
`;
