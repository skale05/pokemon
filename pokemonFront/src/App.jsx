import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home.jsx';

function App() {


  return (
    <>
      <Routes className="RoutesSection">
        <Route path="/" element={<Home />} />
        {/* <Route path="/pokemon" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonId />} />
        <Route path="/pokemon/:id/:info" element={<PokemonInfo />} /> */}
      </Routes>
   
    </>
  )
}

export default App
