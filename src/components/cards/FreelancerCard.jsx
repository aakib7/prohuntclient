import React from "react";
import { Card, Typography, Rating } from "@mui/material";
import styled from "@emotion/styled";
import BannerImage from "../../assests/images/pak.png";

const FreelancerCard = ({ freelancer }) => {
  return (
    <>
      <Card style={{ width: "286px", height: "430px" }}>
        <div
          style={{
            height: "70%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "#f7f7f7",
          }}
        >
          <div
            style={{
              height: "50%",
              width: "90%",
              paddingTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={`http://localhost:4000/${freelancer.avatar.url}`}
              style={{ height: "100%", borderRadius: "50%", width: "50%" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              paddingTop: "10px",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                color: "#16113A",
              }}
            >
              {freelancer.userName}
            </Typography>
          </div>

          <div
            style={{
              display: "flex",
              paddingTop: "16px",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                color: "#16113A",
                marginLeft: "8px",
              }}
            >
              UK - WordPress Expert | Shopify Specialist | PHP | JS | CSS
            </Typography>
          </div>
          {/* // country wrapper */}
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "70px",
              paddingTop: "27px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bolder",
              }}
            >
              Country:
            </div>
            <div
              style={{
                display: "flex",
                width: "80%",
                alignItems: "center",
                paddingLeft: 2,
                textTransform: "capitalize",
              }}
            >
              {freelancer?.country ? freelancer.country : "Pakistan"}
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            height: "30%",
            boxShadow: "2px 2px #EAEBED",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              height: "80%",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                height: "45%",
                width: "100%",
                // backgroundColor: "green",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "15px",
                  marginLeft: "10px",
                }}
              >
                <Typography component="legend"></Typography>
                <Rating name="read-only" value={freelancer?.rating} readOnly />
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 400,
                    marginLeft: "5px",
                    marginTop: "2px",
                  }}
                >
                  ({freelancer?.numReviews} people's revies)
                </Typography>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                width: "100%",
              }}
            >
              {freelancer?.skills && (
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  {freelancer?.skills[0] && (
                    <StyledTypography1
                      sx={{
                        fontSize: "12px",
                        fontWeight: 300,
                        color: "white",
                        bgcolor: "#025e73",
                        padding: "4px 8px",
                        marginLeft: 5,
                      }}
                    >
                      {freelancer?.skills ? freelancer?.skills[0] : "animation"}
                    </StyledTypography1>
                  )}
                  {freelancer?.skills[1] && (
                    <StyledTypography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 300,
                        color: "white",
                        bgcolor: "#f2a71b",
                        padding: "5px 10px",
                        marginLeft: 5,
                      }}
                    >
                      {freelancer?.skills ? freelancer?.skills[1] : "animation"}
                    </StyledTypography>
                  )}
                </div>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              height: "20%",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "15px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 500,
                  marginRight: "10px",
                }}
              >
                {freelancer?.completedProject} Project Completed
              </Typography>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default FreelancerCard;

const StyledTypography = styled(Typography)`
  background-color: #f2a71b;
  cursor: pointer;
  color: #fff;
  &:hover {
    background-color: #025e73;
  }
`;
const StyledTypography1 = styled(Typography)`
  background-color: #025e73;
  cursor: pointer;
  color: #fff;
  &:hover {
    background-color: #f2a71b;
  }
`;
