import React, { useState } from "react";
import { quizData } from "../../data";
import { QuizDataItem } from "../../data";
import "./styles.css";
import { Typography } from "@mui/material";
import { Console } from "console";

interface ClassItem {
  id: number;
  class: string;
}

export const GameBoard = () => {
  const [questions, setQuestions] = useState<QuizDataItem[]>(quizData);
  const [currentDescriptionId, setCurrentDescriptionId] = useState<number>(1);
  const [answer, setAnswer] = useState("");
  const [answeredQuestions, setAnsweredQuestions] = useState<ClassItem[]>([]);
  const [passClasses, setPassClasses] = useState<ClassItem[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isAnswerCorrect =
      answer.trim().toLowerCase() ===
      questions
        .filter((question) => question.id === currentDescriptionId)[0]
        .word.trim()
        .toLowerCase();

    const isPassQuestion = passClasses.find(
      (item) => item.id === currentDescriptionId
    );

    if (isPassQuestion === undefined) {
      if (answer.trim() !== "") {
        if (isAnswerCorrect) {
          setAnsweredQuestions((prev) => [
            ...prev,
            {
              id: currentDescriptionId,
              class: "correct",
            },
          ]);
        } else {
          setAnsweredQuestions((prev) => [
            ...prev,
            {
              id: currentDescriptionId,
              class: "wrong",
            },
          ]);
        }
        setAnswer("");
      } else {
        setPassClasses((prev) => [
          ...prev,
          {
            id: currentDescriptionId,
            class: "pass",
          },
        ]);
        setAnswer("");
      }
    } else {
      if (answer.trim() !== "") {
        if (isAnswerCorrect) {
          setAnsweredQuestions((prev) => [
            ...prev,
            {
              id: currentDescriptionId,
              class: "correct",
            },
          ]);
        } else {
          setAnsweredQuestions((prev) => [
            ...prev,
            {
              id: currentDescriptionId,
              class: "wrong",
            },
          ]);
        }
        setPassClasses((prev) =>
          prev.filter((item) => item.id !== currentDescriptionId)
        );
        setAnswer("");
      } else {
        return;
      }
    }

    //set the currentIndex here
    if (currentDescriptionId === questions.length) {
      if (passClasses.length > 0) {
        const nextPassQuestion = passClasses.find(
          (item) => item.class === "pass"
        );

        if (nextPassQuestion) {
          const nextIndex = nextPassQuestion.id;
          setCurrentDescriptionId(nextIndex);
        }
      } else {
        // setQuestions(quizData);
      }
    } else {
      setCurrentDescriptionId((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div>
      <div>
        <ul className="letters-list">
          {questions.map((question) => (
            <li
              key={question.id}
              className={`letters ${
                answeredQuestions.find((item) => item.id === question.id)
                  ?.class || ""
              }
              ${
                passClasses.find((item) => item.id === question.id)?.class || ""
              }
              ${
                question.id === currentDescriptionId
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
            {
              questions.filter(
                (question) => question.id === currentDescriptionId
              )[0].description
            }
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
