const uploadCloudinary = require("../cloudinary/config")


const Estabelecimento = require('../modelo/Estabelecimento')

const rotas = require('express').Router()


// uploadCloudinary("C:/Users/dayvi/Downloads/app-suape/app-suape/app-suape/icones/Restaurantes/AbsLogo2.jpg", "posto_petrobas_logo")




rotas.post('/', async (req, res)=>{

    
    const {tipo, nome,cnpj, telefone, endereco, segunda, terca, quarta,quinta,sexta,sabado,domingo, logo, latitude, longetude, descricao,eloLogo,
         masterCardLogo,visaLogo,status}= req.body


    const categ = {
        tipo, nome,cnpj, telefone, endereco, logo,latitude,segunda, terca, quarta,quinta,sexta,sabado,domingo,
         longetude, descricao,eloLogo, masterCardLogo, visaLogo,status
    }
    
    try{
        
    if(!tipo || !nome || !cnpj || !descricao || !telefone || !endereco || !status){
        res.status(400).json({campos: "Os Campos obrigatórios são: tipo, nome, cnpj,"+ "descrição, telefone,endereço e status."
        })
     }else{
        await Estabelecimento.create(categ)
        res.status(201).json({message: "Estabelecimento criado com sucesso!"})
     }
       
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

    const {tipo, nome,cnpj, telefone, endereco, segunda, terca, quarta,quinta,sexta,sabado,domingo, logo, latitude, longetude, descricao,eloLogo,
        masterCardLogo,visaLogo,status}= req.body

   const elemento = {
    tipo, nome,cnpj, telefone, endereco, logo,latitude,segunda, terca, quarta,quinta,sexta,sabado,domingo,
         longetude, descricao,eloLogo, masterCardLogo, visaLogo,status
   }

   try{
    if(!tipo || !nome || !cnpj || !descricao || !telefone || !endereco || !status){
        res.status(400).json({campos: "Os Campos obrigatórios são: tipo, nome, cnpj,"+ "descrição, telefone,endereço e status."
        })
     }else{
        const elementoAtualizado = await Estabelecimento.updateOne({_id:id}, elemento)
       res.status(200).json({sucesso: "Elemento atualizado com sucesso!"})
     }
       

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