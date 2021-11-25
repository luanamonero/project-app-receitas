import { Switch, Route } from 'react-router-dom';
import React from 'react';
import Login from '../Pages/Login';
import Receitas from '../Pages/Receitas';
import Bebidas from '../Pages/Bebidas';
import Explorar from '../Pages/Explorar';
import ExplorarBebidas from '../Pages/ExplorarBebidas';
import ExplorarComidas from '../Pages/ExplorarComidas';
import Perfil from '../Pages/Perfil';
import ReceitasFavoritas from '../Pages/ReceitasFavoritas';
import ReceitasFeitas from '../Pages/ReceitasFeitas';
import ComidaDetalhes from '../Pages/ComidasDetalhes';
import BebidasDetalhes from '../Pages/BebidasDetalhes';
import ExplorarComidasIngredientes from '../Pages/ExplorarComidasIngredientes';
import ExplorarBebidasIngredientes from '../Pages/ExplorarBebidasIngredientes';
import ExplorarArea from '../Pages/ExplorarArea';
import ProgressoComidas from '../Pages/ProgressoComidas';
import ProgressoBebidas from '../Pages/ProgressoBebidas';
import NotFound from './NotFound';

const Switchs = () => (
  <Switch>
    <Route
      path="/explorar/comidas/ingredientes"
      component={ ExplorarComidasIngredientes }
    />
    <Route
      path="/explorar/bebidas/ingredientes"
      component={ ExplorarBebidasIngredientes }
    />
    <Route path="/explorar/bebidas/area" component={ NotFound } />
    <Route path="/explorar/comidas/area" component={ ExplorarArea } />
    <Route path="/comidas/:id/in-progress" component={ ProgressoComidas } />
    <Route path="/bebidas/:id/in-progress" component={ ProgressoBebidas } />
    <Route path="/comidas/:id" component={ ComidaDetalhes } />
    <Route path="/bebidas/:id" component={ BebidasDetalhes } />
    <Route path="/explorar/comidas" component={ ExplorarComidas } />
    <Route path="/explorar/bebidas" component={ ExplorarBebidas } />
    <Route path="/receitas-feitas" component={ ReceitasFeitas } />
    <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
    <Route path="/perfil" component={ Perfil } />
    <Route path="/explorar" component={ Explorar } />
    <Route path="/comidas" component={ Receitas } />
    <Route path="/bebidas" component={ Bebidas } />
    <Route exact path="/" component={ Login } />
  </Switch>
);

export default Switchs;
