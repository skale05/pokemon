import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState();
  const SpAttack = "Sp. Attack";
  const SpDefense = "Sp. Defense";

  useEffect(() => {
    axios
      .get(`http://localhost:3000/pokemon/${id}`)
      .then((response) => {
        setPokemon(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div>
      {pokemon && (
        <div>
          <h2>{pokemon.name.english}</h2>
          <p>{pokemon.type}</p>
          <p>HP: {pokemon.base.HP}</p>
          <p>Attack: {pokemon.base.Attack}</p>
          <p>Speed: {pokemon.base.Speed}</p>
          <p>Defense: {pokemon.base.Defense}</p>
          <p>Speed Attack: {pokemon.base["Sp. Attack"]}</p>
          <p>Speed Defense: {pokemon.base["Sp. Defense"]}</p>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            alt={pokemon.name.english}
          />
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemon.id}.png`}
            alt={pokemon.name.english}
          />
        </div>
      )}
    </div>
  );
}

export default PokemonDetails;
