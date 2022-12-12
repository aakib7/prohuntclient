import React, { useRef, useState } from "react";
import ChatBox from "../components/ChatBox/ChatBox";
import Conversation from "../components/Conversation/Conversation";
import "./Chat.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import axios from "axios";
import Header from "../../components/Header/Header";
import NewConversationModel from "../components/NewConversation/NewConversationModel";

const Chat = () => {
  const socket = useRef();
  const { user } = useSelector((state) => state.user);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  // new conversation
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Get the chat in chat section

  const getChats = async () => {
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const res = await axios.get(
        "http://localhost:4000/conversation/" + user?._id,
        config
      );

      setChats(res.data.conversation);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getChats();
  }, [user._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <>
      <Header />
      <div className="Chat App">
        {/* Left Side */}
        <div className="Left-side-chat">
          {/* <LogoSearch /> */}
          <div className="Chat-container">
            <h2>
              Chats
              <span
                onClick={handleOpen}
                style={{
                  fontSize: "14px",
                  marginLeft: "90px",
                  marginBottom: "25px",
                  textDecoration: "underline",
                  color: "#0000EE",
                  cursor: "pointer",
                }}
              >
                Create New Chat
              </span>
            </h2>

            <div className="Chat-list">
              {chats.map((chat) => (
                <div
                  onClick={() => {
                    setCurrentChat(chat);
                  }}
                >
                  <Conversation
                    data={chat}
                    currentUser={user?._id}
                    online={checkOnlineStatus(chat)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className="Right-side-chat">
          <ChatBox
            chat={currentChat}
            currentUser={user._id}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
          />
        </div>
        <NewConversationModel
          handleClose={handleClose}
          open={open}
          getConversations={getChats}
        />
      </div>
    </>
  );
};

export default Chat;
