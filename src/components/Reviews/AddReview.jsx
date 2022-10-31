import Box from "@mui/material/Box";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AccountCircle from "@mui/icons-material/AccountCircle";
import React from "react";
import {
  Button,
  Grid,
  Rating,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";

const AddReview = () => {
  const [value, setValue] = React.useState(0);
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <AccountCircle
          sx={{ fontSize: "80", color: "action.active", mr: 1, my: 0.5 }}
        />
        <TextField
          id="input-with-sx"
          label="Add Review"
          variant="standard"
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
            <StyledButton startIcon={<ReviewsIcon />}>Add Review</StyledButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
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
