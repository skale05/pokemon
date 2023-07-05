import React, { useState, useEffect } from "react";
// let jsonData = require('./pokedex.json');
const BattleGame = () => {
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    // Fetch Pokemon data from the API
    const fetchPokemonData = async () => {
      try {
        const response = await fetch("http://localhost:3000/pokemon");
        const data = await response.json();

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
  }, []);

  const handleAttack = () => {
    if (selectedPokemon) {
      const pokemon1 = selectedPokemon;
      const pokemon2 = getRandomPokemon();

      let attacker, defender;
      if (pokemon1.speed >= pokemon2.speed) {
        attacker = pokemon1;
        defender = pokemon2;
      } else {
        attacker = pokemon2;
        defender = pokemon1;
      }

      const damage = Math.max(1, attacker.attack - defender.defense);

      defender.hp -= damage;

      if (defender.hp <= 0) {
        console.log(`${defender.name} has fainted!`);
      } else {
        console.log(
          `${attacker.name} attacked ${defender.name} and dealt ${damage} damage.`
        );
        console.log(`${defender.name}'s remaining HP: ${defender.hp}`);
      }

      // Update the state to trigger a re-render
      setPokemon1({ ...pokemon1 });
      setPokemon2({ ...pokemon2 });
    } else {
      console.log("Please select a Pokemon before attacking.");
    }
  };

  const handlePokemonSelection = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  // Helper function to get a random available Pokemon
  const getRandomPokemon = () => {
    // Replace this logic with your own implementation
    // to get a random available Pokemon
    return null;
  };

  return (
    <div>
      <h2>Battle Game</h2>
      <div>
        <label>Select a Pokemon:</label>
        <select
          value={selectedPokemon}
          onChange={(e) => handlePokemonSelection(e.target.value)}
        >
          <option value="">-- Select Pokemon --</option>
          {/* Render options based on available Pokemon data */}
          {/* Replace `pokemonList` with your actual array of available Pokemon */}
          {pokemonList.map((pokemon) => (
            <option key={pokemon.id} value={pokemon}>
              {pokemon.name}
            </option>
          ))}
        </select>
      </div>
      {pokemon1 && (
        <div>
          <h3>{pokemon1.name.english}</h3>
          <p>HP: {pokemon1.base.HP}</p>
        </div>
      )}
      {pokemon2 && (
        <div>
          <h3>{pokemon2.name.english}</h3>
          <p>HP: {pokemon2.base.HP}</p>
        </div>
      )}
      <button
        onClick={handleAttack}
        disabled={!selectedPokemon || !pokemon1 || !pokemon2}
      >
        Attack
      </button>
    </div>
  );
};

export default BattleGame;
