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

import SignupForm from "./components/Registration/SignupForm";

import SingleJonCard from "./components/cards/SingleJobCard";
import ListHeader from "./components/SubCategories/ListHeader";
import SingleBlog from "./components/Blogs/SingleBlog/SingleBlog";
import SignUp from "./components/Registration/SignUp";
import FreelancerDetail from "./components/Registration/FreelancerDetail";
import ClientSignup from "./components/Registration/ClientSignup";
import ProfilePicture from "./components/Registration/ProfilePicture";
import EmailVarification from "./EmailVarification/EmailVarification";
import ResetPassword from "./components/Registration/ResetPassword";
import Profile from "./components/Profile/Profile";
import GigForm from "./panel/src/components/gig/GigForm";
import SingleJob from "./components/Jobs/SingleJob/SingleJob";
import EmployerPanelHeader from "./EmployeerPanel/EmployerPanelHeader";
import DeshboardEmployer from "./EmployeerPanel/src/pages/Dashboard";
import Job from "./EmployeerPanel/src/components/Job/Job";
import Blog from "./Blogs/Blog";
import NotFound from "./404/NotFound";
import UserProfile from "./components/UserProfile/UserProfile";
import AllGigs from "./components/pages/AllGigs";
import AllJobs from "./components/pages/AllJobs";
import AllBlogs from "./components/pages/AllBlogs";
import AllCategories from "./components/pages/AllCategories";
import ChangePassword from "./ChangePassword/ChangePassword";

function App() {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
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
        <Route path="/job/:jobId" element={<SingleJob />} />

        {/* //  Freelancer  */}
        <Route
          exact
          path="panel"
          element={
            isAuthenticated ? (
              user.role === "freelancer" ? (
                <HeaderPanel />
              ) : (
                <h1>Not Allowed</h1>
              )
            ) : (
              <Login />
            )
          }
        >
          <Route exact path="" element={<Dashboard />} />
          <Route exact path="gig" element={<Gig />} />
          <Route exact path="blogs" element={<Blog />} />
          <Route exact path="changePassword" element={<ChangePassword />} />
        </Route>
        {/* {Employer} */}
        <Route
          exact
          path="employer"
          element={
            isAuthenticated ? (
              user.role === "client" ? (
                <EmployerPanelHeader />
              ) : (
                <h1>Not Allowed</h1>
              )
            ) : (
              <Login />
            )
          }
        >
          <Route exact path="" element={<DeshboardEmployer />} />
          <Route exact path="jobs" element={<Job />} />
          <Route exact path="blogs" element={<Blog />} />
          <Route exact path="changePassword" element={<ChangePassword />} />
        </Route>

        {/* // registration */}
        <Route
          path="/registration"
          element={isAuthenticated ? <Home /> : <SignupForm />}
        />
        <Route
          path="/registration/:role"
          element={isAuthenticated ? <Home /> : <SignUp />}
        />

        <Route
          path="/registration/detail"
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
          path="/registration/detail/:id"
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
          path="/registration/detail/profilepicture"
          element={isAuthenticated ? <ProfilePicture /> : <Login />}
        />
        <Route
          path="/registration/detail/profilepicture/:id"
          element={isAuthenticated ? <ProfilePicture /> : <Login />}
        />
        <Route path="/user/:id/verify/:token" element={<EmailVarification />} />
        <Route path="/password-reset/:id/:token" element={<ResetPassword />} />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Login />}
        />
        <Route path={"/profile/:userId"} element={<UserProfile />} />

        {/* // all pages */}
        <Route path={"/gigs"} element={<AllGigs />} />
        <Route path={"/jobs"} element={<AllJobs />} />
        <Route path={"/blogs"} element={<AllBlogs />} />
        <Route path={"/categories"} element={<AllCategories />} />

        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
