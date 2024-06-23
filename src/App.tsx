import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import "./styles.css";
import { Home } from "./components/Home/Home";
import { GameBoard } from "./components/GameBoard/GameBoard";
import { AddNewQuizForm } from "./components/AddNewQuizForm/AddNewQuizForm";
import { useState } from "react";

const App: React.FC = () => {
  const initialCountdown = 10;
  const [countdown, setCountdown] = useState(initialCountdown);
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
              <GameBoard />
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
