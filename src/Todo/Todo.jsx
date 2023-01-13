import React, { useState } from "react";
import TodoTask from "./TodoTask";
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Divider,
  Grid,
  Typography,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import axios from "axios";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AddTodo from "./AddTodo";
import Header from "../components/Header/Header";
import SubHeader from "../components/Header/SubHeader";
import Footer from "../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import FullPageLoading from "../components/others/FullPageLoading";
import { useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
const Todo = () => {
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();

  const setOpenAlert = () => {
    setOpen((prev) => !prev);
  };
  const messageSt = (msg) => {
    setMessage(msg);
  };
  const severitySt = (svrt) => {
    setSeverity(svrt);
  };

  const fetchTodo = () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    setLoading(true);
    axios
      .get(
        `http://localhost:4000/order/${id}`,

        config
      )
      .then((response) => {
        setSuccess(true);
        setLoading(false);
        setTasks(response.data.order.todo);
      })
      .catch((error) => {
        setError(true);
        setOpen(true);
        setSeverity("error");
        setLoading(false);
        setMessage(error.response.data.message);
        console.log(error.response.data.message);
      });
  };
  const completeOrder = () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    axios
      .get(`http://localhost:4000/order/complete/${id}`, config)
      .then((response) => {
        // console.log("Completed")
        navigate("/panel/orders");
      })
      .catch((error) => {
        setError(true);
        setOpen(true);
        setSeverity("error");
        setLoading(false);
        setMessage(error.response.data.message);
      });
  };
  useEffect(() => {
    fetchTodo();
  }, [id]);

  // useEffect(() => {
  //   setStatusChange(statusChange);
  // }, [statusChange]);

  function changeStatus(milstoneNumber) {
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
        `http://localhost:4000/order/changeStatus/${id}`,
        { milstoneNumber: milstoneNumber },

        config
      )
      .then((response) => {
        setSuccess(true);
        setLoading(false);
        setTasks(response.data.order.todo);
      })
      .catch((error) => {
        setError(true);
        setOpen(true);
        setSeverity("error");
        setLoading(false);
        setMessage(error.response.data.message);
        console.log(error.response.data.message);
      });
  }

  const completeTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };
  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };
  const addTask = (order, title, completed, progress, date, status) => {
    const newTasks = [
      ...tasks,
      { order, progress, title, completed, date, status },
    ];
    setTasks(newTasks);
  };

  const handleEditInputChange = (
    order,
    title,
    completed,
    progress,
    date,
    status
  ) => {
    // set the new state value to what's currently in the edit input box
    const newTasks = [
      ...tasks,
      { order, progress, title, completed, date, status },
    ];
    setTasks(newTasks);
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
      <Header />

      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box style={{ position: "relative", display: "flex" }}>
          {user?.role === "freelancer" && (
            <Box style={{ position: "absolute", top: 45 }}>
              <AddTodo
                tasks={tasks}
                id={id}
                fetchTodo={fetchTodo}
                setOpenAlert={setOpenAlert}
                severitySt={severitySt}
                messageSt={messageSt}
              />
            </Box>
          )}
          <Box>
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={() => {
                user?.role == "freelancer"
                  ? navigate("/panel/orders")
                  : navigate("/employer/orders");
              }}
            >
              Back To Orders
            </Button>
            {user?.role === "freelancer" ? (
              <Button
                variant="contained"
                startIcon={<CheckIcon />}
                style={{ marginLeft: 5 }}
                onClick={() => {
                  completeOrder();
                }}
              >
                Order Complete
              </Button>
            ) : (
              ""
            )}
          </Box>
        </Box>
        {loading && <FullPageLoading />}
        {!loading && error && (
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>something went wrong</Typography>
          </Box>
        )}

        {tasks.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <PlaylistAddIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Manage Project
            </Typography>
            <Grid
              container
              direction={"row"}
              sx={{
                border: "1px solid green",
                borderRadius: "5px",
                padding: "0.5em",
                margin: "0.5em",
              }}
            >
              <Grid item xs={1}>
                <Typography>MileStone</Typography>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item xs={5}>
                {/* style={{ textDecoration: task.completed ? "line-through" : "" }} */}
                <Typography>MileStone Summery</Typography>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item xs={1.3}>
                <Typography>Weightage</Typography>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item xs={1.6}>
                <Typography>Status</Typography>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item xs={1.4}>
                <Typography>Due Date</Typography>
              </Grid>
              <Divider orientation="vertical" flexItem />
              {user.role === "freelancer" && (
                <Grid item xs={1.4}>
                  <Typography>Actions</Typography>
                </Grid>
              )}
              {tasks.map((task, index) => (
                <TodoTask
                  task={task}
                  index={index}
                  completeTask={completeTask}
                  removeTask={removeTask}
                  key={index}
                  changeStatus={changeStatus}
                />
              ))}
            </Grid>
          </Box>
        )}
        {!loading && !error && success && tasks.length <= 0 && (
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>Project Not managed Yet</Typography>
          </Box>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Todo;
