import React, { useEffect, useState } from "react";
import { QuizDataItem } from "../../data";
import "./styles.css";
import { Button, Typography } from "@mui/material";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import { Link } from "react-router-dom";

export const GameBoard = ({
  questions,
  setQuestions,
  countdown,
  setCountdown,
}: {
  questions: QuizDataItem[];
  setQuestions: React.Dispatch<React.SetStateAction<QuizDataItem[]>>;
  countdown: number;
  setCountdown: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isFirstRound, setIsFirstRound] = useState(true);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [showAllAnswer, setShowAllAnswer] = useState(false);

  useEffect(() => {
    const unansweredQuestions = questions.filter((q) => !q.isAnswered);
    if (unansweredQuestions.length === 0) {
      setTimeout(() => {
        setIsGameComplete(true);
        setCountdown(0);
      }, 500);
    }
  }, [questions, countdown]);
  useEffect(() => {
    if (countdown === 0) {
      setTimeout(() => {
        setIsGameComplete(true);
      }, 1000);
    }
  }, [countdown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentDescriptionIndex === questions.length - 1) {
      setIsFirstRound(false);
    }
    if (answer.trim().length > 0) {
      const isAnswerCorrect =
        answer.trim().toLowerCase() ===
        questions[currentDescriptionIndex].word.trim().toLowerCase();
      // Answer is correct
      if (isAnswerCorrect) {
        setQuestions((prev) => [
          ...prev.map((q) => {
            if (q.id === currentDescriptionIndex) {
              q.classname = "correct";
              q.isAnswered = true;
            }
            return q;
          }),
        ]);
        // Answer is not correct
      } else {
        setQuestions((prev) => [
          ...prev.map((q) => {
            if (q.id === currentDescriptionIndex) {
              q.classname = "wrong";
              q.isAnswered = true;
            }
            return q;
          }),
        ]);
      }
      // No answer
    } else {
      setQuestions((prev) => [
        ...prev.map((q) => {
          if (q.id === currentDescriptionIndex) {
            q.classname = "pass";
          }
          return q;
        }),
      ]);
    }

    if (isFirstRound && currentDescriptionIndex < questions.length - 1) {
      setCurrentDescriptionIndex((prev) => prev + 1);
    } else {
      const passedQuestionIds = questions
        .filter((q) => !q.isAnswered)
        .map((q) => q.id);

      // The passed question is the last in the list
      if (
        currentDescriptionIndex ===
        passedQuestionIds[passedQuestionIds.length - 1]
      ) {
        setCurrentDescriptionIndex(passedQuestionIds[0]);
      } else {
        const indexOfCurrentPassedQuestion = passedQuestionIds.indexOf(
          currentDescriptionIndex
        );

        setCurrentDescriptionIndex(
          passedQuestionIds[indexOfCurrentPassedQuestion + 1]
        );
      }
    }
    setAnswer("");
  };

  const handleReset = () => {
    setQuestions(
      questions.map((q) => ({ ...q, isAnswered: false, classname: undefined }))
    );
    setCurrentDescriptionIndex(0);
    setAnswer("");
    setIsGameComplete(false);
    setIsFirstRound(true);
  };
  const currentQuestion =
    questions.length > 0 ? questions[currentDescriptionIndex] : null;

  return isGameComplete ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {showAllAnswer ? (
        <div className="answers-page">
          <Typography variant="h3">Answers</Typography>
          <ul>
            {questions.map((q) => (
              <li key={q.id}>
                <Typography className="answers-list">
                  <Brightness1Icon
                    sx={{
                      color:
                        q.classname === "correct"
                          ? "green"
                          : q.classname === "wrong"
                          ? "red"
                          : q.classname === "pass"
                          ? "yellow"
                          : "inherit",
                      marginRight: "10px",
                    }}
                  />
                  <p
                    style={{
                      color:
                        q.classname === "correct"
                          ? "green"
                          : q.classname === "wrong"
                          ? "red"
                          : q.classname === "pass"
                          ? "yellow"
                          : "inherit",
                    }}
                  >
                    {q.firstLetter} - {q.word}- {q.description}
                  </p>{" "}
                </Typography>
              </li>
            ))}
          </ul>
          <div>
            <Button onClick={() => setShowAllAnswer(false)}>Back</Button>
            <Link to={"/"} onClick={handleReset}>
              <Button color="primary">Home</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="results-page">
          <div>
            <Typography variant="h3">Results</Typography>
            <Typography className="answer-marks">
              <Brightness1Icon sx={{ color: "green", marginRight: "10px" }} />
              Correct Answers:{" "}
              {questions.filter((q) => q.classname === "correct").length}
            </Typography>
            <Typography className="answer-marks">
              <Brightness1Icon sx={{ color: "red", marginRight: "10px" }} />
              Wrong Answers:{" "}
              {questions.filter((q) => q.classname === "wrong").length}
            </Typography>
            <Typography className="answer-marks">
              <Brightness1Icon sx={{ color: "yellow", marginRight: "10px" }} />
              Passed Answers:{" "}
              {questions.filter((q) => q.classname === "pass").length}
            </Typography>
          </div>
          <div style={{ display: "flex" }}>
            <Button onClick={() => setShowAllAnswer(true)}>
              Correct Answers
            </Button>
            <Link to={"/"} onClick={handleReset}>
              <Button>Home</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div>
      <div>
        <ul className="letters-list">
          {questions.map((question) => (
            <li
              key={question.id}
              className={`letters ${question.classname || ""} ${
                question.id === currentDescriptionIndex
                  ? "selected-letter"
                  : "transparent"
              } `}
            >
              {question.firstLetter}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="descriptons">
          <Typography className="description">
            {currentQuestion?.description}
          </Typography>
        </div>
      </div>
      <div className="user-answers">
        <form onSubmit={handleSubmit}>
          <input
            className="answer-input"
            type="text"
            placeholder="Please, write your answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};
