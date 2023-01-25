import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled, Stack, Divider, Snackbar, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  p: 4,
};

export default function OrderDetailModel({
  handleClose,
  open,
  order,
  getCompletedOrders,
}) {
  const [openAlert, setOpenAlert] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");
  const [clientSecret, setClientSecret] = React.useState("");
  const elements = useElements();
  const stripe = useStripe();

  //   const createOrder = () => {
  //     const config = {
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //         "Content-Type": "application/json",
  //       },
  //       withCredentials: true,
  //     };
  //     axios
  //       .post(
  //         `http://localhost:4000/order/payment`,
  //         { amount: order.price, sendTo: order.orderTo._id, orderId: order._id },
  //         config
  //       )
  //       .then((response) => {
  //         setClientSecret(response.data.clientSecret);
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //         return;
  //       });
  //   };

  const confirmPayment = async (e) => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .post(
        `http://localhost:4000/order/payment`,
        { amount: order.price, sendTo: order.orderTo._id, orderId: order._id },
        config
      )
      .then(async (response) => {
        setClientSecret(response.data.clientSecret);
        if (!stripe || !elements) {
          console.log("!stripe || !elements");
          return;
        }
        const cardElements = elements.getElement(CardElement);
        if (stripe && elements) {
          await stripe
            .confirmCardPayment(response.data.clientSecret, {
              payment_method: {
                type: "card",
                card: cardElements,
                billing_details: {
                  name: order.orderTo.firstName + order.orderTo.lastName,
                  email: order.orderTo.email,
                },
              },
            })
            .then((result) => {
              if (result.error.message === "Your card number is incomplete.") {
                openAlert(true);
                setSeverity("Error");
                setMessage("Invalid card details");
              }
              if (
                result.error.message ===
                "As per Indian regulations, only registered Indian businesses (i.e. sole proprietorships, limited liability partnerships and companies, but not individuals) can accept international payments. More info here: https://stripe.com/docs/india-exports"
              ) {
                openAlert(true);
                setSeverity("error");
                setMessage("Something went Worng");
              }
            })
            .catch((err) => console.log(err));
        } else {
          console.log("Invalid card details");
          openAlert(true);
          setSeverity("error");
          setMessage("Invalid card details");
        }
      })
      .catch((error) => {
        console.log(error.message);
        setOpenAlert(true);
        setSeverity("error");
        setMessage("somthing went worng");
        return;
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
            Card Details
          </Typography>
          <Divider />
          <Box
            style={{ marginTop: 15, border: "1px solid black", padding: 10 }}
          >
            <CardElement style={{ fontSize: "50px" }} />
          </Box>
          <Box style={{ display: "flex", width: "100%" }}>
            <StyledButton
              onClick={() => {
                confirmPayment();
                openAlert(true);
                setSeverity("success");
                setMessage("Done Payment");
                handleClose();
                getCompletedOrders();
              }}
            >
              Pay Now
            </StyledButton>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

const StyledButton = styled(Button)`
  background-color: #f2a71b;
  width: 100%;
  margin-top: 35px;
  color: #fff;
  &:hover {
    background-color: #025e73;
  }
`;
