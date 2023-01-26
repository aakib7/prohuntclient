import React from "react";
import { Grid } from "@mui/material";
import Footer from "../Footer";
import Header from "../../Header/Header";

const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <Grid sx={{ p: 2 }}>
        <h1>Privacy Policy for ProHunt</h1>
        <p>
          At ProHunt, accessible from prohunt.com, one of our main priorities is
          the privacy of our visitors. This Privacy Policy document contains
          types of information that is collected and recorded by ProHunt and how
          we use it.If you have additional questions or require more information
          about our Privacy Policy, do not hesitate to contact us.This Privacy
          Policy applies only to our online activities and is valid for visitors
          to our website with regards to the information that they shared and/or
          collect in ProHunt. This policy is not applicable to any information
          collected offline or via channels other than this website. Our Privacy
          Policy was created with the help of the Free Privacy Policy Generator.
        </p>
        <h2>Consent</h2>
        <p>
          By using our website, you hereby consent to our Privacy Policy and
          agree to its terms
        </p>
        <h2>Information we collect</h2>
        <p>
          The personal information that you are asked to provide, and the
          reasons why you are asked to provide it, will be made clear to you at
          the point we ask you to provide your personal information. If you
          contact us directly, we may receive additional information about you
          such as your name, email address, phone number, the contents of the
          message and/or attachments you may send us, and any other information
          you may choose to provide. When you register for an Account, we may
          ask for your contact information, including items such as name,
          company name, address, email address, and telephone number.
        </p>
        <h2>Log Files</h2>
        <p>
          ProHunt follows a standard procedure of using log files. These files
          log visitors when they visit websites. All hosting companies do this
          and a part of hosting services' analytics. The information collected
          by log files include internet protocol (IP) addresses, browser type,
          Internet Service Provider (ISP), date and time stamp, referring/exit
          pages, and possibly the number of clicks. These are not linked to any
          information that is personally identifiable. The purpose of the
          information is for analyzing trends, administering the site, tracking
          users' movement on the website, and gathering demographic information.
        </p>
        <h2>Cookies with Web Becons</h2>
        <p>
          Like any other website, ProHunt uses 'cookies'. These cookies are used
          to store information including visitors' preferences, and the pages on
          the website that the visitor accessed or visited. The information is
          used to optimize the users' experience by customizing our web page
          content based on visitors' browser type and/or other information.
        </p>
      </Grid>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
