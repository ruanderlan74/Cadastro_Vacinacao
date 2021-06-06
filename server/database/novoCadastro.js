import bd from './db.js'

//Funçaõ para o cadastro
export async function novoCadastro( nome, cpf, data, municipio){
    //verificdo e o cpf já tem cadastro
    const query = await bd.find({cpf:cpf}).limit(1)
    console.log(query);
    if(query.length == 0){
        //cadastrando com os parametros recebidos pela função 
        new bd({
            nome: nome,
            cpf: cpf,
            data_nasc: data,
            municipio: municipio,
        
            position: await posicao()
    
    }).save().then((result)=>{
        console.log('Novo cadastro realizado');
    }).catch((err)=>{
        console.log('Erro na no momento do cadastro: '+err);
    });
    return true;
    }else{

        console.log("Esse CPF ja esta cadastrado");
        return false;
    }

};

// posicao verifica o utimo cadastreado e retorna a (posicao+1)
let posicao = async()=>{
    const qery = await bd.find().sort({'_id':-1}).limit(1); 
    return qery[0].position+1;
}


export default novoCadastro;