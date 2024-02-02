import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import "./styles.css";
import { Home } from "./components/Home/Home";
import { GameBoard } from "./components/GameBoard/GameBoard";
import { AddNewQuizForm } from "./components/AddNewQuizForm/AddNewQuizForm";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
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
