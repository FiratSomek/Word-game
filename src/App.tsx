import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import "./styles.css";
import { Home } from "./components/Home/Home";
import { GameBoard } from "./components/GameBoard/GameBoard";
import { AddNewQuizForm } from "./components/AddNewQuizForm/AddNewQuizForm";
import { useEffect, useState } from "react";
import { QuizDataItem, quizData } from "./data";

const App: React.FC = () => {
  const initialCountdown = 10;
  const [countdown, setCountdown] = useState(initialCountdown);
  const [questions, setQuestions] = useState<QuizDataItem[]>([...quizData]);

  const location = useLocation();

  useEffect(() => {
    setCountdown(initialCountdown);
    setQuestions([...quizData.map(item => ({ ...item, isAnswered: false, classname: undefined }))]);
  }, [location.pathname]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home setCountdown={setCountdown} />
            </>
          }
        />
        <Route
          path="gameboard"
          element={
            <>
              <Header />
              <GameBoard questions={questions} setQuestions={setQuestions}/>
            </>
          }
        />
        <Route
          path="addnewquiz"
          element={
            <>
              <Header />
              <AddNewQuizForm />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
