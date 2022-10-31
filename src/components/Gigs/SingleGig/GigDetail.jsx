import { Box, Grid, Typography, Checkbox, Divider } from "@mui/material";
import React from "react";
import pic from "../../../assests/images/main-banner1.jpg";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Review from "../../Reviews/Review";
import AddReview from "../../Reviews/AddReview";
import RightSideBar from "./RightSideBar";
const GigDetail = () => {
  return (
    <Grid container sx={{ paddingLeft: { xs: 3, md: 5 } }}>
      <Grid item xs={12} bgcolor={"#f7f7f7"}>
        <Typography variant="h4" fontWeight={600} lineHeight={"50px"}>
          Any Customisation / Maintenance / Support to WordPress Website
        </Typography>
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <RightSideBar />
        </Box>
        <img
          style={{
            marginTop: "25px",
            width: "100%",
            height: "auto",
          }}
          src={pic}
          alt="mobile phone"
        />
      </Grid>
      <Grid item xs={12} bgcolor={"white"}>
        <Stack direction="row" spacing={1} alignItems={"center"}>
          <CardActions>
            <IconButton aria-label="add to favorites">
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: "red" }} />}
              />
            </IconButton>
          </CardActions>
          <Box sx={{ border: "1px solid", padding: "2px" }}>
            <Typography>188 Likes</Typography>
          </Box>
        </Stack>
        <hr style={{ height: "2px", paddingRight: "5px" }} />
      </Grid>

      <Grid item xs={12} bgcolor={"white"}>
        <Typography
          padding={4}
          sx={{ padding: { xs: 2, md: 4 }, textAlign: "justify" }}
        >
          What you get with this Offer ** TRUSTED DEVELOPER** Quality Service
          Assured ► TOP CERT 5 PROVIDERS ► 900+ JOBS COMPLETED ► 100% 5 STAR
          REVIEWS ► 15+ YEARS OF EXPERIENCE Do you own a WordPress Website? We
          provide up to 30 minutes of WordPress Website Maintenance, Update,
          Fixing, Revisions and Customisation service. It could be: 1. Updating
          Website Content and Images 2. Layout modification of theme 3.
          Customisation of theme to add or remove any feature or section 4. Add
          page or Blog Post 5. Color customization of your website 6. Plugin
          Installation and configuration 7. WordPress Gallery implementation
          using free plugins 8. Adding contact forms in WordPress 9. Adding
          google analytics code on your HTML/WordPress site 10. Landing page
          creation 11. Adding newsletter signup form from Aweber or Mailchimp
          12. Remove dead links 13. Remove spam/unwanted comments 14. Delete old
          posts / articles 15. Upload or remove images provided by you into
          wordpress media files. 16. Backup your site (you need to purchase the
          backup service) 17. Any other updates and revisions. and much more...
          ** Before buying this hourlie kindly drop a message with complete
          details of updates that you need to be done for your website so that
          we can estimate how many minutes you need to purchase. What the
          Freelancer needs to start the work Specification in details
        </Typography>
      </Grid>
      <Grid item xs={12} bgcolor={"white"}>
        <Typography variant="h5" paddingLeft={5}>
          Reviews and Ratings
        </Typography>
      </Grid>
      <Grid item xs={12} bgcolor={"white"}>
        <AddReview />
      </Grid>
      <Grid item xs={12} bgcolor={"white"}>
        <Divider />
        <Review />
        <Divider />
        <Review />
        <Divider />
        <Review />
        <Divider />
        <Review />
        <Divider />
      </Grid>
    </Grid>
  );
};

export default GigDetail;
