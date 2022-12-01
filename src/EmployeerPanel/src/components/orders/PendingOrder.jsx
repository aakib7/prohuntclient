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
import { Box, Button, IconButton, LinearProgress, styled } from "@mui/material";
import OrderDetailModel from "./OrderDetailModel";
import { useNavigate } from "react-router-dom";
const columns = [
  { id: "Title", label: "Title", minWidth: 130 },
  { id: "Description", label: "First Name", minWidth: 330 },

  {
    id: "Budget",
    label: "Budget",
    minWidth: 20,
    align: "center",
  },

  {
    id: "DeliveryTime",
    label: "DeliveryTime",
    minWidth: 100,
    align: "center",
  },
];

export default function PendingOrder({ orders }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOrder([]);
    setOpen(false);
  };
  const [order, setOrder] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const navigate = useNavigate();
  const goRouteId = (id) => {
    navigate(`/manageproject/${id}`);
  };
  return (
    <>
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
                      {/* <TableCell
                        key={columns.id}
                        align={columns.align}
                        style={{ minWidth: columns.minWidth }}
                      >
                        <LinearProgress variant="determinate" value={44} />
                      </TableCell> */}
                      <TableCell
                        key={columns.id}
                        align={columns.align}
                        style={{ minWidth: columns.minWidth }}
                      >
                        <Box
                          style={{ display: "flex", justifyContent: "center" }}
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
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          {order.deliverdTime}
                        </Box>
                      </TableCell>
                      <TableCell
                        key={columns.id}
                        align={columns.align}
                        style={{ minWidth: columns.minWidth }}
                      >
                        {/* onClick={()=> goRouteId(row)} */}
                        <StyledButton
                          fullWidth
                          sx={{ borderRadius: "25px" }}
                          onClick={() => goRouteId(order._id)}
                        >
                          Check Progress
                        </StyledButton>

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
      {order && (
        <OrderDetailModel open={open} handleClose={handleClose} order={order} />
      )}
    </>
  );
}

const StyledButton = styled(Button)`
  background-color: #f2a71b;
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
