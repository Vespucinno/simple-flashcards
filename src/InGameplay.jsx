import { flashcards } from "./data";
import "./App.css";
import { useParams } from "react-router-dom";

function InGameplay() {
  const { id } = useParams();
  const cardData = flashcards.find((card) => card.id === parseInt(id));

  if (!cardData) {
    return <div className="card-not-found">Card not found</div>;
  }

  return (
    <div className="ingameplay-container">
      <h1 className="ingameplay-title">In-Game Play Mode</h1>
      <p className="ingameplay-content">{cardData.quiz.question}</p>
    </div>
  );
}
//kerjain dulu anjink gameplaynya, stylingnya nanti aja bangsat

export default InGameplay;
