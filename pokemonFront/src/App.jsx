import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home.jsx';
import BattleGame from './components/BattleGame';

function App() {


  return (
    <>
      <Routes className="RoutesSection">
        <Route path="/" element={<Home/>} />
        <Route path="/BattleGame" element={<BattleGame/>}/>
      </Routes>
   
    </>
  )
}

export default App
