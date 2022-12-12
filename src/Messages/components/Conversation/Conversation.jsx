import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./style.css";
const Conversation = ({ data, currentUser, online }) => {
  // other user
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);
    const getUser = async () => {
      try {
        const res = await axios("http://localhost:4000/user/user/" + userId);
        setUserData(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [currentUser, data]);
  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <img
            src={"http://localhost:4000/" + userData?.avatar.url}
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>
              {userData?.firstName} {userData?.lastName}
            </span>
            <span style={{ color: online ? "#51e200" : "" }}>
              {online ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
