import "./App.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { flashcards } from "./data";

function PlayPage() {
  const { id } = useParams();
  const cardData = flashcards.find((card) => String(card.id) === String(id));

  if (!cardData) {
    return <div className="card-not-found">Card not found</div>;
  }

  return (
    <div className="play-container">
      <h2 className="play-title">Ready?</h2>
      <p className="play-content">
        Klik Start untuk memulai permainan flashcards!
      </p>
      <Link
        to={`/ingameplay/${cardData.id}`}
        className="play-start"
        style={{ backgroundColor: "#6FCF97" }}
      >
        Start
      </Link>
    </div>
  );
}

export default PlayPage;
