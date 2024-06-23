import React, { useState } from "react";
import { quizData } from "../../data";
import { QuizDataItem } from "../../data";
import "./styles.css";
import { Typography } from "@mui/material";
import { Preview } from "@mui/icons-material";

interface ClassItem {
  id: number;
  class: string;
}

export const GameBoard = () => {
  const [questions, setQuestions] = useState<QuizDataItem[]>(quizData);
  const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [getClass, setGetClass] = useState<ClassItem[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const getPassClass = () => {
      return getClass.filter((item) => item.class === "pass");
    };

    const passClasses = getPassClass();
    console.log(passClasses);

    if (currentDescriptionIndex !== quizData.length - 1) {
      if (answer.trim() !== "") {
        const isAnswerCorrect =
          answer.trim().toLowerCase() ===
          questions[currentDescriptionIndex].word.trim().toLowerCase();
        if (isAnswerCorrect) {
          setGetClass((prevClasses) => [
            ...prevClasses,
            {
              id: questions[currentDescriptionIndex].id,
              class: "correct",
            },
          ]);
        } else {
          setGetClass((prevClasses) => [
            ...prevClasses,
            {
              id: questions[currentDescriptionIndex].id,
              class: "wrong",
            },
          ]);
        }
      } else {
        setGetClass((prevClasses) => [
          ...prevClasses,
          {
            id: questions[currentDescriptionIndex].id,
            class: "pass",
          },
        ]);
      }
      setAnswer("");
      setCurrentDescriptionIndex((prevIndex) => prevIndex + 1);
    } else {
    }
    // else if (
    //   currentDescriptionIndex === quizData.length - 1 &&
    //   passClasses.length > 0
    // ) {
    // } else if (
    //   currentDescriptionIndex === quizData.length - 1 &&
    //   passClasses.length === 0
    // ) {
    // }
  };

  return (
    <div>
      <div>
        <ul className="letters-list">
          {questions.map((question) => (
            <li
              key={question.id}
              className={`letters ${
                getClass.find((item) => item.id === question.id)?.class || ""
              } ${
                question.id === questions[currentDescriptionIndex].id
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
            {questions[currentDescriptionIndex].description}
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
