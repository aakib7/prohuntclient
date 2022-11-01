import React from "react";
import { useSelector } from "react-redux";
const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div>
      <h1>{user.role}</h1>
    </div>
  );
};

export default Dashboard;
