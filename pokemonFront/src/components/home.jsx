import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PokemonDetails from "./PokemonDetails";
import "./Home.css";

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
    <div className="home">
      <h1>Welcome to Pokémon Fight!</h1>
      <h2>Choose your Pokémon and go to the BattleGame page to fight</h2>

      {/* <div className="battlegame_button_div">
          <Link to={`/BattleGame`}>
            <button className="battlegame_button">Go to BattleGame page</button>
          </Link>
        </div> */}
      <div className="home_body">
        {pokemon.map((p) => (
          <div key={p.id} className="pokemon">
            <h3>{p.name.english}</h3>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
              alt={p.name.english}
            />
            <Link to={`/PokemonDetails/${p.id}`}>
              <button className="details_button">Show Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
