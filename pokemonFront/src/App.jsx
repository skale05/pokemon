import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import BattleGame from "./components/BattleGame";
import PokemonDetails from "./components/PokemonDetails";

function App() {
  return (
    <>
      <Routes className="RoutesSection">
        <Route path="/" element={<Home />} />
        <Route path="/BattleGame" element={<BattleGame />} />
        <Route path="/PokemonDetails/:id" element={<PokemonDetails />} />
      </Routes>
    </>
  );
}

export default App;
