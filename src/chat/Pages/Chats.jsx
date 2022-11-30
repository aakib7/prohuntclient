import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import "./chats.css";
import { Button, Divider, TextField, Typography } from "@mui/material";
import Conversation from "../components/conversations/Conversation";
import Message from "../components/message/Message";
import SendIcon from "@mui/icons-material/Send";
import Online from "../components/online/Online";
import { useSelector } from "react-redux";
import FullPageLoading from "../../components/others/FullPageLoading";
import axios from "axios";
import { io } from "socket.io-client";

const Chats = () => {
  const { user } = useSelector((state) => state.user);
  const scrollRef = useRef();
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const socket = useRef();

  // console.log(socket.current);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user?._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    // if we are in different conversation we did not see the conversation of ther user only currrent chat user
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversations = async () => {
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

        setConversations(res.data.conversation);
        setLoading(false);
        setError(false);
      } catch (err) {
        setLoading(false);
        setError(true);
        console.log(err);
      }
    };
    getConversations();
  }, [user?._id]);
  const getMessages = async () => {
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const res = await axios.get(
        "http://localhost:4000/message/" + currentChat?._id,
        config
      );
      setMessages(res.data.messages);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const res = await axios.post("/message", message, config);
      // getMessages();
      setMessages((prev) => [...prev, res.data.message]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      {loading && <FullPageLoading />}
      {!loading && error && <Typography>Error has occured</Typography>}
      {!loading && !error && (
        <div className="messenger">
          <div className="chatMenu">
            <div className="chatMenuWrapper">
              <TextField
                id="outlined-basic"
                label="Search for friends"
                variant="outlined"
                className="chatMenuInput"
              />
              {conversations?.map((conversation) => {
                return (
                  <div onClick={() => setCurrentChat(conversation)}>
                    <Conversation
                      conversation={conversation}
                      currentUser={user}
                    />
                    <Divider />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="chatBox">
            <div className="chatBoxWrapper">
              {currentChat ? (
                <>
                  <div className="chatBoxTop">
                    {messages?.map((message) => (
                      <div ref={scrollRef}>
                        <Message
                          message={message}
                          own={message.sender === user._id}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="chatBoxBottom">
                    <textarea
                      className="chatMessageInput"
                      placeholder="write something..."
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    ></textarea>
                    <button className="chatSubmitButton" onClick={handleSubmit}>
                      Send
                    </button>
                  </div>
                </>
              ) : (
                <span className="noConversationText">
                  Open a conversation to start a chat.
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chats;
