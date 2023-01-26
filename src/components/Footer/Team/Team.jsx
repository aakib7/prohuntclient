import React from "react";
import Header from "../../Header/Header";
import Footer from "../Footer";
import "./Team.css";

const Team = () => {
  return (
    <>
      <Header />
      <div class="responsive-container-block outer-container">
        <div class="responsive-container-block inner-container">
          <p class="text-blk section-head-text">Meet Our Founders</p>
          <p class="text-blk section-subhead-text">
            Innovators, Entrepreneurs and Motivators &nbsp;
          </p>
          <div class="responsive-container-block">
            <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 team-card-container">
              <div class="team-card">
                <div class="img-wrapper">
                  <img
                    class="team-img"
                    src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/expert1.png"
                  />
                </div>
                <p class="text-blk name">Aaqib Javed</p>
                <p class="text-blk position">Web Developer</p>
                <div class="social-media-links">
                  <a href="http://www.twitter.com/" target="_blank">
                    <img src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-twitter.svg" />
                  </a>
                  <a href="http://www.facebook.com/" target="_blank">
                    <img src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-fb.svg" />
                  </a>
                  <a href="http://www.instagram.com/" target="_blank">
                    <img src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-insta.svg" />
                  </a>
                  <a href="http://www.gmail.com/" target="_blank">
                    <img src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-mail.svg" />
                  </a>
                </div>
              </div>
            </div>
            <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 team-card-container">
              <div class="team-card">
                <div class="img-wrapper">
                  <img
                    class="team-img"
                    src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/expert2.png"
                  />
                </div>
                <p class="text-blk name">Usama Shaukat</p>
                <p class="text-blk position">Web Developer</p>
                <div class="social-media-links">
                  <a href="http://www.twitter.com/" target="_blank">
                    <img src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-twitter.svg" />
                  </a>
                  <a href="http://www.facebook.com/" target="_blank">
                    <img src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-fb.svg" />
                  </a>
                  <a href="http://www.instagram.com/" target="_blank">
                    <img src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-insta.svg" />
                  </a>
                  <a href="http://www.gmail.com/" target="_blank">
                    <img src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-mail.svg" />
                  </a>
                </div>
              </div>
            </div>
            <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 team-card-container">
              <div class="team-card">
                <div class="img-wrapper">
                  <img
                    class="team-img"
                    src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/expert2.png"
                  />
                </div>
                <p class="text-blk name">Abdul Rehman</p>
                <p class="text-blk position">Web Developer</p>
                <div class="social-media-links">
                  <a href="http://www.twitter.com/" target="_blank">
                    <img src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-twitter.svg" />
                  </a>
                  <a href="http://www.facebook.com/" target="_blank">
                    <img src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-fb.svg" />
                  </a>
                  <a href="http://www.instagram.com/" target="_blank">
                    <img src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-insta.svg" />
                  </a>
                  <a href="http://www.gmail.com/" target="_blank">
                    <img src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-mail.svg" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Team;
