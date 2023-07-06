import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PokemonDetails from "./PokemonDetails";

function Home() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/pokemon")
      .then((response) => {
        setPokemon(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div>
      <Link to={`/BattleGame`}>
        <button>Go to BattleGame page</button>
      </Link>
      {pokemon.map((p) => (
        <div key={p.id}>
          <h2>{p.name.english}</h2>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
            alt={p.name.english}
          />
          <Link to={`/PokemonDetails/${p.id}`}>
            <button>Show Details</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
