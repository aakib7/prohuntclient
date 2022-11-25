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
import { useNavigate } from "react-router-dom";
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

export default function GigForm({ open, handleOpen, handleClose }) {
  const [openAlert, setOpenAlert] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [catagories, setCatagories] = useState();
  const [subCatagories, setSubCatagories] = useState([]);
  let navigate = useNavigate();
  const [error, setError] = useState();
  const [gig, setGig] = useState({
    gigTitle: "",
    gigPrice: "",
    Deliver: "",
    category: "",
    subCategories: [],
    description: "",
  });

  const [validation, setValidation] = useState({
    gigTitle: "",
    gigPrice: "",
    Deliver: "",
    subCategories: "",
    category: "",
    description: "",
  });
  const [selectedOptions, setSelectedOptions] = useState([]);

  let errors = { ...validation };

  const checkValidation = () => {
    if (!gig.gigTitle) {
      errors.gigTitle = "Gig Title is required!";
    } else if (gig.gigTitle.trim().length < 40) {
      errors.gigTitle = "Gig Title must be 40 character or more";
    } else {
      errors.gigTitle = "";
    }
    const cond3 = /[0-9]|\./;
    if (!gig.gigPrice.match(cond3)) {
      errors.gigPrice = "Gig Price must be number";
    } else {
      errors.gigPrice = "";
    }

    if (!gig.subCategories) {
      errors.subCategories = "Please select the menu ";
    } else {
      errors.subCategories = "";
    }
    if (!gig.Deliver) {
      errors.Deliver = "Deliver date  is required";
    } else if (gig.Deliver.length < 4) {
      errors.Deliver = "Please enter with days/hours i.e (2 days or 2 hours)";
    } else {
      errors.Deliver = "";
    }
    if (!gig.description) {
      errors.description = "Please enter a brief description";
    } else if (gig.description.trim().length < 100) {
      errors.description = "Gig Title must be 100 character or more";
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

  const handleChange = (e) => {
    setGig((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    gig.subCategories = selectedOptions.map((e) => e.name);
    gig.subCategories.push(gig.category);
    if (
      validation.gigTitle ||
      validation.category ||
      validation.gigPrice ||
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
      .post(
        `http://localhost:4000/gigs/creategig`,
        {
          title: gig.gigTitle,
          description: gig.description,
          deliveredTime: gig.Deliver,
          price: gig.gigPrice,
          category: gig.subCategories,
        },
        config
      )
      .then((response) => {
        setOpenAlert(true);
        setSeverity("success");
        setMessage("Gig Added SuccessFully");
        window.location.reload(true);
        if (response.data.success) {
          navigate(`/panel/gig`);
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
  }, [gig]);
  useEffect(() => {
    fetchCategiries();
  }, []);
  useEffect(() => {
    getSubCategories(gig.category);
  }, [gig.category]);
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
              Add Gig
            </Typography>

            <Box component="form" onSubmit={handleSubmit} autoComplete="off">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={gig.gigTitle}
                    onChange={handleChange}
                    name="gigTitle"
                    required
                    fullWidth
                    id="Gigs"
                    label="Gigs"
                    autoFocus
                    size="medium"
                  />
                  {gig.gigTitle && (
                    <Typography color={"red"} fontSize={{ xs: 14, md: 16 }}>
                      {validation.gigTitle}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={gig.gigPrice}
                    onChange={handleChange}
                    name="gigPrice"
                    required
                    fullWidth
                    id="Gigs Price"
                    label="Gigs Price"
                    autoFocus
                    size="medium"
                  />
                  {gig.gigPrice && (
                    <Typography color={"red"} fontSize={{ xs: 14, md: 16 }}>
                      {validation.gigPrice}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={gig.Deliver}
                    onChange={handleChange}
                    name="Deliver"
                    required
                    id="Gigs Deliver Time"
                    label="Gigs Deliver Time"
                    autoFocus
                    size="medium"
                    fullWidth
                  />
                  {gig.Deliver && (
                    <Typography color={"red"} fontSize={{ xs: 14, md: 16 }}>
                      {validation.Deliver}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Experties Area"
                    value={gig.category}
                    name="category"
                    fullWidth
                    required
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
                    {gig.Subcategory && (
                      <Typography color={"red"} fontSize={{ xs: 14, md: 16 }}>
                        {validation.Subcategory}
                      </Typography>
                    )}
                  </Grid>
                )}
                <Grid item xs={12} sm={12}>
                  <TextField
                    value={gig.description}
                    onChange={handleChange}
                    multiline
                    rows={8}
                    name="description"
                    required
                    fullWidth
                    id="Gig Description"
                    label="Gig Description"
                    autoFocus
                    size="medium"
                  />
                  {gig.description && (
                    <Typography color={"red"} fontSize={{ xs: 14, md: 16 }}>
                      {validation.description}
                    </Typography>
                  )}
                </Grid>
              </Grid>

              <Stack
                justifyContent={"flex-end"}
                direction={"row"}
                sx={{ marginTop: 3 }}
              >
                <Button
                  variant="contained"
                  component="label"
                  sx={{ marginBottom: 3 }}
                >
                  Gig Picture
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
