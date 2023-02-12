import {
  Grid,
  Typography,
  Container,
  Box,
  TextField,
  Button,
  Stack,
  Snackbar,
  Modal,
  MenuItem,
  Autocomplete,
  Alert,
} from "@mui/material";

import MuiAlert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import axios from "axios";

const modalWrapper = {
  overflow: "auto",
  maxHeight: "100vh",
  display: "flex",
};

const modalBlock = {
  position: "relative",
  zIndex: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto",
  width: "40%",
  height: "40%",
};

function PortfolioForm({ open, handleOpen, handleClose }) {
  const [openAlert, setOpenAlert] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [image, setImage] = React.useState([]);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [progress, setProgess] = React.useState(0);
  const [sending, setSending] = React.useState(false);

  const [blog, setBlog] = useState({
    introduction: "",
  });

  const [validation, setValidation] = useState({
    Title: "",
    subCategories: "",
    category: "",
    introduction: "",
  });
  const [selectedOptions, setSelectedOptions] = useState([]);
  let errors = { ...validation };
  const checkValidation = () => {
    if (!blog.Title) {
      errors.Title = "Project name  is required!";
    } else if (blog.Title.trim().length < 10) {
      errors.Title = "Project name  must be 10 character";
    } else {
      errors.Title = "";
    }

    if (!blog.category) {
      errors.category = "Please select the menu ";
    } else {
      errors.category = "";
    }

    if (!blog.subCategories) {
      errors.subCategories = "Please select the menu ";
    } else {
      errors.subCategories = "";
    }

    if (!blog.introduction) {
      errors.introduction = "Please enter a brief introduction";
    } else if (blog.introduction.trim().length < 100) {
      errors.introduction = "Please enter 100 char or more ";
    } else {
      errors.introduction = "";
    }
    setValidation(errors);
  };

  const handleChange = (e) => {
    setBlog((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const getFormData = () => {
  //   var form_data = new FormData();
  //   for (var a = 0; a < image.length; a++) {
  //     console.log(image);

  //     form_data.append("portfolio", image);
  //   }
  //   for (var key in blog) {
  //     form_data.append(key, blog[key]);
  //   }
  //   console.log(image.length);

  //   return form_data;
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation.introduction) {
      setOpenAlert(true);
      setSeverity("error");
      setMessage("Please fill data correctly!!!");
      return;
    }
    // if (!isFilePicked) {
    //   setOpenAlert(true);
    //   setSeverity("error");
    //   setMessage("Please select image");
    //   return;
    // }
    let formData = new FormData();
    formData.append("introduction", blog.introduction);
    Array.from(image).forEach((item) => {
      console.log(item);
      formData.append("portfolio", item);
    });
    // formData.append("introduction", blog.introduction);

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
      onUploadProgress: function (progressEvent) {
        var percentCompleted =
          Math.round((progressEvent.loaded * 100) / progressEvent.total) + "%";
        setProgess(percentCompleted);
      },
    };
    setSending(true);
    axios
      .post(`http://localhost:4000/portfolio`, formData, config)
      .then((response) => {
        setOpenAlert(true);
        setSeverity("success");
        setMessage("Portfolio Added SuccessFully");
        setSending(false);
      })
      .catch((error) => {
        setOpenAlert(true);
        setSending(false);
        setSeverity("error");
        setError(error.response.data.message);
        setMessage(error.response.data.message);
      });
  };

  useEffect(() => {
    checkValidation();
  }, [blog]);

  return (
    <div>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={() => setOpenAlert(false)}
      >
        <Alert
          onClose={() => setOpenAlert(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>

      <Modal
        open={open}
        onClose={() => handleClose()}
        sx={modalWrapper}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-introduction"
      >
        <Box sx={modalBlock}>
          <Container
            component={"main"}
            maxWidth={"md"}
            sx={{
              backgroundColor: "white",
              boxShadow: "2px 2px 2px 2px lightgray",
              borderRadius: "3px",
              mt: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: "300",
                mb: 1,
              }}
            >
              Add Portfolio
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    value={blog.introduction}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    name="introduction"
                    required
                    fullWidth
                    id="Gig introduction"
                    label="Project Introducton"
                    autoFocus
                    size="medium"
                  />
                  {blog.introduction && (
                    <Typography color={"red"} fontSize={{ xs: 14, md: 16 }}>
                      {validation.introduction}
                    </Typography>
                  )}
                </Grid>
              </Grid>

              <Stack
                justifyContent={"flex-end"}
                direction={"row"}
                sx={{ marginTop: 3, marginBottom: 3 }}
              >
                <Button
                  variant="contained"
                  component="label"
                  sx={{ marginBottom: 3 }}
                >
                  Portfolio Pictures
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={(e) => {
                      setImage(e.target.files);
                    }}
                  />
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  sx={{ marginX: { xs: 1, md: 2, sm: 2 }, marginBottom: 3 }}
                >
                  Submit
                </Button>
              </Stack>
            </Box>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}

export default PortfolioForm;
