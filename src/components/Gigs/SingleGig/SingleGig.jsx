import { Grid, Snackbar, Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import RightSideBar from "./RightSideBar";
import GigDetail from "./GigDetail";
import Header from "../../Header/Header";
import SubHeader from "../../Header/SubHeader";
import { useParams } from "react-router-dom";
import axios from "axios";
import profilePic from "../../../assests/images/profile.jpeg";

const SingleGig = () => {
  let { gigId } = useParams();
  const [loading, setLoading] = useState(true);
  const [gig, setGig] = useState([]);
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState(false);
  // for toast
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");

  const handleComment = () => {
    setComment((pre) => !pre);
    if (comment) {
      setOpen(true);
      setSeverity("success");
      setMessage("Comment Add Successfully");
    }
  };

  const handleLike = () => {
    console.log("like");
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    axios
      .get(`http://localhost:4000/gigs/gig/${gigId}/like`, config)
      .then((response) => {
        setLike((pre) => !pre);
        setSeverity("success");
        setMessage(response.data.message);
        setOpen(true);
      })
      .catch((error) => {
        setSeverity("error");
        setMessage(error);
        setOpen(true);
      });
  };

  useEffect(() => {
    async function fetchGig() {
      setLoading(true);
      axios
        .get(`http://localhost:4000/gigs/${gigId}`)
        .then((response) => {
          setGig(response.data.gig);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
    fetchGig();
  }, [gigId, like, comment]);
  return (
    <>
      <Header />
      <SubHeader />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      {!loading && gig.length === 0 && <h1>Gig Not Found</h1>}
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: { xs: "column-reverse", md: "row" },
              mt: 6,
            }}
          >
            <Grid item md={8.5}>
              <GigDetail
                title={gig.title}
                numberOfLikes={gig.likes.length}
                gigDescription={gig.description}
                loading={loading}
                reviews={gig.reviews}
                handleLike={handleLike}
                likes={gig.likes}
                handComment={handleComment}
                price={gig.price}
                deliverTime={gig.deliveredTime ? gig.deliveredTime : "2 days"}
                responce={"with in hour"}
                authorName={
                  gig.owner?.firstName ? gig.owner.firstName : "User" + " "
                }
              />
            </Grid>
            <Grid
              item
              md={3.5}
              sx={{
                display: { xs: "none", md: "block" },
                position: { md: "fixed" },
                right: 0,
                top: 171,
              }}
            >
              <RightSideBar
                price={gig.price}
                authorImage={
                  gig?.owner?.avatar.url
                    ? "http://localhost:4000/" + gig?.owner?.avatar.url
                    : profilePic
                }
                deliverTime={gig.deliveredTime ? gig.deliveredTime : "2 days"}
                authorName={`${
                  gig.owner?.firstName ? gig.owner.firstName : "user"
                } ${gig.owner?.lastName ? gig.owner.lastName : "user"}`}
                loading={loading}
                userId={gig?.owner?._id}
              />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
export default SingleGig;
