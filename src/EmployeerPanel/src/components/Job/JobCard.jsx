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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import axios from "axios";
import JobForm from "./JobForm";
import EditForm from "./EditForm";
import BannerImage from "../../../../assests/images/main-banner.jpg";

function JobCard({ title, description, id, image }) {
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
        `http://localhost:4000/jobs/deletejob/${id}`,

        config
      )
      .then((response) => {
        setOpenAlert(true);
        setSeverity("success");
        setMessage("Job Deleted SuccessFully");
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
              to={`/job/${id}`}
              style={{ color: "black", cursor: "pointer" }}
            >
              <Grid item>
                <Typography
                  variant={"body1"}
                  sx={{ ml: 2, fontSize: { md: "20px" }, fontWeight: "500" }}
                >
                  {title}
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  display: {
                    xs: "none",
                    sm: "none",
                    lg: "block",
                    overflowY: "hidden",
                  },
                  ml: 2,
                }}
              >
                <Typography
                  variant="p"
                  sx={{ textAlign: "center", overflowY: "hidden" }}
                >
                  {description}
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
                <Tooltip title="Delete Job">
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
                  Delete Job
                </StyledButtonDelete>
              </Box>
            </Grid>
            <Grid item marginTop={"5px"}>
              <Box
                sx={{
                  display: { xs: "block", lg: "none" },
                  marginLeft: 2,
                  mt: 1,
                }}
              >
                <Tooltip title="Edit Job">
                  <EditIcon
                    onClick={() => {
                      setOpenEdit((pre) => !pre);
                    }}
                  />
                </Tooltip>
              </Box>
              <Box
                sx={{
                  display: { xs: "none", lg: "flex" },
                  marginLeft: { lg: 4 },
                  justifyContent: "flex-end",
                }}
              >
                <StyledButtonEdit
                  startIcon={<EditIcon />}
                  onClick={() => {
                    setOpenEdit((pre) => !pre);
                  }}
                >
                  Edit Job
                </StyledButtonEdit>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <JobForm
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
        <EditForm
          open={openEdit}
          handleOpen={handleOpenEdit}
          handleClose={handleCloseEdit}
          id={id}
        />
      </Grid>
    </>
  );
}

export default JobCard;

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
