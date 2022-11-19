import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams, useNavigate } from "react-router-dom";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  styled,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const ResetPassword = () => {
  const [values, setValues] = useState({
    showPassword: false,
    new_password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const param = useParams();
  const navigate = useNavigate();
  const [validation, setValidation] = useState({
    new_password: "",
    confirm_password: "",
  });
  let errors = { ...validation };
  const checkValidation = () => {
    //password validation
    const cond1 = /^(?=.*[a-z]).{6,20}$/;
    const cond2 = /^(?=.*[A-Z]).{6,20}$/;
    const cond3 = /^(?=.*[0-9]).{6,20}$/;
    const password = values.new_password;

    if (!password) {
      errors.new_password = "password is required";
    } else if (password.length < 6) {
      errors.new_password = "Password must be longer than 6 characters";
    } else if (password.length >= 20) {
      errors.new_password = "Password must shorter than 20 characters";
    } else if (!password.match(cond1)) {
      errors.new_password = "Password must contain at least one lowercase";
    } else if (!password.match(cond2)) {
      errors.new_password = "Password must contain at least one capital letter";
    } else if (!password.match(cond3)) {
      errors.new_password = "Password must contain at least a number";
    } else {
      errors.new_password = "";
    }

    if (values.confirm_password !== values.new_password) {
      errors.confirm_password = "password does not match";
    } else {
      errors.confirm_password = "";
    }
    setValidation(errors);
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
  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.new_password || !values.confirm_password) {
      setError("Please Enter Passwords");
      return;
    }
    try {
      setLoading(true);
      const url = `http://localhost:4000/user/password-reset/${param.id}/${param.token}`;
      const { data } = await axios.post(url, { password: values.new_password });
      setLoading(false);
      setMsg(data.message);
      setError("");
    } catch (error) {
      console.log(error.response.data);
      setLoading(false);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setMsg("");
      }
    }
  };
  useEffect(() => {
    checkValidation();
  }, [values]);
  return (
    <Box
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(2, 94, 115, 0.25),rgba(255, 255, 255, 0.8),rgba(2, 94, 115, 0.3))",
      }}
    >
      <Header />
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          backgroundImage:
            "linear-gradient(to top,rgba(192, 192, 192, 0.3) ,#fff)",
          boxShadow: "1px 1px 1px 1px #C0C0C0",
          marginTop: "65px",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ mt: 3, bgcolor: "#025e73" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
            Set New Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <FormControl sx={{ mt: 2, width: "100%" }}>
              <InputLabel htmlFor="outlined-adornment-password">
                New Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                name="new_password"
                value={values.new_password}
                onChange={(e) => {
                  handleChange(e);
                }}
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
                label="New Password"
                required
              />
              {values.new_password && (
                <p style={{ color: "red" }}>{validation.new_password}</p>
              )}
            </FormControl>

            <FormControl sx={{ mt: 2, width: "100%" }}>
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                name="confirm_password"
                value={values.confirm_password}
                onChange={(e) => {
                  handleChange(e);
                }}
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
                label=" Confirm Password"
                required
              />
              {values.confirm_password && (
                <p style={{ color: "red" }}>{validation.confirm_password}</p>
              )}
            </FormControl>
            <StyledButton
              fullWidth
              type={"submit"}
              disabled={values.confirm_password !== values.new_password}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? "Plaese Wait" : "Submit"}
            </StyledButton>
          </Box>
          {error && (
            <Box
              sx={{
                color: "red",
                display: "flex",
                mt: 1,
                justifyContent: "center",
              }}
            >
              {error}
            </Box>
          )}
          {msg && (
            <Box
              sx={{
                color: "green",
                display: "flex",
                mt: 1,
                justifyContent: "center",
              }}
            >
              {msg}
            </Box>
          )}
          {loading && (
            <Box
              sx={{
                display: "flex",
                mt: 1,
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default ResetPassword;
const StyledButton = styled(Button)`
  background-color: #f2a71b;
  color: #fff;
  &:hover {
    background-color: #025e73;
  }
`;
