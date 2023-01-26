import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import Question from "../../components/Question/Question";
import "./Quiz.css";
import { useSelector } from "react-redux";

const Quiz = ({ name, questions, score, setScore, setQuestions }) => {
  const [options, setOptions] = useState();
  const [currQues, setCurrQues] = useState(0);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    setOptions(
      questions &&
        handleShuffle([
          questions[currQues]?.correct_answer,
          ...questions[currQues]?.incorrect_answers,
        ])
    );
  }, [currQues, questions]);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  return (
    <>
      <Header />
      <Box
        className="quiz"
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundImage:
            "linear-gradient(to right, #fff,rgba(2, 94, 115, 0.4))",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <Typography
          className="subtitle"
          style={{
            fontSize: "25px",
            marginTop: "20px",
            padding: " 5px 10px",
          }}
        >
          Welcome, {user?.userName ? user?.userName : name}
        </Typography>

        {questions ? (
          <>
            <Box
              className="quizInfo"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "spacebetween",
                textTransform: "uppercase",
                marginX: "10px",
              }}
            >
              <span style={{ marginLeft: "40px", fontWeight: 600 }}>
                {questions[currQues].category}
              </span>
              <span style={{ marginRight: "60px", fontWeight: 600 }}>
                Score : {score}
              </span>
            </Box>
            <Question
              currQues={currQues}
              setCurrQues={setCurrQues}
              questions={questions}
              options={options}
              correct={questions[currQues]?.correct_answer}
              score={score}
              setScore={setScore}
              setQuestions={setQuestions}
            />
          </>
        ) : (
          <CircularProgress
            style={{ margin: 100 }}
            color="inherit"
            size={150}
            thickness={1}
          />
        )}
      </Box>
      <Footer />
    </>
  );
};

export default Quiz;
