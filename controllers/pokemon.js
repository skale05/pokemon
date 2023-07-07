const jsonData = require("../pokedex.json");
const Result = require("../models/results");

exports.getAllPokemon = (req, res) => {
  res.json(jsonData);
};

exports.getPokemonById = (req, res) => {
  const id = req.params.id;
  const pokemon = jsonData.find(
    (p) => p.id === parseInt(id) || p.name.english === id
  );

  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).json({ error: "Pokemon not found" });
  }
};

exports.getPokemonByIdAndName = (req, res) => {
  const id = req.params.id;

  const pokemon = jsonData.find((p) => p.id === parseInt(id));

  if (pokemon) {
    res.json(pokemon.name);
  } else {
    res.status(404).json({ error: "Pokemon not found" });
  }
};

exports.getPokemonByIdAndType = (req, res) => {
  const id = req.params.id;
  const pokemon = jsonData.find((p) => p.id === parseInt(id));

  if (pokemon) {
    res.json(pokemon.type);
  } else {
    res.status(404).json({ error: "Pokemon not found" });
  }
};

exports.getPokemonByIdAndBase = (req, res) => {
  const id = req.params.id;
  const pokemon = jsonData.find((p) => p.id === parseInt(id));

  if (pokemon) {
    res.json(pokemon.base);
  } else {
    res.status(404).json({ error: "Pokemon not found" });
  }
};

exports.saveGameResults = async (req, res) => {
  try {
    const { player1, player2, winner } = req.body;

    const gameResult = await Result.create({
      player1,
      player2,
      winner,
    });
    res.status(201).json(gameResult);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
