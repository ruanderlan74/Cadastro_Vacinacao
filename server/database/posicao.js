import bd from './db.js'

export async function posicao(cpf){
    const query = await bd.find({cpf:cpf}).limit(1)
    console.log(query);
    if(query.length != 0)
        return query[0];
    else 
        return false;
}   


export default posicao;