import Box from "@mui/material/Box";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AccountCircle from "@mui/icons-material/AccountCircle";
import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  Button,
  Grid,
  Rating,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import axios from "axios";

const AddReview = ({ handComment }) => {
  const { gigId } = useParams();

  // toast
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");

  const [value, setValue] = React.useState(0);
  const [comment, setComment] = React.useState("");

  const handleCommentSubmit = () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    axios
      .post(
        `http://localhost:4000/gigs/${gigId}/reviews`,
        { comment, rating: value },
        config
      )
      .then((response) => {
        setSeverity(response.data.success ? "success" : "error");
        setMessage(response.data.message);
        setOpen(true);
        if (response.data.success) {
          handComment();
        }
      })
      .catch((error) => {
        setMessage(error.message);
        setOpen(true);
      });
  };

  const handleReview = async () => {
    if (!comment && !value) {
      setOpen(true);
      setSeverity("error");
      setMessage("Please leave a comment and select starts");
      return;
    } else {
      handleCommentSubmit();
    }
  };
  return (
    <>
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

      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <AccountCircle
            sx={{ fontSize: "80", color: "action.active", mr: 1, my: 0.5 }}
          />
          <TextField
            id="input-with-sx"
            label="Add Review"
            variant="standard"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ width: "100%" }}
          />
        </Box>
        <Box>
          <Box>
            <Typography>Give Stars</Typography>
          </Box>
          <Grid container>
            <Grid item xs={8}>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Grid>
            <Grid
              item
              xs={4}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <StyledButton
                startIcon={<ReviewsIcon />}
                onClick={() => handleReview()}
              >
                Add Review
              </StyledButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default AddReview;

const StyledButton = styled(Button)`
  background-color: #025e73;
  color: #fff;
  &:hover {
    background-color: #f2a71b;
  }
`;
