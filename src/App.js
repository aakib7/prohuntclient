import React, { useEffect } from "react";
// import Login from "./components/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./store/Actions/User";
import Header from "./components/Header/Header";
import Login from "../src/Auth/Signup";

function App() {
  // const dispatch = useDispatch();
  // // const user = useSelector((state) => state.user);
  // const { loading, user, isAuthenticated, error } = useSelector(
  //   (state) => state.user
  // );
  // useEffect(() => {
  //   dispatch(loadUser());
  // }, []);
  // return <>{isAuthenticated ? <Header /> : <Login />}</>;
}

export default App;
