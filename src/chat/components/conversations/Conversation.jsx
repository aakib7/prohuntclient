import "./conversation.css";
import React, { useState, useEffect } from "react";
import profilePicture from "../../../assests/images/profile.jpeg";
import axios from "axios";
import { useSelector } from "react-redux";

const Conversation = ({ conversation, currentUser }) => {
  const [otherUser, setOtherUser] = useState(null);

  useEffect(() => {
    const otherUserId = conversation?.members.find(
      (m) => m !== currentUser._id
    );
    const getUser = async () => {
      try {
        const res = await axios(
          "http://localhost:4000/user/user/" + otherUserId
        );
        // console.log(res.data);
        setOtherUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={"http://localhost:4000/" + otherUser?.avatar?.url}
        alt="Picture"
      />
      <span className="conversationName">
        {otherUser?.firstName} {otherUser?.lastName}
      </span>
    </div>
  );
};

export default Conversation;
