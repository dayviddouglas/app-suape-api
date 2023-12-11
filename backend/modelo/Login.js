// importando o mongoose.
const mongoose = require('mongoose')

// Criando a camada de modelo.
const Login = mongoose.model('Login', {
    nome: String,
    foto: String,
    cpf: String,
    senha: String,
    telefone: String,
    email: String,
    telefone: String,
    status: Boolean,
});


module.exports = Login;