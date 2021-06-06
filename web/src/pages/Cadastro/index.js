import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import InputMask from 'react-input-mask';
import axios from 'axios'
import logo from '../../images/logo.png'
import './styles.css';


const Cadastro = () =>{
    
    
    //useState para pegar todos os municipios do Ceará da apiIBGE
    const [mun, setMun] = useState([]);
    //useState para pegar o municipio do <select>
    const [municipioSelecionado, setMunicipioSelecionado] = useState('0');
    // Constantes para o fromulario
    const municipio = municipioSelecionado;
    //useState para pegar nome, cpf e data de nacimento dos inputs
    const[formData, setFormData] = useState({
        nome:'',
        cpf:'',
        data_nasc:''
    });
    const {nome, cpf, data_nasc} = formData;
    //Objeto do fromulario
    const data = {
        nome,
        cpf,
        data_nasc,
        municipio
    }
    // para ir ao '/' depois do uso
    const history = useHistory();

    function handleImputChange(event){
        const {name, value} = event.target;

        setFormData({...formData, [name]:value});
    }
    function handleMuncipioChange(event){
        const municipio = event.target.value
        setMunicipioSelecionado(municipio);
    }

    //Função de submit do formulario
    async function handleSubmit(event){
        event.preventDefault();

       
        //Verificando se cada dado foi inserido ou é valido
        if(nome ===''){
            alert('Digite seu nome');
            return;
        }
        if(municipio === '0'){
            alert('Escolha seu município ');
            return;
        }
        if(cpf ===''){
            alert('Digite o seu CPF');
            return;
        }
        if(cpf.length < 14){
            alert('CPF inválido');
            return;
        }
        if(data_nasc === '')
        {
            alert('Digite sua data nacismento')
            return;
        }
        if(data_nasc.length < 10){
            alert('Data nacismento inválida')
            return;
        }
        
        //passando os parametros do forms para o back-end com o data
        await axios.post('http://localhost:8080/cadastro', data).then(res=>{
            
            const comfirm = res.data.response;

            //verificando se o cadastro foi realizado com sucesso
            if(comfirm === '200'){
                alert('Cadastro criado com sucesso!');
                history.push('/');
            }    
            else
                //Caso o cpf já tenha cadastro retorno um alerta.
                alert('CPF já cadastrado!');
               
        });
    }

    
    //useEffect para resgatar todos os municipios da API do IBGE
    useEffect(()=>{
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/CE/municipios').then(res =>{
            
            // Usando map() para trasnformar o objeto em array[objetos.nome]  
            const municipios = res.data.map(mun => mun.nome);
            setMun(municipios);
        });
    }, []);


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
                <div class="forms-posicao">
                    <div class="titulo"> 
                        <h1>Cadastro para vacinação</h1>
                    </div>
                    <form class="forms" onSubmit={handleSubmit}>
                        <label class="text-label" htmlFor="nome">Nome:</label>
                        <br/>
                        <input 
                            onChange={handleImputChange}
                            id="nome" 
                            name="nome" 
                            type="text" 
                            class="form-control" 
                            placeholder="Ex.: Mark Ruffalo" 
                            autocomplete="off"
                        />

                        <label class="text-label" htmlFor="cpf">CPF:</label>
                        <br/> 
                        {/*Usando InputMask para fazer uma mask para cpf e data*/}
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
                        

                        <label class="text-label" htmlFor="">Data de nascmento:</label>
                        <br/>
                        
                        <InputMask 
                            maskChar="" 
                            mask="99/99/9999"
                            onChange={handleImputChange} 
                            id="data_nasc" 
                            name="data_nasc" 
                            class="form-control" 
                            placeholder="Ex.: dd/mm/aaaa" 
                            autocomplete="off"
                        />

                        <label class="text-label" htmlFor="">Município:</label>
                        <br/>
                        <select name="municipio" id="municipio" value={municipioSelecionado} onChange={handleMuncipioChange}>
                            <option class = "fist-option" value="0">Selecione o seu município</option>
                            {
                                //fazendo um option para cada municipio do array mun  
                                mun.map( mun =>(
                                <option 
                                    key ={mun} 
                                    value={mun}
                                >{mun}
                                </option>
                                ))
                            }
                        </select>
                        <br/>
                        <button type="submit" class ="bt-comfimarCad" >Cadastrar</button>
                    </form>
                </div>
            </main>
        </div> 
    );
}

export default Cadastro;