import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BattleGame = () => {
  const { pokemonId } = useParams();
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [fightResult, setFightResult] = useState("");
  const [remainingHP, setRemainingHP] = useState("");

  useEffect(() => {
    // Fetch Pokemon data from the API
    const fetchPokemonData = async () => {
      try {
        const response = await fetch("http://localhost:3000/pokemon");
        const data = await response.json();
        setPokemonList(data);

        // Find the selected Pokemon based on the ID
        const selected = data.find(
          (pokemon) => pokemon.id === parseInt(pokemonId)
        );
        setSelectedPokemon(selected);

        // Select random Pokemons for the battle
        const randomIndex1 = Math.floor(Math.random() * data.length);
        const randomIndex2 = Math.floor(Math.random() * data.length);
        setPokemon1(data[randomIndex1]);
        setPokemon2(data[randomIndex2]);
      } catch (error) {
        console.log("Error fetching Pokemon data:", error);
      }
    };

    fetchPokemonData();
  }, [pokemonId]);

  // const handleAttack = () => {
  //   if (selectedPokemon) {
  //     const attacker = selectedPokemon;
  //     const defender = getRandomPokemon(pokemonList);

  //     const damage = Math.max(1, attacker.base.Attack - defender.base.Defense);

  //     defender.base.HP -= damage;

  //     if (defender.base.HP <= 0) {
  //       const result = `${defender.name.english} has fainted!`;
  //       setFightResult(result);
  //     } else {
  //       const result = `${attacker.name.english} attacked ${defender.name.english} and dealt ${damage} damage.`;
  //       setFightResult(result);
  //       const hpResult = `${defender.name.english}'s remaining HP: ${defender.base.HP}`;
  //       setRemainingHP(hpResult);
  //     }

  //     // Update the state to trigger a re-render
  //     setPokemon2({ ...defender });
  //   } else {
  //     console.log("Please select a Pokemon before attacking.");
  //   }
  // };

  const handleAttack = async () => {
    if (selectedPokemon) {
      const attacker = selectedPokemon;
      const defender = getRandomPokemon(pokemonList);

      const damage = Math.max(1, attacker.base.Attack - defender.base.Defense);

      defender.base.HP -= damage;

      if (defender.base.HP <= 0) {
        const result = `${defender.name.english} has fainted!`;
        setFightResult(result);
      } else {
        const result = `${attacker.name.english} attacked ${defender.name.english} and dealt ${damage} damage.`;
        setFightResult(result);
        const hpResult = `${defender.name.english}'s remaining HP: ${defender.base.HP}`;
        setRemainingHP(hpResult);
      }

      // Update the state to trigger a re-render
      setPokemon2({ ...defender });

      try {
        // Send the game result to the server
        const response = await axios.post(
          "http://localhost:3000/pokemon/game/save",
          {
            player1: attacker.name.english,
            player2: defender.name.english,
            // winner: defender.base.HP <= 0 ? attacker.name.english : "",
            winner: attacker.name.english,
          }
        );
        console.log("Game result saved:", response.data);
      } catch (error) {
        console.log("Error saving game result:", error);
      }
    } else {
      console.log("Please select a Pokemon before attacking.");
    }
  };

  const handlePokemonSelection = (event) => {
    const selectedPokemonId = event.target.value;
    const selectedPokemon = pokemonList.find(
      (pokemon) => pokemon.id === parseInt(selectedPokemonId)
    );
    setSelectedPokemon(selectedPokemon);
  };

  const getRandomPokemon = (list) => {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
  };

  return (
    <div>
      <h2>Battle Game</h2>
      <div>
        <label>Select a Pokemon:</label>
        <select
          value={selectedPokemon ? selectedPokemon.id.toString() : ""}
          onChange={handlePokemonSelection}
        >
          <option value="">-- Select Pokemon --</option>
          {pokemonList.map((pokemon) => (
            <option key={pokemon.id} value={pokemon.id}>
              {pokemon.name.english}
            </option>
          ))}
        </select>
      </div>
      {selectedPokemon && (
        <div>
          <h3>{selectedPokemon.name.english}</h3>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`}
            alt={selectedPokemon.name.english}
          />
          <p>HP: {selectedPokemon.base["HP"]}</p>
        </div>
      )}
      {pokemon2 && (
        <div>
          <h3>{pokemon2.name.english}</h3>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon2.id}.png`}
            alt={pokemon2.name.english}
          />
          <p>HP: {pokemon2.base["HP"]}</p>
        </div>
      )}
      <button disabled={!selectedPokemon || !pokemon2} onClick={handleAttack}>
        Attack
      </button>
      {fightResult && <p>{fightResult}</p>}
      {remainingHP && <p>{remainingHP}</p>}
    </div>
  );
};

export default BattleGame;
