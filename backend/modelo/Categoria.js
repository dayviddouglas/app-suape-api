// importando o mongoose.
const mongoose = require('mongoose')

// Criando a camada de modelo.
const Categoria = mongoose.model('Categoria', {
    tipo: String,
    nome: String,
    telefone: String,
    endereco: String,
    logo: String,
    latitude: String,
    longetude: String,
    status: Boolean,
});


module.exports = Categoria;