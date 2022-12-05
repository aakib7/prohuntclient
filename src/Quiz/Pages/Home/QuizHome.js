import { Button, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Categories from "../../Data/Categories";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { useSelector } from "react-redux";

const QuizHome = ({ name, setName, fetchQuestions }) => {
  const { user } = useSelector((state) => state.user);
  const name1 = user?.firstName;

  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!category || !difficulty || !name) {
      setError(true);
      return;
    } else {
      setError(false);
      fetchQuestions(category, difficulty);
      navigate("/quiz/questions");
    }
  };

  return (
    <>
      <Header />
      <div
        className="content"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff,rgba(2, 94, 115, 0.4))",
        }}
      >
        <div className="settings">
          <span style={{ fontSize: 30 }}>Quiz Settings</span>
          <div className="settings__select">
            {error && <ErrorMessage>Please Fill all the feilds</ErrorMessage>}
            <TextField
              style={{ marginBottom: 25 }}
              label="User Name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              select
              label="Select Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              variant="outlined"
              style={{ marginBottom: 30 }}
            >
              {Categories.map((cat) => (
                <MenuItem key={cat.category} value={cat.value}>
                  {cat.category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Select Difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              variant="outlined"
              style={{ marginBottom: 30 }}
            >
              <MenuItem key="Easy" value="easy">
                Easy
              </MenuItem>
              <MenuItem key="Medium" value="medium">
                Medium
              </MenuItem>
              <MenuItem key="Hard" value="hard">
                Hard
              </MenuItem>
            </TextField>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
            >
              Start Quiz
            </Button>
          </div>
        </div>
        <img src="/pic.png" className="banner" alt="quiz app" />
      </div>
      <Footer />
    </>
  );
};

export default QuizHome;
