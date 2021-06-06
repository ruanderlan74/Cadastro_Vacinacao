import React, { useState, useEffect }from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import axios from 'axios'
import './styles.css';
import logo from '../../images/logo.png'

const Posicao = () =>{
    //pegando o cpf, passado como Params
    const { cpf } = useParams();
    
    //resgatando do node o nome e a posição via cpf  
    useEffect(()=>{
    axios.get(`http://localhost:8080/posicao?cpf=${cpf}`).then(res =>{
            const { nome, position } = res.data;
            if(nome === ''){
                alert('ERRO 400')
                history.push('/')
            }
            setFormData({nome: nome, position: position});
        }).catch(err =>{
            alert(`ERRO 500 :${err}`)
                history.push('/')
        })
    }, []);

    const[formData, setFormData] = useState({
        nome:'',
        position:'',
    });

    const{ nome, position} = formData;
    
    const history = useHistory()
    

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
            <div class='box-main'>
                <h2>Olá <span>{nome} </span>, tudo bem com você ?</h2>
                <br />
                <h3>Sua posição na fila de vacinação: <span> {position}º </span> </h3>
                <Link to='/'>
                    <button class="bt-voltar"> ← Voltar </button>
                </Link>
                
            </div>

        </main>
        </div>
    );
}

export default Posicao;