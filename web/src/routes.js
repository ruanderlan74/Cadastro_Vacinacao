import React from 'react';
import  { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import Posicao from './pages/Posicao';

const Routes = () =>{
    return(
        <BrowserRouter>
            <Route component={Home} path="/" exact/>
            <Route component={Cadastro} path="/cadastro" />
            <Route component={Posicao} path="/posicao/:cpf" />
        </BrowserRouter>
    );
}

export default Routes;
 