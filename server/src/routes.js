import express, { response } from 'express';

import cadastrar from '../database/novoCadastro.js'

import posicao from '../database/posicao.js'

const routes = express.Router();


// Rota para verificação da posição do user
routes.get('/posicao', async (req, res) =>{

    const {cpf} = req.query;

    const usuario = await posicao(cpf);
    
    return res.json(usuario);
});


// Rota POST para o cadastro do user
routes.post('/cadastro', async (req, res) =>{
    
    const data = req.body;
    console.log(data);
    
    if(await cadastrar(data.nome, data.cpf, data.data_nasc, data.municipio))
        return res.json({"response" : "200"});
    else
        return res.json({"response" : "400"})

});

export default routes;
