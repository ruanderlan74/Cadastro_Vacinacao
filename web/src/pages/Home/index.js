import React, { useState }from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import InputMask from 'react-input-mask';
import './styles.css';
import logo from '../../images/logo.png'
import img from '../../images/logoV.svg'

const Home = () =>{

    const history = useHistory();
    
    //
    const [rota_cpf, setRota_cpf] = useState('');
    
    //pegando o valor do CPF do input
    function handleImputChange(event){
        const {value} = event.target;
        
        setRota_cpf(value);
    }
    // aplicar o submit do CPF 
    //caso o campo tenha sido preenchido
    //tanha validade e 
    //esteja inserido no banco

    async function handleSubmit(event){
        event.preventDefault();
        console.log(rota_cpf);
        if(rota_cpf ===''){
            alert('Digite o seu CPF');
            return;
        }else if(rota_cpf.length < 14){
            alert('CPF inválido');
            return;
        }
        await axios.get(`http://localhost:8080/posicao?cpf=${rota_cpf}`).then(res =>{
            if(!(res.data)){
                alert('Numero de CPF não cadastrado');
            }else
                history.push(`/posicao/${rota_cpf}`);
            
        });
        
    }

    return(
        <div>
            <header>
                <div class="header">
                    <div class="logo">
                    <img src={logo} alt="Gov. Saúde" width="180" />
                    </div>
                </div>
            </header>
            <main>
                <div class="img-cont">
                    <img src={img} alt="Gov. Saúde" width="400" /> 
                </div>
                
                <div class="forms-busca">
                    <div class="titulo"> 
                        <h2>Descubra sua posição na fila de vacinação</h2>
                    </div>
                    <form class="forms" onSubmit={handleSubmit}>
                        <label  class="text-label" htmlFor="">Digite seu CPF:</label>
                        <br/>
                        {/* Usando inputMask*/}
                        <InputMask 
                            maskChar="" 
                            mask="999.999.999-99" 
                            onChange={handleImputChange} 
                            id="cpf" 
                            name="cpf" 
                            class="form-control" 
                            placeholder="Ex.: 000.000.000-00" 
                            autocomplete="off"
                        />
                        <br/>
    
                        <button onClick={handleSubmit} type="button" class ="bt-proximo">Próximo</button>
                        
                    </form>
                    <h4>Você ainda não se cadastrou?</h4>
                    <div class="bt-PosCadastrar">
                    <Link  to="/cadastro">
                        <button class ="bt-cadastrar">Cadastrar</button>
                    </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;