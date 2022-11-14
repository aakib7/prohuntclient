import React, { useEffect } from "react";
import Login from "./components/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./store/Actions/User";
import HeaderPanel from "./panel/HeaderPanel";
// import SubHeader from "./components/Header/SubHeader";
import Home from "./components/Home/Home";
import Analytics from "./panel/src/pages/Analytics";
import Dashboard from "./panel/src/pages/Dashboard";
import { Routes, Route, Link } from "react-router-dom";
import SubCategories from "./components/SubCategories/SubCategories";
import Gig from "./panel/src/components/gig/Gig";
import SingleGigCard from "./components/cards/SingleGigCard";
import GigsList from "./components/Gigs/GigsList";
import SingleGig from "./components/Gigs/SingleGig/SingleGig";
import AddGig from "./panel/src/components/forms/AddGig";
import SignupForm from "./components/Registration/SignupForm";
import UserProfile from "./components/UserProfile/UserProfile";
import SingleJonCard from "./components/cards/SingleJobCard";
import ListHeader from "./components/SubCategories/ListHeader";
import SingleBlog from "./components/Blogs/SingleBlog/SingleBlog";
import SignUp from "./components/Registration/SignUp";
import FreelancerDetail from "./components/Registration/FreelancerDetail";
import ClientSignup from "./components/Registration/ClientSignup";
import ProfilePicture from "./components/Registration/ProfilePicture";

function App() {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);
  const { loading, user, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:categoryName/:categoryId" element={<SubCategories />} />
        <Route
          path="/:categoryName/:categoryId/:subcategory"
          element={<ListHeader />}
        />
        <Route path="/gig/:gigId" element={<SingleGig />} />
        <Route path="/blog/:blogId" element={<SingleBlog />} />
        {/* // Adnim Freelancer and Employer */}
        <Route
          exact
          path="panel"
          element={isAuthenticated ? <HeaderPanel /> : <Login />}
        >
          <Route exact path="" element={<Dashboard />} />
          <Route exact path="gig" element={<Gig />} />
          <Route exact path="analytics" element={<Analytics />} />
        </Route>

        {/* // registration */}
        <Route
          path="/registration"
          element={isAuthenticated ? <Home /> : <SignupForm />}
        />
        <Route path="/registration/:role" element={<SignUp />} />

        <Route
          path="/registration/:role/detail"
          element={
            isAuthenticated ? (
              user?.role === "client" ? (
                <ClientSignup />
              ) : (
                <FreelancerDetail />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/registration/:role/detail/profilepicture"
          element={isAuthenticated ? <ProfilePicture /> : <Login />}
        />
      </Routes>
    </>
  );
}

export default App;
