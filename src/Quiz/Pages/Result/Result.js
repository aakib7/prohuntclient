import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import "./Result.css";
import ReplayIcon from "@mui/icons-material/Replay";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import axios from "axios";

const Result = ({ name, score }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .put(
        `http://localhost:4000/user/quiz`,
        {
          quizScore: score,
        },
        config
      )
      .then((response) => {
        //console.log(response.data)
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <>
      <Header />
      <div
        className="result"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff,rgba(2, 94, 115, 0.4))",
          height: "90vh",
        }}
      >
        <span className="title">Final Score : {score}</span>
        <StyledButton
          variant="contained"
          color="secondary"
          size="large"
          style={{ alignSelf: "center", marginTop: 20 }}
          onClick={() => {
            navigate("/quiz");
          }}
        >
          Retake Quiz
          <ReplayIcon />
        </StyledButton>{" "}
        <StyledButton
          variant="contained"
          color="secondary"
          size="large"
          style={{ alignSelf: "center", marginTop: 20 }}
          onClick={() => {
            user?.role === "freelancer"
              ? navigate("/panel")
              : navigate("/employer");
          }}
        >
          Back To Dashboard
        </StyledButton>
      </div>
    </>
  );
};

export default Result;
const StyledButton = styled(Button)`
  background-color: #025e73;
  color: #fff;
  &:hover {
    background-color: #f2a71b;
  }
`;
