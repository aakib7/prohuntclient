import React, { useState, useEffect } from "react";
import axios from "axios";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { Box, styled, Snackbar, Alert as MuiAlert } from "@mui/material";
import PendingOrder from "./PendingOrder";
import { useSelector } from "react-redux";
import CompletedOrder from "./CompletedOrder";

const Orders = () => {
  const { user } = useSelector((state) => state.user);
  const [pendingOrders, setPendingOrder] = useState(true);
  const [pendingOrdersData, setPendingOrdersData] = useState([]);
  const [completedOrders, setCompletedOrder] = useState(false);
  const [completedOrdersData, setCompletedOrdersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("Success");
  const [message, setMessage] = React.useState("Email is sending...");

  const getPendingOrders = () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .post(
        `http://localhost:4000/order/freelancer`,
        {
          isCompleted: false,
          userId: user._id,
        },
        config
      )
      .then((response) => {
        setPendingOrdersData(response.data.orders);
      })
      .catch((error) => {
        console.log(error.response.data);
        // setMessage(error.response);
      });
  };
  const getCompletedOrders = () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .post(
        `http://localhost:4000/order/freelancer`,
        {
          isCompleted: true,
          userId: user._id,
        },
        config
      )
      .then((response) => {
        setCompletedOrdersData(response.data.orders);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handleReport = () => {
    setOpen(true);
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    setLoading(true);
    setSeverity("success");
    setMessage("Email sending...");
    axios
      .get(`http://localhost:4000/report`, config)
      .then((response) => {
        setLoading(false);
        setOpen(true);
        setMessage("Email is sent to your register mail.");
      })
      .catch((error) => {
        console.log(error.response.data);
        setLoading(false);
        setOpen(true);
        setSeverity("error");
        setMessage("something bad happend");
        // setMessage(error.response);
      });
  };
  useEffect(() => {
    if (pendingOrders && user) {
      getPendingOrders();
    }
    if (completedOrders && user) {
      getCompletedOrders();
    }
  }, [pendingOrders, user, completedOrders]);
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
      <Box display={"flex"} justifyContent={"space-between"}>
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
          <Button
            onClick={() => {
              setPendingOrder(true);
              setCompletedOrder(false);
            }}
          >
            Pending Order
          </Button>
          <Button
            onClick={() => {
              setPendingOrder(false);
              setCompletedOrder(true);
            }}
          >
            Completed Order
          </Button>
        </ButtonGroup>
        <Button
          variant="contained"
          onClick={() => {
            handleReport();
          }}
        >
          Generate Report
        </Button>
      </Box>
      <Box>
        {pendingOrders && pendingOrdersData && (
          <PendingOrder orders={pendingOrdersData} />
        )}
        {completedOrders && pendingOrdersData && (
          <CompletedOrder orders={completedOrdersData} />
        )}
      </Box>
    </>
  );
};
export default Orders;

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
