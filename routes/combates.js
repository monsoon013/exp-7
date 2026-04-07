const express = require('express');
const router = express.Router();
const  combatesAccess = require('../data/combatesAccess');
const pokemons = require('../data/pokemons.json');

router.get('/', (req, res) => {
    const combatesActivos = combatesAccess.getAll();
    res.json({combatesActivos});
});

router.get('/estado/:id', (req, res) => {
    const combate = combatesAccess.getById(Number(req.params.id));
    if(!combate) {return res.status(404).json({error: "Combate no iniciado"})}
    res.json({ combate});
});

router.post('/nuevo', (req, res) => {
    const {pokemon1, pokemon2} = req.body;

    //primero verificar que los pokemons existen
    const p1 = pokemons.find(p => p.nombre === pokemon1);
    const p2 = pokemons.find(p=> p.nombre === pokemon2);

    if(!p1 || !p2){return res.status(400).send("Uno o ambos pokémons no existen")};

    const nuevoCombate = {
        id: combatesAccess.getAll().length + 1,
        pokemon1: {nombre:p1.nombre, vida: 100},
        pokemon2: {nombre:p2.nombre, vida: 100},
        turno: 1,
        ganador: null
    };

    combatesAccess.save(nuevoCombate);
    res.status(201).json({combate: nuevoCombate.id});

});

router.delete('/borrar/:id',(req, res)=>{
    const id = Number(req.params.id);
    if(!id){return res.status(404).json({error: "Combate no encontrado"})}
    const eliminado = combatesAccess.delete(id);
    if(eliminado){
            res.json({status:"ok"});
    }else {
        res.status(400).send("El combate no existe");
    }

})

module.exports = router; //ACUERDATE DE EXPORTARLO DIOSSSS