import React from "react";
import {
  Box,
  Grid,
  Button,
  styled,
  Typography,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import EditForm from "./EditForm";
import PortfolioForm from "./PortfolioForm";
const PortfolioCard = ({ title, id, image }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(false);
  const handleClose = () => setOpen(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const [delete1, setDelete1] = React.useState(false);
  const handleDelete = () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .delete(
        `http://localhost:4000/portfolio/${id}`,

        config
      )
      .then((response) => {
        setOpenAlert(true);
        setSeverity("success");
        setMessage("Portfolio Deleted SuccessFully");
        window.location.reload(true);
      })
      .catch((error) => {
        setOpenAlert(true);
        setSeverity("error");
        setMessage(error.response.data.message);
      });
  };
  return (
    <>
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

      <Grid
        container
        sx={{ backgroundColor: "#a5a692" }}
        style={{
          width: "100%",
          height: "80px",
          marginTop: "4px",
          overflow: "hidden",
          lineHeight: "1.43",
        }}
      >
        <Grid
          item
          style={{
            width: "20%",
            height: "100%",
          }}
        >
          <img style={{ height: "100%", width: "100%" }} src={image} />
        </Grid>
        <Grid
          item
          style={{
            width: "60%",
            height: "100%",
          }}
        >
          <Grid container direction={"column"}>
            <Link
              to={`/portfolio/${id}`}
              style={{ color: "black", cursor: "pointer" }}
            >
              <Grid item>
                <Typography
                  variant={"body1"}
                  sx={{ ml: 2, fontSize: { md: "20px" }, fontWeight: "400" }}
                >
                  {title}
                </Typography>
              </Grid>
            </Link>
          </Grid>
        </Grid>
        <Grid
          item
          style={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid container direction={"column"}>
            <Grid item>
              <Box
                sx={{
                  display: { xs: "block", lg: "none" },
                  marginLeft: 2,
                  mt: 1,
                }}
              >
                <Tooltip title="Delete Blog">
                  <DeleteIcon
                    onClick={() => {
                      handleDelete();
                    }}
                  />
                </Tooltip>
              </Box>
              <Box
                sx={{
                  display: { xs: "none", lg: "flex" },
                  justifyContent: "flex-end",
                  marginLeft: { lg: 4 },
                }}
              >
                <StyledButtonDelete
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  Delete
                </StyledButtonDelete>
              </Box>
            </Grid>
            <Grid item marginTop={"5px"}></Grid>
          </Grid>
        </Grid>
        <PortfolioForm
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      </Grid>
    </>
  );
};

export default PortfolioCard;

const StyledButtonDelete = styled(Button)`
  background-color: #f2a71b;
  color: #fff;
  width: 130px;
  margin-left: 48px;
  &:hover {
    background-color: red;
  }
`;
const StyledButtonEdit = styled(Button)`
  background-color: #025e73;
  color: #fff;
  width: 130px;
  margin-left: 48px;
  &:hover {
    background-color: purple;
  }
`;

<Tooltip title="Delete"></Tooltip>;
