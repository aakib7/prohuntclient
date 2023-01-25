import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import axios from "axios";
import { Box, Button, styled } from "@mui/material";
import OrderDetailModel from "../orders/OrderDetailModel";
import PaymentModel from "./PaymentModel";
const columns = [
  { id: "Title", label: "Title", minWidth: 130 },
  { id: "Description", label: "Description", minWidth: 330 },
  {
    id: "Budget",
    label: "Payment",
    minWidth: 20,
    align: "center",
  },
  {
    id: "DeliveryTime",
    label: "Payment Status",
    minWidth: 150,
    align: "center",
  },
  {
    id: "action",
    label: "Actions",
    align: "center",
  },
];

const PaymentEmployer = () => {
  const { user } = useSelector((state) => state.user);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [page, setPage] = React.useState(0);
  const [orders, setOrders] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOrder([]);
    setOpen(false);
  };
  const [order, setOrder] = useState([]);

  const [openCard, setOpenCard] = useState(false);
  const handleOpenCard = () => setOpenCard(true);
  const handleCloseCard = () => setOpenCard(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getCompletedOrders = () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    setLoading(true);
    axios
      .post(
        `http://localhost:4000/order/client/orders`,
        {
          isCompleted: true,
        },
        config
      )
      .then((response) => {
        console.log(response.data.orders);
        setOrders(response.data.orders);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
        setLoading(false);
      });
  };
  React.useEffect(() => {
    getCompletedOrders();
  }, []);

  return (
    <>
      {!loading && orders && (
        <Paper sx={{ width: "100%", overflow: "hidden", mt: 1 }}>
          <TableContainer sx={{ maxHeight: 440, padding: "30px" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {orders
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order) => {
                    return (
                      // onClick={()=> goRouteId(row)}
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={order._id}
                      >
                        <TableCell
                          key={columns.id}
                          align={columns.align}
                          style={{ minWidth: columns.minWidth }}
                        >
                          {order.title.slice(0, 60) + "..."}
                        </TableCell>
                        <TableCell
                          key={columns.id}
                          align={columns.align}
                          style={{ minWidth: columns.minWidth }}
                        >
                          {order.description.slice(0, 80) + "..."}
                        </TableCell>
                        <TableCell
                          key={columns.id}
                          align={columns.align}
                          style={{ minWidth: columns.minWidth }}
                        >
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            $ {order.price}
                          </Box>
                        </TableCell>
                        <TableCell
                          key={columns.id}
                          align={columns.align}
                          style={{ minWidth: columns.minWidth }}
                        >
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            {order.payment
                              ? "Sent"
                              : order.owner === user._id
                              ? "Not Sent Yet"
                              : "Not Received"}
                          </Box>
                        </TableCell>
                        <TableCell
                          key={columns.id}
                          align={columns.align}
                          style={{ minWidth: columns.minWidth }}
                        >
                          {/* onClick={()=> goRouteId(row)} */}
                          <StyledButton1
                            fullWidth
                            sx={{ borderRadius: "25px", marginTop: "12px" }}
                            onClick={() => {
                              setOrder(order);
                              handleOpen();
                            }}
                          >
                            Detail
                          </StyledButton1>
                          {order.owner === user._id && !order.payment && (
                            <StyledButton
                              fullWidth
                              sx={{ borderRadius: "25px" }}
                              onClick={() => {
                                setOrder(order);
                                handleOpenCard();
                              }}
                            >
                              Pay Now
                            </StyledButton>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={orders?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
      {order && (
        <OrderDetailModel
          open={open}
          handleClose={handleClose}
          order={order}
          getCompletedOrders={getCompletedOrders}
        />
      )}
      <PaymentModel
        open={openCard}
        handleClose={handleCloseCard}
        handleOpen={handleOpenCard}
        order={order}
      />
    </>
  );
};

export default PaymentEmployer;
const StyledButton = styled(Button)`
  background-color: #f2a71b;
  margin-top: 5px;
  color: #fff;
  &:hover {
    background-color: #025e73;
  }
`;
const StyledButton1 = styled(Button)`
  background-color: #025e73;
  color: #fff;
  &:hover {
    background-color: #f2a71b;
  }
`;
