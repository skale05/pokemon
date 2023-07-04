import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BattleGame from './components/BattleGame';

function Home() {
  const [pokemon, setPokemon] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:3000/pokemon')
      .then((response) => {
        setPokemon(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);


  return (
    <div>
      {pokemon.map((p) => (
        <div key={p.id}>
          <h2>{p.name.english}</h2>
          <p>{p.type}</p>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}/>
          <button>Select for fight</button>
          
        </div>
      ))}
    </div>
  );
}

export default Home;
