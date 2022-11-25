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
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import SubHeader from "../Header/SubHeader";
import Footer from "../Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../../store/Actions/User";

const ProfilePicture = () => {
  const { user } = useSelector((state) => state.user);
  const [progress, setProgess] = useState(0);
  const [sending, setSending] = useState(false);
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const isEditing = id ? true : false;
  const [disable, setDisable] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);

  const navigate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("users", image);
    if (!image && !isEditing) {
      navigate(`/panel`);
    } else if (!image && isEditing) {
      navigate("/profile");
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
          setDisableSubmit(true);
          if (response.data.success && !isEditing) {
            user?.role === "freelancer"
              ? navigate(`/panel`)
              : navigate(`/employer`);
          }
          if (isEditing) {
            setOpen(true);
            setSeverity("success");
            setMessage("User Profile Picture Edit Success Fully");
            setDisable(false);
            setDisableSubmit(true);
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
                  setDisable(true);
                  setDisableSubmit(false);
                }}
              />
            </Grid>
            {isEditing ? (
              <Grid item xs={12}>
                <StyledButton
                  onClick={() => {
                    if (isEditing) {
                      dispatch(loadUser());
                      navigate("/profile");
                    }
                  }}
                  fullWidth
                  disabled={disable}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  go to profile
                </StyledButton>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <StyledButton
                  onClick={() => {
                    if (!isEditing) {
                      user?.role === "freelancer"
                        ? navigate(`/panel`)
                        : navigate(`/employer`);
                    }
                  }}
                  fullWidth
                  disabled={!disableSubmit}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  skip
                </StyledButton>
              </Grid>
            )}

            <Grid item xs={12}>
              <StyledButton
                fullWidth
                disabled={disableSubmit}
                type={"submit"}
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
