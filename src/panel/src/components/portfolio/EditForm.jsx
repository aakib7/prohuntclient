import React from "react";
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

import { useEffect, useState } from "react";
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
};

function EditForm({ open, handleOpen, handleClose, id }) {
  const [openAlert, setOpenAlert] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [catagories, setCatagories] = useState();
  const [subCatagories, setSubCatagories] = useState([]);
  const isEditing = id ? true : false;
  console.log(id);
  const [error, setError] = useState();
  const [blog, setBlog] = useState({
    Title: "",
    category: "",
    subCategories: [],
    description: "",
  });

  const [validation, setValidation] = useState({
    Title: "",
    subCategories: "",
    category: "",
    description: "",
  });
  const [selectedOptions, setSelectedOptions] = useState([]);
  let errors = { ...validation };
  const checkValidation = () => {
    if (!blog.Title) {
      errors.Title = "Project name  is required!";
    } else if (blog.Title.trim().length < 10) {
      errors.Title = "project name  must be 10 character";
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

    if (!blog.description) {
      errors.description = "Please enter a brief description";
    } else if (blog.description.trim().length < 200) {
      errors.description = "Please enter 400 char or more ";
    } else {
      errors.description = "";
    }
    setValidation(errors);
  };

  const fetchCategiries = async () => {
    try {
      setLoading(true);
      const url = `http://192.168.10.83:4000/category`;
      const { data } = await axios.get(url);
      setLoading(false);
      setCatagories(data.categories);
      setError("");
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const getSubCategories = (service) => {
    catagories?.map((catagory) => {
      if (catagory.name === service) {
        setSubCatagories(catagory.subCategories);
      }
    });
  };
  const fetchSingleJob = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:4000/gigs/${id}`;
      const { data } = await axios.get(url);
      setLoading(false);
      setBlog((pre) => ({ ...pre, Title: data.blog.title }));
      setBlog((pre) => ({ ...pre, description: data.blog.description }));

      setError("");
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleChange = (e) => {
    setBlog((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    blog.subCategories = selectedOptions.map((e) => e.name);
    blog.subCategories.push(blog.category);
    if (
      validation.Title ||
      validation.description ||
      validation.Deliver ||
      validation.subCategories
    ) {
      setOpenAlert(true);
      setSeverity("error");
      setMessage("Please fill data correctly!!!");
      return;
    }
  };

  useEffect(() => {
    checkValidation();
  }, [blog]);
  useEffect(() => {
    fetchCategiries();
  }, []);
  useEffect(() => {
    getSubCategories(blog.category);
  }, [blog.category]);

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
        aria-describedby="modal-modal-description"
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
                fontWeight: "500",
                mb: 1,
              }}
            >
              Edit Portfolio
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
                    value={blog.Title}
                    onChange={handleChange}
                    name="Title"
                    required
                    fullWidth
                    id="Gigs"
                    label="Project Title"
                    autoFocus
                    size="medium"
                  />
                  {blog.Title && (
                    <Typography color={"red"} fontSize={{ xs: 14, md: 16 }}>
                      {validation.Title}
                    </Typography>
                  )}
                </Grid>

                {/* <Grid item xs={12} sm={6}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Job Category"
                    value={blog.category}
                    name="category"
                    fullWidth
                    onChange={handleChange}
                  >
                    {catagories?.map((option) => (
                      <MenuItem
                        key={option.id}
                        value={option.name}
                        id={option.id}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                {subCatagories.length > 0 && (
                  <Grid item xs={12} sm={12}>
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={subCatagories}
                      getOptionLabel={(option) => option.name}
                      filterSelectedOptions
                      onChange={(e, value) => setSelectedOptions(value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Sub Categories"
                          placeholder="Sub Categories"
                        />
                      )}
                    />
                    {blog.subCategories && (
                      <Typography color={"red"} fontSize={{ xs: 14, md: 16 }}>
                        {validation.subCategories}
                      </Typography>
                    )}
                  </Grid>
                )} */}
                <Grid item xs={12} sm={12}>
                  <TextField
                    value={blog.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    name="description"
                    required
                    fullWidth
                    id="Gig Description"
                    label="Project Description"
                    autoFocus
                    size="medium"
                  />
                  {blog.description && (
                    <Typography color={"red"} fontSize={{ xs: 14, md: 16 }}>
                      {validation.description}
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
                  <input hidden accept="image/*" multiple type="file" />
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

export default EditForm;
