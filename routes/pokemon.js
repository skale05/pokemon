// const express = require('express');
// const pokemonController = require('../Controllers/pokemon');
// const pokemonRouter = express.Router();

// pokemonRouter.get('/', pokemonController.getAllPokemons);
// pokemonRouter.get('/:id', pokemonController.getPokemonsById);

// module.exports = pokemonRouter;
const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemon");

router.get("/", (req, res) => {
  res.send("Express API is running!");
});

router.get("/pokemon", pokemonController.getAllPokemon);

router.get("/pokemon/:id", pokemonController.getPokemonById);
router.get("/pokemon/:id/name", pokemonController.getPokemonByIdAndName);
router.get("/pokemon/:id/type", pokemonController.getPokemonByIdAndType);
router.get("/pokemon/:id/base", pokemonController.getPokemonByIdAndBase);

router.post("/pokemon/game/save", pokemonController.saveGameResults);

module.exports = router;
