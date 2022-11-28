import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, styled, Snackbar, Alert as MuiAlert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  paddingX: 5,
  paddingY: 2,
};

export default function BidModel({ open, handleClose }) {
  const [openAlert, setOpenAlert] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");
  const { jobId } = useParams();

  const [value, setValue] = useState({
    description: "",
    budget: "",
  });
  const [validation, setValidation] = React.useState({
    description: "",
    budget: "",
  });

  const handleChange = (e) => {
    setValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation.budget || validation.description) {
      setOpenAlert(true);
      setSeverity("error");
      setMessage("Please fill data correctly!!");
      return;
    }
    setValue((prevState) => ({
      ...prevState,
    }));

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .post(
        `http://localhost:4000/bid/${jobId}`,
        {
          description: value.description,
          budget: value.budget,
        },
        config
      )
      .then((response) => {
        setOpenAlert(true);
        handleClose();
        setSeverity("success");
        setMessage("Bid SuccessFully");
        window.location.reload(true);
      })
      .catch((error) => {
        setOpenAlert(true);
        handleClose();
        setSeverity("error");
        setMessage(error.response.data.message);
      });
  };

  const checkValidation = () => {
    let errors = { ...validation };
    //Description Validation

    if (value.description.length < 100) {
      errors.description = "Description must be greater then 100 character";
    } else {
      errors.description = "";
    }

    // Budget validation
    var intRegex = /^[1-9]+\d*$/;
    if (!value.budget.match(intRegex)) {
      errors.budget = "Budget value should be a number, greater than 0.";
    } else {
      errors.budget = "";
    }
    setValidation(errors);
  };

  useEffect(() => {
    checkValidation();
  }, [value]);

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
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} maxWidth={"80%"}>
          <CloseIcon
            sx={{ cursor: "pointer" }}
            onClick={() => {
              handleClose();
            }}
          />
          <Typography
            id="modal-modal-title"
            variant="h6"
            sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
          >
            Bid Here{jobId}
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              required
              fullWidth
              id="budget"
              label="budget"
              name="budget"
              value={value.budget}
              autoComplete="budget"
              autoFocus
              onChange={(e) => {
                handleChange(e);
              }}
            />
            {value.budget && (
              <p style={{ color: "red" }}>{validation.budget}</p>
            )}

            <TextField
              margin="normal"
              required
              multiline
              rows={8}
              fullWidth
              id="description"
              label="Your Offer?"
              name="description"
              value={value.description}
              autoFocus
              onChange={(e) => {
                handleChange(e);
              }}
            />
            {value.description && (
              <p style={{ color: "red" }}>{validation.description}</p>
            )}

            <StyledButton type="submit" fullWidth>
              Post Bid
            </StyledButton>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

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
