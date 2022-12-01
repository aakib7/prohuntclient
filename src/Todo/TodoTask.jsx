import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
// import BorderColorIcon from "@mui/icons-material/BorderColor";
import moment from "moment/moment";
import { useSelector } from "react-redux";

const TodoTask = ({ task, index, removeTask, changeStatus }) => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <Grid container direction={"row"} mt={3}>
        <Grid item xs={1}>
          <Typography>{task.milstoneNumber}</Typography>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={5}>
          <Typography>{task.summery}</Typography>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={1.3} pl={1}>
          <Typography>{task.milstoneWeightage} %</Typography>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={1.6}>
          <Typography
            style={{
              color: task.status ? "green" : "red",
              fontWeight: 500,
            }}
          >
            {task.status ? "Complete" : "In Complete"}
          </Typography>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={1.4}>
          <Typography>{moment(task.date).format("MMM Do YY")}</Typography>
        </Grid>
        <Divider orientation="vertical" flexItem />
        {user?.role === "freelancer" && (
          <Grid item xs={0.5}>
            <Tooltip title="Complete">
              <IconButton
                aria-label="complete"
                onClick={() => {
                  changeStatus(task.milstoneNumber);
                }}
              >
                <CheckCircleIcon color="success" />
              </IconButton>
            </Tooltip>
          </Grid>
        )}

        {/* <Grid item xs={0.5}>
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={() => removeTask(index)}>
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </Grid> */}
      </Grid>
    </>
  );
};

export default TodoTask;
