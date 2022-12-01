import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled, Stack, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import moment from "moment/moment";
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
  return (
    <div>
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
                <Link to={`/profile/${order?.orderTo?._id}`}>
                  {order?.orderTo?.firstName + " " + order?.orderTo?.lastName}
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
