import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Alert as MuiAlert,
  Snackbar,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import SubHeader from "../Header/SubHeader";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../../store/Actions/User";

const ClientSignup = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { error, setError } = useState(false);
  const isEditing = id ? true : false;
  const [data, setData] = useState({ about: "", enterDetails: true });
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");
  const [disable, setDisable] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .put(`http://localhost:4000/user/update`, data, config)
      .then((response) => {
        if (response.data.success && !isEditing) {
          navigate(`/registration/detail/profilepicture`);
        }
        if (isEditing) {
          setOpen(true);
          setSeverity("success");
          setMessage("User Profile Edit Success Fully");
          setDisable(true);
        }
      })
      .catch((error) => {
        setError(true);
      });
  };
  useEffect(() => {
    if (isEditing) {
      setData((pre) => ({ ...pre, about: user?.about }));
    }
  }, [id]);
  return (
    <Box
      style={{
        backgroundImage:
          "linear-gradient(to right, #fff,rgba(2, 94, 115, 0.4))",
      }}
    >
      <Header />
      <SubHeader />
      <Container component="form" maxWidth="xs" onSubmit={handleSubmit}>
        <CssBaseline />
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
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundImage:
              "linear-gradient(to top,rgba(192, 192, 192, 0.5) ,#fff)",
            paddingX: 2,
            boxShadow: "1px 1px 1px 1px #C0C0C0",
            marginTop: "65px",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#025e73" }}>
            <InfoIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            About
          </Typography>
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography fontSize={18} fontWeight={400} padding={1}>
                About
              </Typography>
              <TextField
                autoComplete="given-name"
                name="about"
                required
                value={data.about}
                multiline
                fullWidth
                rows={6}
                id="About"
                label="About"
                autoFocus
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledButton
                type="submit"
                fullWidth
                disabled={disable}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </StyledButton>
            </Grid>
            {disable && (
              <Grid item xs={12}>
                <StyledButton
                  onClick={() => {
                    dispatch(loadUser());
                    navigate("/profile");
                  }}
                  fullWidth
                  disabled={!disable}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  back to Profile
                </StyledButton>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default ClientSignup;
const StyledButton = styled(Button)`
  background-color: #f2a71b;
  color: #fff;
  &:hover {
    background-color: #025e73;
  }
`;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
