import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Cardapio from "./pages/Cardapio";
import Pedidos from "./pages/Pedidos";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Cadastro} />
      <Route exact path="/Menu" component={Menu} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/Cardapio" component={Cardapio} />
      <Route exact path="/Cadastro" component={Cadastro} />
      <Route exact path="/Pedidos" component={Pedidos} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
