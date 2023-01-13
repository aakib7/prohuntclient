import React, { useState, useEffect } from "react";
import axios from "axios";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { Box, styled } from "@mui/material";
import PendingOrder from "./PendingOrder";
import { useSelector } from "react-redux";
import CompletedOrder from "./CompletedOrder";

const OrdersEmployer = () => {
  const { user } = useSelector((state) => state.user);
  const [pendingOrders, setPendingOrder] = useState(true);
  const [completedOrders, setCompletedOrder] = useState(false);
  const [pendingOrdersData, setPendingOrdersData] = useState([]);
  const [completedOrdersData, setCompletedOrdersData] = useState([]);
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
        `http://localhost:4000/order/client/orders`,
        {
          isCompleted: false,
        },
        config
      )
      .then((response) => {
        console.log(response.data.orders);
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
        `http://localhost:4000/order/client/orders`,
        {
          isCompleted: true,
        },
        config
      )
      .then((response) => {
        // console.log(response.data);
        setCompletedOrdersData(response.data.orders);
      })
      .catch((error) => {
        console.log(error.response.data);
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
        <Button variant="contained">Generate Report</Button>
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
export default OrdersEmployer;

const StyledButton = styled(Button)`
  background-color: #025e73;
  color: #fff;
  &:hover {
    background-color: #f2a71b;
  }
`;
