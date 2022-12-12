import {
  Button,
  Divider,
  Grid,
  Typography,
  Avatar,
  Box,
  Stack,
  Snackbar,
  Alert as MuiAlert,
  styled,
} from "@mui/material";
import FullPageLoading from "../../others/FullPageLoading";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import pic from "../../../assests/images/main-banner.jpg";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import SubHeader from "../../Header/SubHeader";
import Bid from "./Bid";
import axios from "axios";
import BidModel from "./BidModel";

const SingleJob = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [job, setJob] = useState([]);

  const { jobId } = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  // Alert
  const [openAlert, setOpenAlert] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState(
    "You Can't Bid Here Only freelancer can Bid."
  );

  const fetchJob = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:4000/jobs/${jobId}`;
      const { data } = await axios.get(url);
      setLoading(false);
      setJob(data.job);
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        // setError(error.response.data.message);
        navigate("/404");
        setError(true);
      }
    }
  };
  useEffect(() => {
    fetchJob();
  }, [jobId]);
  return (
    <>
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
      <Header />
      <SubHeader />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundImage:
            "linear-gradient(to top, #fff,rgba(2, 94, 115, 0.2))",
        }}
      >
        {loading && <FullPageLoading />}
        {!loading && error && <Typography>Job Not Found</Typography>}

        {!loading && !error && (
          <Grid
            container
            maxWidth={"80%"}
            sx={{
              backgroundImage:
                "linear-gradient(to top,rgba(192, 192, 192, 0.3) ,#fff)",
              boxShadow: "1px 1px 1px 1px #C0C0C0",
              marginTop: "65px",
            }}
          >
            <Grid item xs={12}>
              <Typography
                sx={{ padding: { xs: 2, md: 2 }, textAlign: "justify" }}
                fontSize={24}
                fontWeight={500}
                variant={"h6"}
              >
                {job?.title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <img
                style={{
                  width: "100%",
                  height: "550px",
                  objectFit: "fill",
                }}
                src={`http://localhost:4000/${job?.image?.url}`}
                alt="Job Banner"
              />
            </Grid>
            <Grid item xs={12} mt={1}>
              <Divider />
              <Link to={`/profile/${job?.owner?._id}`}>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={2}
                  marginY={1}
                  paddingX={3}
                >
                  <Avatar
                    alt={job?.owner?.firstName}
                    src={"http://localhost:4000/" + job?.owner?.avatar?.url}
                  />
                  <Typography
                    fontSize={18}
                    fontWeight={400}
                    mt={2}
                    style={{
                      color: "black",
                      textTransform: "capitalize",
                      fontWeight: "400",
                    }}
                  >
                    {job?.owner?.firstName + " " + job?.owner?.lastName}
                  </Typography>
                </Stack>
              </Link>

              <Divider />
            </Grid>
            <Grid container>
              <Grid item xs={12} style={{ paddingTop: 10 }}>
                <Typography
                  sx={{ paddingX: { xs: 2, md: 4 }, textAlign: "justify" }}
                  fontSize={22}
                  fontWeight={500}
                  variant={"h6"}
                >
                  Job Description and Detail
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  sx={{ padding: { xs: 2, md: 2 }, textAlign: "justify" }}
                  variant="body1"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {job?.description}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} md={4}>
                <Stack
                  direction={"row"}
                  spacing={2}
                  sx={{
                    paddingX: { xs: 2, md: 4 },
                    textAlign: "justify",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    fontSize={23}
                    fontWeight={500}
                    variant="h6"
                    sx={{ textAlign: "justify" }}
                  >
                    Job Budget: ${job?.price}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}></Grid>
              <Grid
                item
                xs={12}
                md={4}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <StyledButton
                  variant="contained"
                  color="success"
                  style={{ width: "50%", marginRight: 34 }}
                  onClick={() => {
                    isAuthenticated
                      ? user.role === "freelancer"
                        ? setOpen((prev) => !prev)
                        : setOpenAlert((prev) => !prev)
                      : navigate("/login");
                  }}
                >
                  Bid Now
                </StyledButton>
              </Grid>
            </Grid>
            <Divider />
            <Box
              fontSize={23}
              fontWeight={500}
              variant="h6"
              sx={{ textAlign: "justify" }}
            >
              {job?.bids?.length > 0 && (
                <Typography
                  variant="h6"
                  sx={{
                    paddingX: { xs: 2, md: 4 },
                    mt: 5,
                    textAlign: "justify",
                  }}
                >
                  Freelancer's Bid
                </Typography>
              )}
            </Box>
            {job?.bids?.map((bid) => {
              return <Bid bid={bid} ownerId={job?.owner?._id} job={job} />;
            })}
          </Grid>
        )}
      </Box>
      <BidModel open={open} handleClose={handleClose} />
      <Footer />
    </>
  );
};

export default SingleJob;
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
