import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import React, { useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import img1 from "../../assests/images/main-banner1.jpg";
const Profile = () => {
  const [selectedImage, setSelectedImage] = useState();
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AddAPhotoIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          {!selectedImage && (
            <Avatar
              sx={{ width: "200px", height: "200px" }}
              alt="Travis Howard"
              src={img1}
            />
          )}{" "}
          {selectedImage && (
            <Avatar
              sx={{ width: "200px", height: "200px" }}
              alt="Travis Howard"
              src={URL.createObjectURL(selectedImage)}
            />
          )}
          <Grid
            container
            // spacing={2}
            //   direction="row"
            justifyContent="center"
            // alignItems="center"
          >
            <Grid item xs={12} sm={6} mt={5}>
              <Typography fontWeight={500}>Select Picture</Typography>
              <input accept="image/*" type="file" onChange={imageChange} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Profile;

{
  /* <div style={styles.container}>
        <input
          accept="image/*"
          type="file"
          onChange={imageChange}
        />

        {selectedImage && (
          <div style={styles.preview}>
            <img
              src={URL.createObjectURL(selectedImage)}
              style={styles.image}
              alt="Thumb"
            />
            <button onClick={removeSelectedImage} style={styles.delete}>
              Remove This Image
            </button>
          </div>
        )}
      </div> */
}
