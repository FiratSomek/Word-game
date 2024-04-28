import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import "./styles.css";
import { Home } from "./components/Home/Home";
import { GameBoard } from "./components/GameBoard/GameBoard";
import { AddNewQuizForm } from "./components/AddNewQuizForm/AddNewQuizForm";

const App: React.FC = () => {
<<<<<<< Updated upstream
=======
  const initialCountdown = 60;
  const [countdown, setCountdown] = useState(initialCountdown);

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
              <GameBoard />
=======
              <GameBoard countdown={countdown} />
              <CountDown countdown={countdown} setCountdown={setCountdown} />
>>>>>>> Stashed changes
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
