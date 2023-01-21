import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  Stack,
} from "@mui/material";
import React from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import Header from "../../../../components/Header/Header";
import Footer from "../../../../components/Footer/Footer";
const PortfolioPage = () => {
  const { id } = useParams();

  const [selectImage, setSelectImge] = React.useState();
  const [portfolio, setPortfolio] = React.useState([]);
  const fetchPortfolio = () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    axios
      .get(`http://localhost:4000/portfolio/${id}`, config)
      .then((response) => {
        setPortfolio(response.data.portfolio);
        console.log(response.data.portfolio.pictures[0]);
        setSelectImge(response.data.portfolio.pictures[0]);
      })
      .catch((error) => {});
  };
  React.useEffect(() => {
    fetchPortfolio();
  }, []);
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(to right, #fff,rgba(2, 94, 115, 0.4))",
      }}
    >
      <Header />
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid container maxWidth={"80%"}>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              marginTop: "20px",
            }}
          >
            <Typography fontSize={23} fontWeight={500}>
              {portfolio?.introduction}
            </Typography>
          </Grid>
          <Divider />
          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Stack spacing={2} direction={"row"}>
              <Grid
                item
                xs={9}
                style={{
                  width: "500px",
                  height: "450px",
                  objectFit: "cover",
                  overflow: "hidden",
                }}
              >
                <img
                  src={`http://localhost:4000/${selectImage}`}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Grid>
              <Grid
                item
                xs={3}
                style={{
                  height: "500px",
                  objectFit: "cover",
                  overflow: "hidden",
                }}
              >
                <Stack spacing={2}>
                  {portfolio?.pictures?.map((port, index) => {
                    console.log(port);
                    return (
                      <Grid item xs={12}>
                        <img
                          src={`http://localhost:4000/${port}`}
                          style={{
                            width: "100%",
                            height: "auto",
                            cursor: "pointer",
                            objectFit: "cover",
                            overflow: "hidden",
                          }}
                          onClick={() => setSelectImge(port)}
                        />
                      </Grid>
                    );
                  })}
                </Stack>
              </Grid>
            </Stack>
          </Container>
        </Grid>
      </Container>
      {/* <Container style={{ display: "flex", justifyContent: "center" }}>
        <Grid container maxWidth={"80%"}>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              marginTop: "20px",
            }}
          >
            <Typography fontSize={25} fontWeight={700}>
              {portfolio?.introduction}
            </Typography>
          </Grid>
          <Divider />
          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Stack spacing={2} direction={"row"}>
              <Grid
                item
                xs={9}
                border={"2px solid black"}
                style={{
                  width: "500px",
                  height: "450px",
                  objectFit: "cover",
                  overflow: "hidden",
                }}
              >
                <img
                  src={`http://localhost:4000/${selectImage}`}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </Grid>
              <Grid item xs={3} style={{ height: "500px" }}>
                <Stack spacing={2}>
                  {portfolio?.pictures?.map((port, index) => {
                    console.log(port);
                    return (
                      <Grid item xs={12} border={"2px solid black"}>
                        <img
                          src={`http://localhost:4000/${port}`}
                          style={{ width: "100%", cursor: "pointer" }}
                          onClick={() => setSelectImge(port)}
                        />
                      </Grid>
                    );
                  })}
                </Stack>
              </Grid>
            </Stack>
          </Container>
        </Grid>
      </Container> */}

      <Footer />
    </div>
  );
};

export default PortfolioPage;
