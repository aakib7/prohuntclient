import React, { useState, useEffect } from "react";
import axios from "axios";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { Box, styled } from "@mui/material";
import PendingOrder from "./PendingOrder";
import { useSelector } from "react-redux";

const Orders = () => {
  const { user } = useSelector((state) => state.user);
  const [pendingOrders, setPendingOrder] = useState(true);
  const [pendingOrdersData, setPendingOrdersData] = useState([]);
  const [completedOrders, setCompletedOrder] = useState(false);
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
        console.log(response.data);
        setPendingOrdersData(response.data.orders);
      })
      .catch((error) => {
        console.log(error.response.data);
        // setMessage(error.response);
      });
  };
  useEffect(() => {
    if (pendingOrders && user) {
      console.log(user._id);
      getPendingOrders();
    }
  }, [pendingOrders, user]);
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
        {PendingOrder && pendingOrdersData && (
          <PendingOrder orders={pendingOrdersData} />
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
