import HomePage from "./HomePage";
import DetailCards from "./DetailCards";
import PlayPage from "./PlayPage";
import InGameplay from "./InGameplay";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/detail/:id" element={<DetailCards />} />
      <Route path="/play/:id" element={<PlayPage />} />
      <Route path="/ingameplay/:id" element={<InGameplay />} /> //jangan lupa
      setting lagi idnya
    </Routes>
  );
}

export default App;
