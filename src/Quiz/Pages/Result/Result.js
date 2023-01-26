import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import "./Result.css";
import ReplayIcon from "@mui/icons-material/Replay";
import { styled } from "@mui/system";

const Result = ({ name, score }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!name) {
      navigate("/");
    }
  }, [name, navigate]);

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
