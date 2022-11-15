import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../assests/images/success.png";
import { Box, styled, Button, Typography } from "@mui/material";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const EmailVarification = () => {
  const [validUrl, setValidUrl] = useState(true);
  const { id, token } = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:4000/user/${id}/verify/${token}`;
        const { data } = await axios.get(url);
        setValidUrl(true);
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [id, token]);

  return (
    <>
      <Header />
      {validUrl ? (
        <Box
          style={{
            width: "100vw",
            height: "67vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <img src={success} alt="success_img" />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Email verified successfully
          </Typography>
          <Link to="/login">
            <StyledButton>Login</StyledButton>
          </Link>
        </Box>
      ) : (
        <Box
          style={{
            height: "67vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h3">404 Not Found</Typography>
        </Box>
      )}
      <Footer />
    </>
  );
};

export default EmailVarification;

const StyledButton = styled(Button)`
  background-color: #f2a71b;
  color: #fff;
  width: 300px;
  margin-top: 20px;
  &:hover {
    background-color: #025e73;
  }
`;
