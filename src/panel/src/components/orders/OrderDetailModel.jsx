import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  styled,
  Stack,
  Divider,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import axios from "axios";
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  p: 4,
};

export default function OrderDetailModel({ handleClose, open, order }) {
  const [openAlert, setOpenAlert] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");
  const [complain, setComplain] = React.useState("");
  const [openReport, setOpenReport] = React.useState(false);
  const handleOpenReport = () => {
    setOpenReport(true);
  };
  const handleCloseReport = () => {
    setOpenReport(false);
  };
  const handleReports = (id) => {
    if (!complain) {
      setOpenAlert(true);
      setSeverity("error");
      setMessage("Enter Complain");
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
        `http://localhost:4000/report/user`,
        {
          message: complain,
          reportedUser: id,
        },
        config
      )
      .then((response) => {
        setOpenAlert(true);
        setSeverity("success");
        setMessage("Report user Successfully");
      })
      .catch((error) => {
        setOpenAlert(true);
        setSeverity("error");
        setMessage("Try again");
      });
  };

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
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} maxWidth={"800px"}>
          <CloseIcon sx={{ cursor: "pointer" }} onClick={() => handleClose()} />
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            Order Summery
          </Typography>
          <Divider />
          <Box mt={2}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography fontWeight={500}>Client Name:</Typography>
              <Typography style={{ textTransform: "capitalize" }}>
                <Link to={`/profile/${order?.owner?._id}`}>
                  {order?.owner?.firstName + " " + order?.owner?.lastName}
                </Link>
              </Typography>
            </Stack>
          </Box>
          <Box mt={2}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography fontWeight={500}>Delivery Time:</Typography>
              <Typography>{order?.deliverdTime}</Typography>
            </Stack>
          </Box>{" "}
          <Box mt={2}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography fontWeight={500}>Starting Date:</Typography>
              <Typography style={{ textTransform: "capitalize" }}>
                {moment(order?.createdAt).fromNow()}
              </Typography>
            </Stack>
          </Box>
          <Box mt={2}>
            <Stack
              direction={"row"}
              spacing={4}
              justifyContent={"space-between"}
            >
              <Typography fontWeight={500}>Budet:</Typography>
              <Typography>$ {order?.price}</Typography>
            </Stack>
          </Box>
          <Box mt={2}>
            <Stack
              direction={"row"}
              spacing={4}
              // justifyContent={"space-between"}
            >
              <Typography fontWeight={500}>Title:</Typography>
              <Typography>{order?.title}</Typography>
            </Stack>
          </Box>
          <Box mt={2}>
            <Typography fontSize={18} fontWeight={500}>
              Description:
            </Typography>
            <Typography>{order?.description}</Typography>
          </Box>
          <Box style={{ marginTop: 10, fontWeight: 600 }}>
            <Link
              onClick={() => {
                handleOpenReport();
              }}
            >
              Report User
            </Link>
          </Box>
          {openReport && (
            <Box style={{ width: "100%", magrinTop: 15, display: "flex" }}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                placeholder="complain"
                fullWidth
                onChange={(e) => {
                  setComplain(e.target.value);
                }}
              />
              <Button
                variant="contained"
                style={{ marginLeft: 3 }}
                onClick={() => {
                  handleReports(order?.owner?._id);
                }}
              >
                Report
              </Button>
              <Button
                style={{ marginLeft: 3 }}
                variant="contained"
                onClick={() => {
                  handleCloseReport();
                }}
              >
                Cancel
              </Button>
            </Box>
          )}
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
