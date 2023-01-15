import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { NumberDecrementStepper } from "@chakra-ui/react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  p: 4,
};

export default function AddTodo({
  id,
  tasks,
  fetchTodo,
  setOpenAlert,
  severitySt,
  messageSt,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [valuei, setValuei] = React.useState("");

  const [value, setValue] = React.useState({
    summary: "",
    milestone: "",
    proress: "",
    complete: false,
    date: "",
  });
  const handleChange = (e) => {
    setValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.toString(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
    e.preventDefault();
    if (!value) {
      setOpenAlert();
      messageSt("Enter Somthing");
      severitySt("error");
      return;
    }
    const flag = tasks.filter(
      (task) => task.milstoneNumber === Number(value.milestone)
    );

    if (flag.length > 0) {
      setOpenAlert();
      messageSt("Milstone Number Already exist,Change it");
      severitySt("error");
      return;
    }

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    axios
      .post(
        `http://localhost:4000/order/manage/${id}`,
        {
          summery: value.summary,
          milstoneNumber: Number(value.milestone),
          status: value.complete,
          dueDate: value.date,
          milstoneWeightage: Number(value.proress),
        },

        config
      )
      .then((response) => {
        setOpenAlert();
        messageSt(response.data.message);
        severitySt("success");
        fetchTodo();
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setOpenAlert();
        messageSt(error.response.data.message);
        severitySt("error");
      });
  };
  React.useEffect(() => {
    var abc = valuei.toString();
    setValue((prevState) => ({
      ...prevState,
      date: abc,
    }));
  }, [valuei]);

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" endIcon={<AddIcon />}>
        Add New MilStone
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Milstone
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="MileStone"
              label="MileStone Number"
              name="milestone"
              value={value.milestone}
              autoComplete="MileStone"
              autoFocus
              onChange={(e) => {
                handleChange(e);
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="summary"
              label="Milstone Summary"
              multiline
              name="summary"
              value={value.summary}
              autoFocus
              onChange={(e) => {
                handleChange(e);
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              type="number"
              id="proress"
              label="Milstone Weightage in Persentage i.e (10%)"
              name="proress"
              value={value.proress}
              autoComplete="proress"
              autoFocus
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="mm/dd/yyyy"
                value={valuei}
                required
                onChange={(newValue) => {
                  setValuei(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Add Milstone
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
