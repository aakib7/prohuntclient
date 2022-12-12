import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Login from "./components/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./store/Actions/User";
import HeaderPanel from "./panel/HeaderPanel";
import Home from "./components/Home/Home";
import Dashboard from "./panel/src/components/dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import SubCategories from "./components/SubCategories/SubCategories";
import Gig from "./panel/src/components/gig/Gig";
import SingleGig from "./components/Gigs/SingleGig/SingleGig";
import SignupForm from "./components/Registration/SignupForm";
import ListHeader from "./components/SubCategories/ListHeader";
import SingleBlog from "./components/Blogs/SingleBlog/SingleBlog";
import SignUp from "./components/Registration/SignUp";
import FreelancerDetail from "./components/Registration/FreelancerDetail";
import ClientSignup from "./components/Registration/ClientSignup";
import ProfilePicture from "./components/Registration/ProfilePicture";
import EmailVarification from "./EmailVarification/EmailVarification";
import ResetPassword from "./components/Registration/ResetPassword";
import Profile from "./components/Profile/Profile";
import SingleJob from "./components/Jobs/SingleJob/SingleJob";
import EmployerPanelHeader from "./EmployeerPanel/EmployerPanelHeader";
import DeshboardEmployer from "./EmployeerPanel/src/components/dashboard/DeshboardEmployer";
import Job from "./EmployeerPanel/src/components/Job/Job";
import Blog from "./Blogs/Blog";
import NotFound from "./404/NotFound";
import UserProfile from "./components/UserProfile/UserProfile";
import AllGigs from "./components/pages/AllGigs";
import AllJobs from "./components/pages/AllJobs";
import AllBlogs from "./components/pages/AllBlogs";
import AllCategories from "./components/pages/AllCategories";
import ChangePassword from "./ChangePassword/ChangePassword";
import AllFreelancers from "./components/pages/AllFreelancers";
import Orders from "./panel/src/components/orders/Orders";
import Chat from "./Messages/pages/Chat";
import Todo from "./Todo/Todo";
import OrdersEmployer from "./EmployeerPanel/src/components/orders/OrdersEmployer";
import QuizHome from "./Quiz/Pages/Home/QuizHome";
import Quiz from "./Quiz/Pages/Quiz/Quiz";
import Result from "./Quiz/Pages/Result/Result";

function App() {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  // . quiz app
  const [questions, setQuestions] = useState();
  const [name, setName] = useState();
  const [score, setScore] = useState(0);

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );
    setQuestions(data.results);
  };

  ///
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
          <Route exact path="orders" element={<Orders />} />
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
          <Route exact path="orders" element={<OrdersEmployer />} />
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
        <Route path={"/freelancers"} element={<AllFreelancers />} />

        {/* {Chat Routes} */}
        <Route path="/chat" element={isAuthenticated ? <Chat /> : <Login />} />
        {/* {manage project Route} */}
        <Route path="/manageproject/:id" element={<Todo />} />

        {/* // quiz */}
        <Route
          path="/quiz"
          element={
            <QuizHome
              name={name}
              setName={setName}
              fetchQuestions={fetchQuestions}
            />
          }
        />

        <Route
          path="/quiz/questions"
          element={
            <Quiz
              name={name}
              questions={questions}
              score={score}
              setScore={setScore}
              setQuestions={setQuestions}
            />
          }
        />
        <Route path="/result" element={<Result name={name} score={score} />} />
        {/* <Route path="/result" element={<Result name={name} score={score} />} /> */}

        {/* // quiz end */}
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
