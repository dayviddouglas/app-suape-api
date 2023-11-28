// importando o mongoose.
const mongoose = require('mongoose')

// Criando a camada de modelo.
const Login = mongoose.model('Login', {
    cpf: String,
    senha: String,
    status: Boolean,
});


module.exports = Login;