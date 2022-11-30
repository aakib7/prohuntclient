import React, { useState } from "react";

import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import PendingOrder from "./PendingOrder";

const Orders = () => {
  const [pendingOrders, setPendingOrder] = useState(true);
  const [completedOrders, setCompletedOrder] = useState(false);
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
      <Box>{PendingOrder && <PendingOrder />}</Box>
    </>
  );
};
export default Orders;
