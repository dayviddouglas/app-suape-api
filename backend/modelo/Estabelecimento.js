// importando o mongoose.
const mongoose = require('mongoose')

// Criando a camada de modelo.
const Estabelecimento = mongoose.model('Estabelecimento', {
    tipo: String,
    nome: String,
    telefone: String,
    endereco: String,
    logo: String,
    latitude: String,
    longetude: String,
    eloLogo: String,
    masterCardLogo: String,
    visaLogo: String,
    cnpj: String,
    descricao: String,
    status: Boolean,
    segunda: String,
    terca: String,
    quarta: String,
    quinta: String,
    sexta: String,
    sabado: String,
    domingo: String
});


module.exports = Estabelecimento;