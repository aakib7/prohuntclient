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
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [error, setError] = useState();
  const [job, setJob] = useState({
    jobTitle: "",
    jobBudget: "",
    jobDelvery: "",
    category: "",
    subCategories: [],
    description: "",
  });
  const [validation, setValidation] = useState({
    jobTitle: "",
    jobBudget: "",
    jobDelvery: "",
    subCategories: "",
    category: "",
    description: "",
  });
  const [selectedOptions, setSelectedOptions] = useState([]);
  let errors = { ...validation };

  const checkValidation = () => {
    if (!job.jobTitle) {
      errors.jobTitle = "jobTitle is required!";
    } else if (job.jobTitle.trim().length < 10) {
      errors.jobTitle = "JobTitle must be 10 character";
    } else {
      errors.jobTitle = "";
    }
    const cond3 = /[0-9]|\./;
    if (!job.jobBudget.match(cond3)) {
      errors.jobBudget = "Jobbudget must be number";
    } else {
      errors.jobBudget = "";
    }

    if (!job.category) {
      errors.category = "Please select the menu ";
    } else {
      errors.category = "";
    }

    if (!job.subCategories) {
      errors.subCategories = "Please select the menu ";
    } else {
      errors.subCategories = "";
    }
    if (!job.jobDelvery) {
      errors.jobDelvery = "Deliver date  is required";
    } else if (job.jobDelvery.length < 4) {
      errors.Deliver = "Please enter with days ";
    } else {
      errors.jobDelvery = "";
    }
    if (!job.description) {
      errors.description = "Please enter a brief description";
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
  const fetchSingleJob = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:4000/jobs/${id}`;
      const { data } = await axios.get(url);
      setLoading(false);
      setJob((pre) => ({ ...pre, jobTitle: data.job.title }));
      setJob((pre) => ({ ...pre, jobBudget: String(data.job.price) }));
      setJob((pre) => ({ ...pre, description: data.job.description }));
      setJob((pre) => ({ ...pre, jobDelvery: data.job.deliveredTime }));
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
    setJob((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    job.subCategories = selectedOptions.map((e) => e.name);
    job.subCategories.push(job.category);
    if (
      validation.jobTitle ||
      validation.jobBudget ||
      validation.jobDelvery ||
      validation.description ||
      validation.Deliver ||
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
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .put(
        `http://localhost:4000/jobs/${id}`,
        {
          title: job.jobTitle,
          description: job.description,
          deliveredTime: job.jobDelvery,
          price: job.jobBudget,
          category: job.subCategories,
        },
        config
      )
      .then((response) => {
        setOpenAlert(true);
        setSeverity("success");
        setMessage("Job Edit SuccessFully");
        window.location.reload(true);
        if (response.data.success) {
          navigate(`/employer/jobs`);
        }
      })
      .catch((error) => {
        setOpenAlert(true);
        setSeverity("error");
        setError(error.response.data.message);
        setMessage(error.response.data.message);
      });
  };

  useEffect(() => {
    checkValidation();
  }, [job]);
  useEffect(() => {
    if (isEditing) {
      fetchSingleJob();
    }
    fetchCategiries();
  }, []);
  useEffect(() => {
    getSubCategories(job.category);
  }, [job.category]);

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
              Edit JOB
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
                    value={job.jobTitle}
                    onChange={handleChange}
                    name="jobTitle"
                    required
                    fullWidth
                    id="Gigs"
                    label="Job Title"
                    autoFocus
                    size="medium"
                  />
                  {job.jobTitle && (
                    <Typography color={"red"} fontSize={{ xs: 14, md: 16 }}>
                      {validation.jobTitle}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={job.jobBudget}
                    onChange={handleChange}
                    name="jobBudget"
                    required
                    fullWidth
                    id="Job Budget"
                    label="Job Budget"
                    autoFocus
                    size="medium"
                  />
                  {job.jobBudget && (
                    <Typography color={"red"} fontSize={{ xs: 14, md: 16 }}>
                      {validation.jobBudget}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={job.jobDelvery}
                    onChange={handleChange}
                    name="jobDelvery"
                    required
                    id="Gigs Deliver Time"
                    label="Job Delivered"
                    size="medium"
                    fullWidth
                  />
                  {job.jobDelvery && (
                    <Typography color={"red"} fontSize={{ xs: 14, md: 16 }}>
                      {validation.jobDelvery}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Job Category"
                    value={job.category}
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
                    {job.subCategories && (
                      <Typography color={"red"} fontSize={{ xs: 14, md: 16 }}>
                        {validation.subCategories}
                      </Typography>
                    )}
                  </Grid>
                )}
                <Grid item xs={12} sm={12}>
                  <TextField
                    value={job.description}
                    onChange={handleChange}
                    multiline
                    rows={8}
                    name="description"
                    required
                    fullWidth
                    id="Gig Description"
                    label="job Description"
                    autoFocus
                    size="medium"
                  />
                  {job.description && (
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
                  job Picture
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
