// importando o mongoose.
const mongoose = require('mongoose')

// Criando a camada de modelo.
const Banner = mongoose.model('Banner', {
    titulo: String,
    banner: String,
});


module.exports = Banner;
