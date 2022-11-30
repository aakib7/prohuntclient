import "./message.css";
import React from "react";
import moment from "moment/moment";
import profilePicture from "../../../assests/images/profile.jpeg";

export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={profilePicture} alt="" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">
        {moment(message?.createdAt).fromNow()}
      </div>
    </div>
  );
}
