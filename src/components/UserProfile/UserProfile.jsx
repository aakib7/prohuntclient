import React from "react";
import "./userProfile.css";
import { Link } from "react-router-dom";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import PublishIcon from "@mui/icons-material/Publish";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Grid from "@mui/material/Grid";

const UserProfile = () => {
  return (
    <Grid container className="page_size" spacing={2}>
      <div className="user">
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <Grid item md={4} xs={8} sm={8}>
                <img
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                  className="userShowImg"
                />
              </Grid>
              <Grid item md={6} xs={4} sm={4}>
                <div className="userShowTopTitle">
                  <span className="userShowUsername">Anna Becker</span>
                  {/* <span className="userShowUserTitle">Level 2 Seller</span>
                  <button className="userAddButton">Be A Buyer</button> */}
                </div>
              </Grid>
            </div>
            <div className="userShowBottom">
              <div className="userShowBottomActions">
                <div className="userShowBottomActionWrapper">
                  <PermIdentityIcon className="userShowBottomActionIcon" />
                  <span className="userShowBottomActionTitle">Inbox</span>
                </div>

                <div className="userShowBottomActionWrapper">
                  <PermIdentityIcon className="userShowBottomActionIcon" />
                  <span className="userShowBottomActionTitle">Orders</span>
                </div>

                <div className="userShowBottomActionWrapper">
                  <PermIdentityIcon className="userShowBottomActionIcon" />
                  <span className="userShowBottomActionTitle">Gigs</span>
                </div>

                <div className="userShowBottomActionWrapper">
                  <PermIdentityIcon className="userShowBottomActionIcon" />
                  <span className="userShowBottomActionTitle">Payments</span>
                </div>
              </div>
              <div className="userShowBottom1">
                <span className="userShowTitle">Account Details</span>
                <div className="userShowInfo">
                  <PermIdentityIcon className="userShowIcon" />
                  <span className="userShowInfoTitle">annabeck99</span>
                </div>
                <div className="userShowInfo">
                  <DateRangeIcon className="userShowIcon" />
                  <span className="userShowInfoTitle">10.12.1999</span>
                </div>
              </div>
              <div className="userShowBottom2">
                <span className="userShowTitle">Contact Details</span>
                <div className="userShowInfo">
                  <PhoneAndroidIcon className="userShowIcon" />
                  <span className="userShowInfoTitle">+1 123 456 67</span>
                </div>
                <div className="userShowInfo">
                  <MailOutlineIcon className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    annabeck99@gmail.com
                  </span>
                </div>
                <div className="userShowInfo">
                  <LocationSearchingIcon className="userShowIcon" />
                  <span className="userShowInfoTitle">New York | USA</span>
                </div>
              </div>
              <div className="userShowBottom3">
                <span className="userShowTitle">Revenue Generated</span>
                <div className="userShowInfo">
                  <AttachMoneyIcon className="userShowIcon" />
                  <span className="userShowInfoTitle">26,000</span>
                </div>
              </div>
              <div className="userShowBottom4">
                <span className="userShowTitle">Gigs</span>
                <div className="userShowInfo">
                  <AttachMoneyIcon className="userShowIcon" />
                  <span className="userShowInfoTitle">Live 3</span>
                </div>
                <div className="userShowInfo">
                  <AttachMoneyIcon className="userShowIcon" />
                  <span className="userShowInfoTitle">Offline 5</span>
                </div>
              </div>
              <div className="userShowBottom5">
                <span className="userShowTitle">Orders till date</span>
                <div className="userShowInfo">
                  <AttachMoneyIcon className="userShowIcon" />
                  <span className="userShowInfoTitle">Completed 38</span>
                </div>
                <div className="userShowInfo">
                  <AttachMoneyIcon className="userShowIcon" />
                  <span className="userShowInfoTitle">Pending 4</span>
                </div>
                <div className="userShowInfo">
                  <AttachMoneyIcon className="userShowIcon" />
                  <span className="userShowInfoTitle">In Queue 6</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default UserProfile;
