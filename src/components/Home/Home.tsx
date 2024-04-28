import { Avatar, Button, Container, Typography } from "@mui/material";
import "./styles.css";
import { Link } from "react-router-dom";
import EditNoteIcon from "@mui/icons-material/EditNote";
import logo from "../../assets/Black and White Gaming Logo .jpg";

interface HomeProps {
  setCountdown: React.Dispatch<React.SetStateAction<number>>;
}

export const Home: React.FC<HomeProps> = ({ setCountdown }) => {
  return (
    <div className="main-board-container">
      <div>
        <img src={logo} alt="" />
      </div>
      <div>
        {" "}
        <Link to="/gameboard">
          <Button
            variant="contained"
            size="large"
            onClick={() => setCountdown(60)}
          >
            Start game
          </Button>
        </Link>
      </div>
      <div>
        <Link to="/addnewquiz">
          {" "}
          <button className="add-new-quiz-button">
            Add New Quiz{" "}
            <span>
              <EditNoteIcon fontSize="large" />
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};
