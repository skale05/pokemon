const jsonData = require('../pokedex.json');

exports.getAllPokemon = (req, res) => {
    res.json(jsonData);
};

exports.getPokemonById = (req, res) => {
    const id = req.params.id;
    const pokemon = jsonData.find(p => p.id === parseInt(id));

    if (pokemon) {
        res.json(pokemon);
    } else {
        res.status(404).json({ error: 'Pokemon not found' });
    }
};


