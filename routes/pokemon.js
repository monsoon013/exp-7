const express = require('express');
const router = express.Router();
const pokeList = require('../data/pokemons.json')

router.get('/lista', (req, res) => {
    console.log("Se ha accedido a la lista de pokemons");
    const pokeNombres = pokeList.map(poke => poke.nombre)
    res.json({
        pokemons: pokeNombres
    });
});

router.post('/nuevo', (req, res)=> {
    const {nombre, tipo, vida, defensa, ataques } = req.body;

    if(!nombre || !tipo || !vida || !defensa || !ataques){
        return res.status(400).json({error: "Faltan datos para crear el pokemon"});
    };
    try {
        const nuevo = {nombre, tipo, vida, defensa, ataques};
        pokeList.push(nuevo);
        res.status(200).json({"status": "ok"});
    }catch(error){
        res.status(500).json({error:"Error al crear el pokemon"});
    }
});



module.exports = router;