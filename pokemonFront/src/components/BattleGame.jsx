import React, { useState, useEffect } from 'react';

const BattleGame = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    // Fetch Pokemon data from the API
    const fetchPokemonData = async () => {
      try {
        const response = await fetch('http://localhost:3000/pokemon');
        const data = await response.json();
        setPokemonList(data);

        // Select random Pokemons for the battle
        const randomIndex1 = Math.floor(Math.random() * data.length);
        const randomIndex2 = Math.floor(Math.random() * data.length);
        setPokemon1(data[randomIndex1]);
        setPokemon2(data[randomIndex2]);
      } catch (error) {
        console.log('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemonData();
  }, []);

  const handleAttack = () => {
    if (selectedPokemon) {
      const attacker = selectedPokemon;
      const defender = getRandomPokemon(pokemonList);

      const damage = Math.max(1, attacker.base.Attack - defender.base.Defense);

      defender.base.HP -= damage;

      if (defender.base.HP <= 0) {
        console.log(`${defender.name.english} has fainted!`);
      } else {
        console.log(
          `${attacker.name.english} attacked ${defender.name.english} and dealt ${damage} damage.`
        );
        console.log(`${defender.name.english}'s remaining HP: ${defender.base.HP}`);
      }

      // Update the state to trigger a re-render
      setPokemon2({ ...defender });
    } else {
      console.log('Please select a Pokemon before attacking.');
    }
  };

  const handlePokemonSelection = (event) => {
    const selectedPokemonId = event.target.value;
    const selectedPokemon = pokemonList.find(pokemon => pokemon.id === parseInt(selectedPokemonId));
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
        <select value={selectedPokemon ? selectedPokemon.id.toString() : ''} onChange={handlePokemonSelection}>
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
          <p>HP: {selectedPokemon.base['HP']}</p>
        </div>
      )}
      {pokemon2 && (
        <div>
          <h3>{pokemon2.name.english}</h3>
          <p>HP: {pokemon2.base['HP']}</p>
        </div>
      )}
      <button disabled={!selectedPokemon || !pokemon2} onClick={handleAttack}>
        Attack
      </button>
    </div>
  );
};

export default BattleGame;
