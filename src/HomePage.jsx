import "./App.css";
import Cards from "./components/Cards";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <div className="header">
        <h1>
          Flash<span style={{ color: "white" }}>Cards</span>
        </h1>
        <h3>
          Study your <span style={{ color: "aqua" }}>flash</span>cards with
          ease!
        </h3>
        <p>But wait, what is a flashcard?</p>

        <Link to="/about" className="about">
          What is it?
        </Link>
      </div>

      <div className="all-cards">
        <h2 className="subheader">Pilih Topikmu!</h2>
        <Cards id={1} />
        <Cards id={2} />
      </div>
    </>
  );
}

export default HomePage;
