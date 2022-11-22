import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
  Snackbar,
  Alert as MuiAlert,
  styled,
} from "@mui/material";

import React, { useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import img1 from "../../assests/images/profile.jpeg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import SubHeader from "../Header/SubHeader";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";

const ProfilePicture = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [progress, setProgess] = useState(0);
  const [sending, setSending] = useState(false);
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("users", image);
    if (!image) {
      navigate(`/panel`);
    } else {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      setSending(true);
      axios
        .put(`http://localhost:4000/user/update`, data, config, {
          onUploadProgress: (ProgressEvent) => {
            let progress =
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
              "%";
            setProgess((pre) => pre + progress);
          },
        })
        .then((response) => {
          setSending(false);
          if (response.data.success) {
            user?.role === "freelancer"
              ? navigate(`/panel`)
              : navigate(`/employer`);
          }
        })
        .catch((error) => {
          setSending(false);
          setOpen(true);
          setSeverity("error");
          setMessage("Somthing Went Wrong!! Try Again");
        });
    }
  };
  return (
    <Box
      style={{
        backgroundImage:
          "linear-gradient(to right, #fff,rgba(2, 94, 115, 0.4))",
      }}
    >
      <Header />
      <SubHeader />
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

      <Container
        component="main"
        maxWidth="xs"
        sx={{
          backgroundImage:
            "linear-gradient(to top,rgba(192, 192, 192, 0.5) ,#fff)",
          boxShadow: "1px 1px 1px 1px #C0C0C0",
          marginTop: "65px",
          boxShadow: "2px 2px 2px 2px #C0C0C0",
        }}
      >
        <CssBaseline />

        <Box
          component={"form"}
          onSubmit={handleChange}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#025e73" }}>
            <AddAPhotoIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          {!image && (
            <Avatar
              sx={{ width: "200px", height: "200px" }}
              alt="Travis Howard"
              src={img1}
            />
          )}
          {image && (
            <Avatar
              sx={{ width: "200px", height: "200px" }}
              alt="Profile"
              src={URL.createObjectURL(image)}
            />
          )}
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={6} mt={5}>
              <Typography fontWeight={500}>Select Picture</Typography>

              <input
                accept="image/*"
                type="file"
                onChange={(e) => {
                  setProgess(0);
                  const file = e.target.files[0]; // accessing file
                  setImage(file); // storing file
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledButton
                type="submit"
                fullWidth
                disabled={image}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Skip
              </StyledButton>
            </Grid>
            <Grid item xs={12}>
              <StyledButton
                type="submit"
                fullWidth
                disabled={!image}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </StyledButton>
            </Grid>
          </Grid>
        </Box>
        {sending && (
          <div
            style={{ width: progress, backgroundColor: "blue", color: "black" }}
          >
            Upload Status : {progress} %
          </div>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default ProfilePicture;

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
