import { Button, MenuItem, TextField, styled } from "@mui/material";
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

  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!category || !difficulty) {
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
          height: "90vh",
        }}
      >
        <div className="settings">
          <span style={{ fontSize: 30, fontWeight: 500 }}>Quiz Settings</span>
          <div className="settings__select">
            {error && <ErrorMessage>Please Fill all the feilds</ErrorMessage>}
            <TextField
              style={{ marginBottom: 25 }}
              variant="outlined"
              value={user?.userName ? user?.userName : name}
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
            <StyledButton
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Start Quiz
            </StyledButton>
          </div>
        </div>
        <img src={"/pic.png"} className="banner" alt="quiz app" />
      </div>
      <Footer />
    </>
  );
};

export default QuizHome;
const StyledButton = styled(Button)`
  background-color: #025e73;
  color: #fff;
  &:hover {
    background-color: #f2a71b;
  }
`;
