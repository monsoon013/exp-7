const express = require('express');

const app = express();
app.use(express.json());
const pokemonRouter = require('./routes/pokemon');

const PORT  = 3000;

app.get('/', (req, res) => {
    res.send("<p>Está funcionando correctamente</p>");
})

app.use('/pokemon', pokemonRouter);

app.listen(PORT, () => {
    console.log(`Server abierto en el puerto ${PORT}`);
})
