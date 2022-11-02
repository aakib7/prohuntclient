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
          path="/:categoryName/:categoryId/:subcategory/gigs"
          element={<GigsList />}
        />
        <Route path="gig/:gigId" element={<SingleGig />} />
        // Adnim Freelancer and Employer
        <Route path="panel" element={<HeaderPanel />}>
          <Route path="" element={<Dashboard />} />
          <Route path="gig" element={<Gig />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
