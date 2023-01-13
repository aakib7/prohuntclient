import React from "react";
import { Box, Alert as MuiAlert, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  paddingLeft: 3,
  paddingRight: 4,
  paddingTop: 2,
  paddingBottom: 4,
};

const BuyGig = ({ open, handleClose, name, gig }) => {
  const [openAlert, setOpenAlert] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const navigate = useNavigate();
  const handleHire = (e) => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .post(
        `http://localhost:4000/order`,
        {
          id: gig.owner._id,
          title: gig.title,
          description: gig.description,
          price: gig.price,
          deliverdTime: gig.deliveredTime,
          orderType: "Gig",
        },
        config
      )
      .then((response) => {
        setOpenAlert(true);
        handleClose();
        setSeverity("success");
        setMessage("Hiring SuccessFully");
        // window.location.reload(true);
        setSuccess(true);
      })
      .catch((error) => {
        setOpenAlert(true);
        handleClose();
        setSeverity("error");
        setMessage(error.response.data.message);
      });
  };
  React.useEffect(() => {
    if (success) {
      const interval = setInterval(() => {
        navigate("/employer");
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [success]);
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
        <Box sx={style}>
          <CloseIcon
            style={{ cursor: "pointer" }}
            onClick={() => handleClose()}
          />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Hiring Confirmation
          </Typography>
          <Typography id="modal-modal-description" style={{}}>
            Are you sure you want to hire <span>{name}</span>?
          </Typography>
          <Box display={"flex"} justifyContent={"flex-end"} mt={3}>
            <Button variant="outlined" onClick={() => handleClose()}>
              Cancel
            </Button>

            <Button
              variant="contained"
              style={{ marginLeft: 24 }}
              onClick={(e) => handleHire()}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default BuyGig;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
