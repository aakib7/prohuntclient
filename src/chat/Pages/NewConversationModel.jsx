import React from "react";
import Box from "@mui/material/Box";
import { Button, Avatar, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Search from "./Search";
import img from "../../assests/images/profile.jpeg";
import { useState } from "react";
import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import "./chats.css";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  p: 4,
};

const NewConversationModel = ({ handleClose, open, getConversations }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState({});
  const { user } = useSelector((state) => state.user);

  const createConverstion = (receiverId) => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .post(
        `http://localhost:4000/conversation`,
        {
          senderId: user?._id,
          receiverId: receiverId,
        },
        config
      )
      .then((response) => {
        // setOpenAlert(true);
        // handleClose();
        // setSeverity("success");
        // setMessage("Bid SuccessFully");
        // window.location.reload(true);
        console.log(response.data);

        getConversations();

        handleClose();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    if (search) {
      axios
        .get(`http://localhost:4000/user?search=${search}`)
        .then((response) => {
          setLoading(false);
          console.log(response.data);
          setUsers(response.data.users);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error.response);
        });
    }
    setUsers({});
  }, [search]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create New Conversation
          </Typography>
          <Typography
            id="modal-modal-title"
            sx={{ mt: 1 }}
            variant="body2"
            component="h2"
          >
            Search User
          </Typography>

          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <Search setSearch={setSearch} />
          </Box>
          {loading && <Typography>Loading ...</Typography>}
          {!loading && users.length > 0 && (
            <>
              <Box>
                <Typography sx={{ mt: 1 }}>Search Result</Typography>
              </Box>
              {users?.map((user) => {
                return (
                  <Box
                    sx={{ mt: 1 }}
                    width={"70%"}
                    backgroundColor={"lightgrey"}
                    padding={1}
                    className={"singleUser"}
                    onClick={() => createConverstion(user._id)}
                  >
                    <Stack direction={"row"} spacing={2} alignItems={"center"}>
                      <Avatar
                        alt="Travis Howard"
                        src={`http://localhost:4000/${user?.avatar.url}`}
                        sx={{ width: 28, height: 28 }}
                      />
                      <Typography>
                        {user?.firstName + " " + user?.lastName}
                      </Typography>
                    </Stack>
                  </Box>
                );
              })}
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default NewConversationModel;
