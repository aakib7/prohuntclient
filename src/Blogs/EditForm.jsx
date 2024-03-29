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
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";

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
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const [image, setImage] = React.useState("");
  const [progress, setProgess] = React.useState(0);
  const [sending, setSending] = React.useState(false);
  const [isFilePicked, setIsFilePicked] = useState(false);

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
      errors.Title = "Title is required!";
    } else if (blog.Title.trim().length < 10) {
      errors.Title = "Title must be 10 character";
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
    } else if (blog.description.trim().length < 400) {
      errors.description = "Please enter 400 char or more ";
    } else {
      errors.description = "";
    }
    setValidation(errors);
  };

  const fetchCategiries = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:4000/category`;
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
  const fetchSingleBlog = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:4000/blog/${id}`;
      const { data } = await axios.get(url);
      setLoading(false);

      setBlog((pre) => ({ ...pre, Title: data.post?.title }));
      setBlog((pre) => ({ ...pre, description: data.post?.description }));

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
  const getFormData = () => {
    var form_data = new FormData();
    for (var key in blog) {
      form_data.append(key, blog[key]);
    }
    form_data.append("blog", image);
    return form_data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    blog.subCategories = selectedOptions.map((e) => e.name);
    blog.subCategories.push(blog.category);
    if (
      validation.Title ||
      validation.description ||
      validation.subCategories
    ) {
      setOpenAlert(true);
      setSeverity("error");
      setMessage("Please fill data correctly!!!");
      return;
    }
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
      .put(`http://localhost:4000/blog/update/${id}`, getFormData(), config)
      .then((response) => {
        setOpenAlert(true);
        setSending(false);
        setSeverity("success");
        setMessage("Blog Edit SuccessFully");
        window.location.reload(true);
        if (response.data.success) {
          user.role === "freelancer"
            ? navigate(`/panel/blogs`)
            : navigate(`/employer/blogs`);
        }
      })
      .catch((error) => {
        setOpenAlert(true);
        setSeverity("error");
        setSending(false);
        setError(error.response.data.message);
        setMessage(error.response.data.message);
      });
  };

  useEffect(() => {
    checkValidation();
  }, [blog]);
  useEffect(() => {
    fetchCategiries();
  }, []);
  useEffect(() => {
    if (isEditing) {
      fetchSingleBlog();
    }
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
              variant="h5"
              sx={{
                textAlign: "center",
                fontWeight: "500",
                mb: 1,
              }}
            >
              Edit Blog
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={blog.Title}
                    onChange={handleChange}
                    name="Title"
                    required
                    fullWidth
                    id="Blog"
                    label="Blog Title"
                    autoFocus
                    size="medium"
                  />
                  {blog.Title && (
                    <Typography color={"red"} fontSize={{ xs: 14, md: 16 }}>
                      {validation.Title}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Blog Category"
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
                )}
                <Grid item xs={12} sm={12}>
                  <TextField
                    value={blog.description}
                    onChange={handleChange}
                    multiline
                    rows={8}
                    name="description"
                    required
                    fullWidth
                    id="Gig Description"
                    label="Blog Description"
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
                  blog Picture
                  <input
                    hidden
                    type="file"
                    onChange={(e) => {
                      setProgess(0);
                      const file = e.target.files[0]; // accessing file
                      setImage(file); // storing file
                      setIsFilePicked(true);
                    }}
                  />
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  disabled={sending}
                  sx={{ marginX: { xs: 1, md: 2, sm: 2 }, marginBottom: 3 }}
                >
                  Submit
                </Button>
              </Stack>
            </Box>
            {sending && (
              <Box sx={{ width: "100%" }}>
                <LinearProgress value={progress} />
              </Box>
            )}
          </Container>
        </Box>
      </Modal>
    </div>
  );
}

export default EditForm;
