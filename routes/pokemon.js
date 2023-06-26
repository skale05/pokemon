// const express = require('express');
// const pokemonController = require('../Controllers/pokemon');
// const pokemonRouter = express.Router();

// pokemonRouter.get('/', pokemonController.getAllPokemons);
// pokemonRouter.get('/:id', pokemonController.getPokemonsById);


// module.exports = pokemonRouter;
const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemon');

router.get('/', (req, res) => {
    res.send('Express API is running!');
});

router.get('/pokemon', pokemonController.getAllPokemon);

router.get('/pokemon/:id', pokemonController.getPokemonById);

module.exports = router;