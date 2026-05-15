import "../App.css";
import { Link } from "react-router-dom";
import { flashcards } from "../data";

function Cards({ id }) {
  const cardData = flashcards.find((card) => Number(card.id) === Number(id));
  if (!cardData) {
    return <div className="card-not-found">Card not found</div>;
  }

  return (
    <div className="card-container">
      <img className="card-image" src={cardData.imgSrc} alt={cardData.title} />
      <h2 className="card-title">{cardData.title}</h2>
      <p className="card-content">{cardData.content}</p>
      <Link
        to={`/detail/${id}`}
        className="card-link"
        rel="noopener noreferrer"
      >
        Learn it!
      </Link>
    </div>
  );
}

export default Cards;
