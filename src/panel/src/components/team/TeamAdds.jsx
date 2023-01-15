import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  styled,
  Alert as MuiAlert,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const columns = [
  { id: "Title", label: "Title", minWidth: 130 },
  { id: "Description", label: "Description", minWidth: 330 },
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
  {
    id: "bids",
    label: "Bids",
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
];

const TeamAdds = ({ ads }) => {
  let navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (id) => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .delete(
        `http://localhost:4000/jobs/deletejob/${id}`,

        config
      )
      .then((response) => {
        setOpen(true);
        setSeverity("success");
        setMessage("Deleted Success fully");
      })
      .catch((error) => {
        setOpen(true);
        setSeverity("error");
        setMessage("Bad Request");
      });
  };
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
              {ads
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((ad) => {
                  return (
                    // onClick={()=> goRouteId(row)}
                    <TableRow hover role="checkbox" tabIndex={-1} key={ad._id}>
                      <TableCell
                        key={columns.id}
                        align={columns.align}
                        style={{ minWidth: columns.minWidth }}
                      >
                        {ad.title.slice(0, 60) + "..."}
                      </TableCell>
                      <TableCell
                        key={columns.id}
                        align={columns.align}
                        style={{ minWidth: columns.minWidth }}
                      >
                        {ad.description.slice(0, 80) + "..."}
                      </TableCell>
                      <TableCell
                        key={columns.id}
                        align={columns.align}
                        style={{ minWidth: columns.minWidth }}
                      >
                        <Box
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          $ {ad.price}
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
                          {ad.deliveredTime}
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
                          {ad.bids.length}
                        </Box>
                      </TableCell>
                      <TableCell
                        key={columns.id}
                        align={columns.align}
                        style={{ minWidth: columns.minWidth }}
                      >
                        <StyledButton
                          fullWidth
                          sx={{ badRadius: "25px", marginTop: "12px" }}
                          onClick={() => {
                            navigate(`/job/${ad._id}`);
                          }}
                        >
                          Detail
                        </StyledButton>
                        <StyledButton1
                          fullWidth
                          sx={{ badRadius: "25px", marginTop: "12px" }}
                          onClick={() => {
                            handleDelete(ad._id);
                          }}
                        >
                          Delete
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
          count={ads?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* {ad && (
        <adDetailModel open={open} handleClose={handleClose} ad={ad} />
      )} */}
    </>
  );
};

export default TeamAdds;

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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
