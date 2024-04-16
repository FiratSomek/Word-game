import { Button } from "@mui/material";
import "./styles.css";
import { Link } from "react-router-dom";
import EditNoteIcon from "@mui/icons-material/EditNote";
import logo from "../../assets/Black and White Gaming Logo .jpg";

export const Home = () => {
  return (
    <div className="main-board-container">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={logo} alt="#" className="logo" />
      </div>
      <div>
        {" "}
        <Link to="/gameboard">
          <Button variant="contained" size="large">
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
