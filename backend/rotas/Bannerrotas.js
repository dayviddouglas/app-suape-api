const Banner = require('../modelo/Banner')

const rotas = require('express').Router()


const uploadCloudinary = require("../cloudinary/config")

// uploadCloudinary("C:/Users/dayvi/Downloads/app-suape/app-suape/app-suape/icones/Abastecimento.png", "abastecimento_banner")



rotas.post('/', async (req, res)=>{

    const {titulo, banner}= req.body

    
    if(!titulo){
       res.status(400).json({titulo: "o título é obrigatório!"})
    }

    const bann = {
        titulo, banner
    }

    
    try{
        
        await Banner.create(bann)
        res.status(201).json({message: "Banner criado com sucesso!"})
    }catch (err){
        res.status(404).json({error:err})
    }
})



rotas.get( '/', async (req,res)=>{

    try{

        res.status(200).json(await Banner.find())

    }catch (err){
        console.log({erro: err})
        res.status(404).json({erro: err})

    }


})


rotas.get('/:id', async (req, res)=>{

    const idUser = req.params.id
    try{
        const bann = await Banner.findOne({_id:idUser})
        res.status(200).json(bann)

    }catch(err){
        res.status(404).json({error: err})

    }

})

rotas.patch('/:id', async(req, res)=>{
    const id = req.params.id

   const {titulo, banner} = req.body
   
   const bann = {
    titulo, banner
   }

   try{
       const loginAtualizado = await Banner.updateOne({_id:id}, bann)
       res.status(200).json({sucesso: "Banner atualizado com sucesso!"})

   }catch (err){
        res.status(404).json({erro: err})
   }

   
})

rotas.delete('/:id', async(req, res)=>{
    const id = req.params.id
    
    try {
        await Banner.deleteOne({_id:id})
        res.status(200).json({sucesso: "Banner deletado com sucesso!"})
    } catch (err) {
        res.status(400).json(err)
    }
    
})

rotas.delete('/', async (req,res)=>{
    try {
      await Banner.deleteMany()
      res.status(202).json({sucesso: "Todos banners foram deletados."})
    } catch (err) {
      res.status(404).json(err)
    }
  }
  )



module.exports = rotas;