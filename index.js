const express = require('express')
let jsonData = require('./pokedex.json');
const app = express()
const port = 3000
const cors = require("cors");
const pokemonRouter = require('./routes/pokemon');

app.use(cors());
app.use(express.json());

app.use('/', pokemonRouter);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})