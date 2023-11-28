const Login = require('../modelo/Login')

const rotas = require('express').Router()

const crypto = require('crypto');



rotas.post('/', async (req, res)=>{

    var {cpf, senha, status}= req.body

     senha = crypto.createHash('sha256').update(senha).digest('hex')
     
    if(!cpf && !senha){
       res.status(400).json({senha: "A senha é obrigatória!"})
    }

    const login = {
        cpf, senha, status
    }

    try{
        
        await Login.create(login)
        res.status(201).json({message: "Login Criado com sucesso!"})
    }catch (err){
        res.status(404).json({error:err})
    }
})

rotas.get('/', async (req,res)=>{

    try{

        res.status(200).json(await Login.find())

    }catch (err){
        console.log({erro: err})
        res.status(404).json({erro: err})

    }

})

rotas.get('/:cpf', async (req, res)=>{

    const cpfUser = req.params.cpf
    try{
        const login = await Login.findOne({cpf:cpfUser})
        res.status(200).json(login)

    }catch(err){
        res.status(404).json({error: err})

    }

})

rotas.patch('/:id', async(req, res)=>{
     const id = req.params.id
 
    const {cpf, senha, status} = req.body
    
    const login = {
        cpf, senha, status
    }

    try{
        const loginAtualizado = await Login.updateOne({_id:id}, login)
        res.status(200).json({sucesso: "Login atualizado com sucesso!"})

    }catch (err){
         res.status(404).json({erro: err})
    }

    
})

rotas.delete('/:id', async(req, res)=>{
    const id = req.params.id
    
    try {
        await Login.deleteOne({_id:id})
        res.status(200).json({sucesso: "Login Deletado com sucesso!"})
    } catch (err) {
        res.status(400).json(err)
    }
    
})

rotas.delete('/', async (req,res)=>{
  try {
    await Login.deleteMany()
    res.status(202).json({sucesso: "Todos logins foram deletados."})
  } catch (err) {
    res.status(404).json(err)
  }
}

)






module.exports = rotas;

