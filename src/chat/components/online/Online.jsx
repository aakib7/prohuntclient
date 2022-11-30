import "./online.css";
import React from "react";
import profilePicture from "../../../assests/images/profile.jpeg";

const Online = () => {
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src={profilePicture} alt="" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{"user.username"}</span>
    </li>
  );
};

export default Online;
