
// Requisitando do node_modules as dependecias.
const mongoose = require('mongoose');

const express = require('express');



require('dotenv').config()


// Inicializando o Express.

const app = express();

// Configuração de leitura de JSON

app.use(
    express.urlencoded({
        extended:true
    })
)

app.use(
    express.json()
)

// Rota de Comfirmação 
app.get('/', (req, res)=>{
    res.json({
        messagem: "Seja Bem Vindo ao Suape App API!"
    })
})

// Configurando o cors.
const cors = require ('cors')

const configCors = {
    origin:'*',
}

app.use(cors(configCors))


// Conectando com o Banco de Dados
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;


mongoose.connect(`mongodb+srv://${mongoUser}:${mongoPassword}@apiclster.wyusev1.mongodb.net/suape_app?retryWrites=true&w=majority`).then(
    console.log("Seja Bem Vindo ao Suape App API!"),
    // Configurando a porta.
    app.listen(process.env.PORT ||4000)
).catch((err)=>{
    console.log(err)
})

// rotas da Api
const loginRotas = require('./rotas/Loginrotas');
app.use('/login', loginRotas)

const bannerRotas = require('./rotas/Bannerrotas');
app.use('/banner', bannerRotas)

const categoriaRotas = require('./rotas/Categoriarotas');
app.use('/categoria', categoriaRotas)

