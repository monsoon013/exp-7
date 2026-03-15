const express = require('express');

const app = express();
app.use(express.json());
const pokemonRouter = require('./routes/pokemon.js');
const combatesRouter = require('./routes/combates.js');

const PORT  = 3000;

app.get('/', (req, res) => {
    res.send("<p>Está funcionando correctamente</p>");
})

app.use('/pokemon', pokemonRouter);
app.use('/combates', combatesRouter);

app.listen(PORT, () => {
    console.log(`Server abierto en el puerto ${PORT}`);
})

