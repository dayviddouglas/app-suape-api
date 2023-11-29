
const cloudinary = require('cloudinary').v2
const Estabelecimento = require('../modelo/Estabelecimento')

const rotas = require('express').Router()

require('dotenv').config()
        
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });


  const uploadCloudinary = (urlImg, publicId)=>{
     
     cloudinary.uploader.upload(urlImg,
     { public_id: publicId }, 
     function(error, result) {
       if (result) {
           return (result.secure_url); 
       } else {
           console.error(error)
       }    
   });

  }

  
    


rotas.post('/', async (req, res)=>{
     

    const {tipo, nome, telefone, endereco, logo, latitude, longetude, status}= req.body

       

    if(!tipo && !nome && !telefone && !endereco && !status){
       res.status(400).json({campos: "Preencha todos campos..."})
    }

    const categ = {
        tipo, nome, telefone, endereco, logo, latitude, longetude,status
    }
    
    try{
        
       await Estabelecimento.create(categ)
        res.status(201).json({message: "Estabelecimento criado com sucesso!"})
    }catch (err){
        res.status(404).json({error:err})
    }
})

rotas.get( '/', async (req,res)=>{

    try{

        res.status(200).json(await Estabelecimento.find())

    }catch (err){
        console.log({erro: err})
        res.status(404).json({erro: err})

    }


})

rotas.get('/:tipo', async (req, res)=>{

    const tipoUser = req.params.tipo
    try{
        const tipo = await Estabelecimento.find({tipo:tipoUser})
        res.status(200).json(tipo)

    }catch(err){
        res.status(404).json({error: err})
    }
})


rotas.patch('/:id', async(req, res)=>{
    const id = req.params.id

   const {tipo, nome, telefone, endereco, logo, latitude, longetude,status} = req.body

    if(!tipo && !nome && !telefone && !endereco && !status){
     res.status(400).json({campos: "Preencha todos campos..."})
  }

   const elemento = {
    tipo, nome, telefone, endereco, logo, latitude, longetude,status
   }

   try{
       const elementoAtualizado = await Estabelecimento.updateOne({_id:id}, elemento)
       res.status(200).json({sucesso: "Elemento atualizado com sucesso!"})

   }catch (err){
        res.status(404).json({erro: err})
   } 
})

rotas.get('/1/:id', async (req, res)=>{

    const idUser = req.params.id
    try{
        const categ = await Estabelecimento.findOne({_id:idUser})
        res.status(200).json(categ)

    }catch(err){
        res.status(404).json({error: err})
    }
})




rotas.delete('/:id', async(req, res)=>{
    const id = req.params.id
    
    try {
        await Estabelecimento.deleteOne({_id:id})
        res.status(200).json({sucesso: "Elemento deletado com sucesso!"})
    } catch (err) {
        res.status(400).json(err)
    }   
})

rotas.delete('/', async (req,res)=>{
    try {
      await Estabelecimento.deleteMany()
      res.status(202).json({sucesso: "Todos os elementos foram deletados."})
    } catch (err) {
      res.status(404).json(err)
    }
  }
  )

  



module.exports = rotas;