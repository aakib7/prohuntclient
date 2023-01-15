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
import OrderDetailModel from "./OrderDetailModel";
const columns = [
  { id: "Title", label: "Title", minWidth: 130 },
  { id: "Description", label: "Description", minWidth: 330 },
  { id: "status", label: "Status" },
  {
    id: "Budget",
    label: "Budget",
    minWidth: 20,
    align: "center",
  },
  {
    id: "Team Member",
    label: "Team Member",
    minWidth: 100,
    align: "center",
  },

  {
    id: "action",
    label: "Action",
    align: "center",
  },
];

const Teams = ({ teamdata }) => {
  let navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");

  const [openModel, setOpenModel] = React.useState(false);
  const handleOpenModel = () => setOpenModel(true);
  const handleCloseModel = () => {
    setOpenModel(false);
  };

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
  const goRouteId = (id) => {
    navigate(`/manageproject/${id}`);
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
              {teamdata
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((ad) => {
                  return (
                    // onClick={()=> goRouteId(row)}
                    <>
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={ad._id}
                      >
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
                          {ad.isCompleted ? "complete" : "In Progress"}
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
                            $ {ad.price}
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
                            {ad.orderTo.firstName}
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
                              handleOpenModel();
                            }}
                          >
                            Detail
                          </StyledButton>
                          <StyledButton1
                            fullWidth
                            sx={{ badRadius: "25px", marginTop: "12px" }}
                            onClick={() => {
                              goRouteId(ad._id);
                            }}
                          >
                            Check Progress
                          </StyledButton1>
                        </TableCell>
                      </TableRow>
                      <OrderDetailModel
                        open={openModel}
                        handleClose={handleCloseModel}
                        order={ad}
                      />
                    </>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={teamdata?.length}
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

export default Teams;

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
