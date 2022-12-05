import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import Question from "../../components/Question/Question";
import "./Quiz.css";

const Quiz = ({ name, questions, score, setScore, setQuestions }) => {
  const [options, setOptions] = useState();
  const [currQues, setCurrQues] = useState(0);

  useEffect(() => {
    setOptions(
      questions &&
        handleShuffle([
          questions[currQues]?.correct_answer,
          ...questions[currQues]?.incorrect_answers,
        ])
    );
  }, [currQues, questions]);

  console.log(questions);

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
          marginTop: "50px",
        }}
      >
        <Typography
          className="subtitle"
          style={{
            fontSize: "25px",
            border: "1px solid black",
            boxShadow: "4px 4px 2px black",
            padding: " 5px 10px",
          }}
        >
          Welcome, {name}
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
                margin: "10px",
              }}
            >
              <span>{questions[currQues].category}</span>
              <span>
                {/* {questions[currQues].difficulty} */}
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
