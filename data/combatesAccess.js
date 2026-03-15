const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'combates.json');

let _combates = require('./combates.json'); //para guardarlo en una memoria interna caché  y así no lee el archivo cada vez que se requiera.


const combatesAccess = {
    getAll: () => _combates.combates,
    getById: (id) => _combates.combates.find (comb => comb.id === id),
    save: (nuevoCombate) => {
        _combates.combates.push(nuevoCombate);
        combatesAccess._commit();
    },
    delete: (id) => {
        const initLength = _combates.combates.length;
        _combates = _combates.combates.filter(c=> c.id !== id);
        if(_combates.length !== initLength){
            combatesAccess._commit(); //evita saturar el disco con escrituras innecesarias, a diferencia de fs en cada línea , solo se reescribe el archivo si se ha modificado el array.
            return true;
        }
        return false;
    },

    update: () => combatesAccess._commit(),

    _commit: () => {
        try {
            fs.writeFileSync(FILE_PATH, JSON.stringify(_combates, null, 2));
        }catch (duende){
            console.error("Error crítico: ", duende);
        }
    }

};

module.exports = combatesAccess;
