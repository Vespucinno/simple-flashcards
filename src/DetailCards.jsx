import "./App.css";
import { useParams } from "react-router-dom";
import { flashcards } from "./data";
import { Link } from "react-router-dom";

function DetailCards() {
  const { id } = useParams();
  const cardData = flashcards.find((card) => String(card.id) === String(id));

  if (!cardData) {
    return <div className="card-not-found">Card not found</div>;
  }

  return (
    <div className="detail-card-container">
      <h2 className="detail-card-title">{cardData.title}</h2>
      <p className="detail-card-content">{cardData.content}</p>
      <Link
        to={`/play/${cardData.id}`}
        className="card-link"
        style={{ backgroundColor: "#6FCF97" }}
      >
        Start
      </Link>
      <Link to="/" className="card-link" style={{ backgroundColor: "#D92243" }}>
        Back to Home
      </Link>
      <img
        className="detail-card-image"
        src={cardData.imgSrc}
        alt={cardData.title}
      />
    </div>
  );
}

export default DetailCards;
