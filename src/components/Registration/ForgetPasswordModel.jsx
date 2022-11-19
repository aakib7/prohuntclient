import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, styled } from "@mui/material";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  padding: "10px",
  transform: "translate(-50%, -50%)",
  width: "400px",
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
};

export default function ForgetPasswordModel({ handleOpen, handleClose, open }) {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `http://localhost:4000/user/forget-password`;
      const { data } = await axios.post(url, { email });
      setLoading(false);
      setMsg(data.message);
      setError("");
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setMsg("");
      }
    }
  };
  useEffect(() => {
    if (msg) {
      const interval = setInterval(() => {
        navigate("/password-reset/:id/:token");
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [msg]);

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" onSubmit={handleSubmit} sx={style}>
          <CloseIcon
            style={{ cursor: "pointer" }}
            onClick={() => handleClose()}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Forget Password
            </Typography>
            <Typography variant="body2" fontWeight={400} fontSize={12}>
              Please Enter Registerd Email
            </Typography>
          </Box>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
            sx={{ mt: 3 }}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Box sx={{ mt: 2, mb: 1 }}>
            <StyledButton fullWidth type={"submit"} disabled={loading}>
              {loading ? "Plaese Wait" : "Submit"}
            </StyledButton>
          </Box>
          {error && (
            <Box
              sx={{
                color: "red",
                display: "flex",
                mt: 1,
                justifyContent: "center",
              }}
            >
              {error}
            </Box>
          )}
          {msg && (
            <Box
              sx={{
                color: "green",
                display: "flex",
                mt: 1,
                justifyContent: "center",
              }}
            >
              {msg}
            </Box>
          )}
          {loading && (
            <Box
              sx={{
                display: "flex",
                mt: 1,
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
}

const StyledButton = styled(Button)`
  background-color: #f2a71b;
  color: #fff;
  &:hover {
    background-color: #025e73;
  }
`;
