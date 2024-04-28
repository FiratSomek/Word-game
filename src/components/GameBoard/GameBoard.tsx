import React, { useState } from "react";
import { quizData } from "../../data";
import { QuizDataItem } from "../../data";
import "./styles.css";
import { Typography } from "@mui/material";
import { Preview } from "@mui/icons-material";

<<<<<<< Updated upstream
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
=======
interface CountdownProps {
  countdown: number;
}

export const GameBoard: React.FC<CountdownProps> = ({ countdown }) => {
  const [questions, setQuestions] = useState<QuizDataItem[]>(quizData);
  const [totalCompletedQuestions, setTotalCompletedQuestions] = useState(0);
  const [currentDescriptionId, setCurrentDescriptionId] = useState<number>(1);
  const [answer, setAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    if (countdown === 0) {
      setShowResult(true);
    }
  }, [countdown]);
  useEffect(() => {
    if (totalCompletedQuestions === questions.length) setShowResult(true);
  }, [totalCompletedQuestions]);

  useEffect(() => {
    if (answer === "bitir") {
      setTimeout(() => {
        setShowResult(true);
      }, 2000);
    }
  }, [answer]);

  // Cevabı kontrol ediyor
  const isAnswerCorrect =
    answer.trim().toLowerCase() ===
    questions
      .filter((question) => question.id === currentDescriptionId)[0]
      .word.trim()
      .toLowerCase();

  const isAnswerEmpty = answer.trim().length === 0;

  // Soruya doğru, yanlış veya pass durumuna göre class ekliyor
  const updateQuestionClass = (
    questions: QuizDataItem[],
    questionId: number,
    newClass: string
  ): QuizDataItem[] => {
    return questions.map((question) => {
      if (question.id === questionId) {
        return { ...question, class: newClass };
      }
      return question;
    });
  };

  // Verilen cevapları kontrol edip kategorize ediyoruz

  const checkAnswer = () => {
    if (isAnswerCorrect) {
      const updatedQuestions: QuizDataItem[] = updateQuestionClass(
        questions,
        currentDescriptionId,
        "correct"
      );
      setQuestions(updatedQuestions);
      setTotalCompletedQuestions((prev) => prev + 1);
    } else if (!isAnswerEmpty) {
      const updatedQuestions: QuizDataItem[] = updateQuestionClass(
        questions,
        currentDescriptionId,
        "wrong"
      );
      setQuestions(updatedQuestions);
      setTotalCompletedQuestions((prev) => prev + 1);
    } else {
      const updatedQuestions: QuizDataItem[] = updateQuestionClass(
        questions,
        currentDescriptionId,
        "pass"
      );
      setQuestions(updatedQuestions);
    }
    setAnswer("");
  };

  //Verilen cevaptan sonra oyunun ilerlemesini yada soruların hepsi cevaplandıysa oyunun sonuçlandırmasını yapıyoruz

  const nextQuestion = () => {
    if (currentDescriptionId !== questions.length) {
      const currentQuestion = questions.filter(
        (q) => q.id === currentDescriptionId
      )[0];
      if (currentQuestion.class === "pass") {
        const passedQuestionIds = questions
          .filter((q) => q.class === "pass")
          .map((q) => q.id)
          .sort((a, b) => a - b);

        if (passedQuestionIds.length > 0) {
          const currentPassedQuestionIndex = passedQuestionIds.findIndex(
            (id) => id === currentQuestion.id
          );
          const nextPassedQuestionId =
            passedQuestionIds[currentPassedQuestionIndex + 1];
          setCurrentDescriptionId(nextPassedQuestionId);
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
=======
  // OYUN İLERLEMESİNİ SAĞLAYAN FONKİSYONU BURADA BELİRTİYORUZ
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    checkAnswer();
    nextQuestion();
  };

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            {questions[currentDescriptionIndex].description}
=======
            {questions.filter(
              (question) => question.id === currentDescriptionId
            )[0]?.description || ""}
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
      <Dialog open={showResult} onClose={() => setShowResult(false)}>
        <DialogTitle>Results</DialogTitle>
        <DialogContent>
          <Typography className="answer-marks">
            <Brightness1Icon sx={{ color: "green", marginRight: "10px" }} />
            Correct Answers:{" "}
            {questions.filter((q) => q.class === "correct").length}
          </Typography>
          <Typography className="answer-marks">
            <Brightness1Icon sx={{ color: "red", marginRight: "10px" }} />
            Wrong Answers: {questions.filter((q) => q.class === "wrong").length}
          </Typography>
          <Typography className="answer-marks">
            <Brightness1Icon sx={{ color: "yellow", marginRight: "10px" }} />
            Passed Answers: {questions.filter((q) => q.class === "pass").length}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAnswers(true)}>Correct Answers</Button>
          <Link to={"/"}>
            <Button color="primary">Home</Button>
          </Link>
        </DialogActions>
      </Dialog>
      <Dialog open={showAnswers} onClose={() => setShowAnswers(false)}>
        <DialogTitle sx={{ textAlign: "center" }}>Answers</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ul>
            {questions.map((q) => (
              <li key={q.id}>
                <Typography className="answers-list">
                  <Brightness1Icon
                    sx={{
                      color:
                        q.class === "correct"
                          ? "green"
                          : q.class === "wrong"
                          ? "red"
                          : q.class === "pass"
                          ? "yellow"
                          : "inherit",
                      marginRight: "10px",
                    }}
                  />
                  {q.firstLetter} - {q.word} - {q.description}
                </Typography>
              </li>
            ))}
          </ul>
          <Link to={"/"}>
            <Button color="primary">Home</Button>
          </Link>
        </DialogContent>
      </Dialog>
>>>>>>> Stashed changes
    </div>
  );
};
