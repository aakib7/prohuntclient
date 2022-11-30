import * as React from "react";
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
  { id: "Title", label: "Title", minWidth: 170 },
  { id: "FName", label: "First Name", minWidth: 100 },
  { id: "Progress", label: "Progress", minWidth: 100 },
  {
    id: "Budget",
    label: "Budget",
    minWidth: 100,
    align: "center",
  },

  {
    id: "DeliveryTime",
    label: "DeliveryTime",
    minWidth: 170,
    align: "center",
  },
];

function createData(Title, FName, Progress, Budget, DeliveryTime) {
  return { Title, FName, Progress, Budget, DeliveryTime };
}

const rows = [
  createData("India", "IN", 5, 1324171354, 3287263),
  createData("China", "CN", 5, 1403500365, 9596961),
  createData("Italy", "IT", 5, 60483973, 301340),
  createData("United States", "US", 8, 327167434, 9833520),
  createData("Canada", "CA", 5, 37602103, 9984670),
  createData("Australia", "AU", 59, 25475400, 7692024),
  createData("Germany", "DE", 5, 83019200, 357578),
  createData("Ireland", "IE", 99, 4857000, 70273),
  createData("Mexico", "MX", 5, 126577691, 1972550),
  createData("Japan", "JP", 5, 126317000, 377973),
  createData("France", "FR", 5, 67022000, 640679),
  createData("United Kingdom", "GB", 5, 67545757, 242495),
  createData("Russia", "RU", 5, 146793744, 17098246),
  createData("Nigeria", "NG", 5, 200962417, 923768),
  createData("Brazil", "BR", 5, 210147125, 8515767),
];

export default function PendingOrder() {
  const [showModal, setShowModal] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
 
  function showModalHandler() {
    setShowModal(!showModal);
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const navigate = useNavigate();
  const goRouteId = (id) => {
   navigate(`login/${id}`);
  }  
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440,padding:'30px' }}>
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                    // onClick={()=> goRouteId(row)}
                  <TableRow  hover role="checkbox" tabIndex={-1} key={row.code} >
                    
                    <TableCell
                    
                      key={columns.id}
                      align={columns.align}
                      style={{ minWidth: columns.minWidth }}
                    >
                      {row.Title}
                     
                    </TableCell>
                    <TableCell
                      key={columns.id}
                      align={columns.align}
                      style={{ minWidth: columns.minWidth }}
                    >
                      {row.FName}
                    </TableCell>
                    <TableCell
                      key={columns.id}
                      align={columns.align}
                      style={{ minWidth: columns.minWidth }}
                    >
                      <LinearProgress
                        variant="determinate"
                        value={row.Progress}
                      />
                    </TableCell>
                    <TableCell
                      key={columns.id}
                      align={columns.align}
                      style={{ minWidth: columns.minWidth }}
                    >
                      <Box
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {" "}
                        {row.Budget}
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
                       
                        {row.DeliveryTime}
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
                        onClick={()=> goRouteId(row)}
                      >
                        Manage
                      </StyledButton>

                      <StyledButton
                        fullWidth
                        sx={{ borderRadius: "25px",marginTop:'12px' }}
                        onClick={showModalHandler}
                       
                      >
                        Detail
                      </StyledButton>
                      {showModal ? <OrderDetailModel open={showModal} /> : null}
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

const StyledButton = styled(Button)`
  background-color: #f2a71b;
  color: #fff;
  &:hover {
    background-color: #025e73;
  }
`;
