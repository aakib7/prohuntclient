import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  styled,
  Typography,
  Alert as MuiAlert,
  Snackbar,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import AddchartIcon from "@mui/icons-material/Addchart";
import Header from "../Header/Header";
import SubHeader from "../Header/SubHeader";
import Footer from "../Footer/Footer";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../../store/Actions/User";

const FreelancerDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const isEditing = id ? true : false;
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [catagories, setCatagories] = useState();
  const [subCatagories, setSubCatagories] = useState([]);
  const [error, setError] = useState();
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");
  const [disable, setDisable] = useState(false);
  const [expertise, setExperties] = useState({
    service: "",
    skill: [],
    about: "",
    language: "",
  });

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
  useEffect(() => {
    if (isEditing) {
      setExperties((pre) => ({
        ...pre,
        about: user?.about,
        language: user?.language,
      }));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    expertise.skill = selectedOptions.map((e) => e.name);
    expertise.skill.push(expertise.service);
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    setDisable(true);
    axios
      .put(
        `http://localhost:4000/user/update`,
        {
          language: expertise.language,
          skills: expertise.skill,
          about: expertise.about,
          enterDetails: true,
        },
        config
      )
      .then((response) => {
        if (response.data.success && !isEditing) {
          navigate(`/registration/detail/profilepicture`);
        }
        if (isEditing) {
          setOpen(true);
          setSeverity("success");
          setMessage("Freelancer Profile Edit Success Fully");
          setDisable(false);
        }
      })
      .catch((error) => {
        console.log(error.data);
      });
  };
  const getSubCategories = (service) => {
    catagories?.map((catagory) => {
      if (catagory.name === service) {
        // console.log(catagory.subCategories);
        setSubCatagories(catagory.subCategories);
      }
    });
  };

  const handleChange = (e) => {
    setExperties((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    fetchCategiries();
  }, []);
  useEffect(() => {
    getSubCategories(expertise.service);
    // console.log(subCatagories);
  }, [expertise.service]);
  return (
    <Box
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(2, 94, 115, 0.2),rgba(255, 255, 255, 0.8),rgba(2, 94, 115, 0.3))",
      }}
    >
      <Header />
      <SubHeader />
      <Container component="main" maxWidth="xs">
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
            // marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundImage:
              "linear-gradient(to top,rgba(192, 192, 192, 0.4) ,#fff)",
            boxShadow: "1px 1px 1px 1px #C0C0C0",
            marginTop: "65px",
            paddingX: 2,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#025e73" }}>
            <AddchartIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Expertise
          </Typography>
          <Divider />
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography fontSize={18} fontWeight={400} padding={1}>
                  What is the main service you offer
                </Typography>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Services
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="service"
                    value={expertise.service}
                    label="Service"
                    required
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    {catagories?.map((catagory) => (
                      <MenuItem value={catagory.name}>{catagory.name}</MenuItem>
                    ))}
                    {loading && (
                      <Typography variant="h6">Loaging ...</Typography>
                    )}
                    {!loading && error && (
                      <Typography variant="body2">
                        No Serviese, Try Latter
                      </Typography>
                    )}
                  </Select>
                </FormControl>
              </Grid>

              {subCatagories?.length > 0 && (
                <>
                  <Grid item xs={12}>
                    <Typography fontSize={18} fontWeight={400} padding={1}>
                      What skill do you offer to client
                    </Typography>
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
                          label="filterSelectedOptions"
                          placeholder="Skills"
                        />
                      )}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <Typography fontSize={18} fontWeight={400} padding={1}>
                  Language
                </Typography>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Language
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="language"
                    value={expertise.language}
                    label="language"
                    required
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    <MenuItem value={"Urdu"}>Urdu</MenuItem>
                    <MenuItem value={"English"}>English</MenuItem>
                    <MenuItem value={"German"}>German</MenuItem>
                    <MenuItem value={"Franch"}>Franch</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Typography fontSize={18} fontWeight={400} padding={1}>
                  Professional Overview
                </Typography>

                <TextField
                  id="outlined-multiline-static"
                  label="Highlight your skills and experinece"
                  required
                  name="about"
                  value={expertise.about}
                  multiline
                  fullWidth
                  rows={4}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </Grid>
            </Grid>
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </StyledButton>
            {isEditing && (
              <Grid item xs={12}>
                <StyledButton
                  onClick={() => {
                    dispatch(loadUser());
                    navigate("/profile");
                  }}
                  fullWidth
                  disabled={disable}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  back to Profile
                </StyledButton>
              </Grid>
            )}
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default FreelancerDetail;
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
