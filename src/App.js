import { background } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Login from "./components/Login/Login";
// import { useDispatch, useSelector } from "react-redux";
// import { loadUser } from "./store/Actions/User";
import HeaderPanel from "./panel/HeaderPanel";
// import SubHeader from "./components/Header/SubHeader";
import Home from "./components/Home/Home";
import About from "./panel/src/pages/About";
import Analytics from "./panel/src/pages/Analytics";
import Dashboard from "./panel/src/pages/Dashboard";
import { Routes, Route, Link } from "react-router-dom";
import Main from "./panel/src/Main";
import Sidebar from "./panel/src/components/sidebar/SideBar";

function App() {
  // const dispatch = useDispatch();
  // // const user = useSelector((state) => state.user);
  // const { loading, user, isAuthenticated, error } = useSelector(
  //   (state) => state.user
  // );
  // useEffect(() => {
  //   dispatch(loadUser());
  // }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        // Adnim Freelancer and Employer
        <Route path="panel" element={<HeaderPanel />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="about" element={<About />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
