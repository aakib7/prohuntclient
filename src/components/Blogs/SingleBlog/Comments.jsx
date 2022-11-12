import AccountCircle from "@mui/icons-material/AccountCircle";
import React from "react";
import {
  Button,
  Grid,
  Rating,
  Stack,
  TextField,
  Box,
  Typography,
  styled,
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
const Comments = ({ handleComment }) => {
  const [value, setValue] = React.useState(0);
  const { user } = useSelector((state) => state.user);
  const { blogId } = useParams();

  // toast
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");

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
        `http://localhost:4000/blog/${blogId}/reviews`,
        { comment, rating: value },
        config
      )
      .then((response) => {
        setSeverity(response.data.success ? "success" : "error");
        setMessage(response.data.message);
        setOpen(true);
        // console.log(response.data);
        if (response.data.success) {
          handleComment();
        }
      })
      .catch((error) => {
        setMessage(error);
        console.log("error" + error);
        setOpen(true);
      });
  };
  const handleReview = async () => {
    if (!comment && value <= 0) {
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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AccountCircle
            sx={{ fontSize: "80", color: "action.active", mr: 1, my: 0.5 }}
          />
          <Typography variant="h6" style={{ textTransform: "capitalize" }}>
            {user?.firstName}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <TextField
            fullWidth
            label="Review"
            id="fullWidth"
            multiline
            maxRows={4}
            onChange={(e) => setComment(e.target.value)}
          />
        </Box>
        <Stack direction={"row"} alignItems={"center"}>
          <Typography padding={2}>Rating</Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Stack>

        <Grid item xs={12}>
          <Stack justifyContent={"center"} bgcolor={"blue"}>
            <StyledButton onClick={() => handleReview()}>Post</StyledButton>
          </Stack>
        </Grid>
      </Box>
    </>
  );
};

export default Comments;

const StyledButton = styled(Button)`
  background-color: #025e73;
  color: #fff;
  &:hover {
    background-color: #f2a71b;
  }
`;
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
