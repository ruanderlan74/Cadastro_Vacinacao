import mongoose from 'mongoose'

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/cadastroVacinas',{

}).then((result)=>{
  console.log('Conectado ao BD')
}).catch((err)=>{
  console.log('ERRO')
});

const user = mongoose.Schema({
  nome:{
    type:String,
    require:true
  },
  cpf:{
    type:String,
    require:true
  },
  data_nasc:{
    type:String,
    require:true
  },
  municipio:{
    type:String,
    require:true
  },
  position:{
    type:Number,
    require:true
  }
});

mongoose.model('cadastros', user);

const novoCadastro = mongoose.model('cadastros');

export default novoCadastro;