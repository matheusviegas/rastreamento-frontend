import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Main from "./pages/Main";
import Pacote from "./pages/Pacote";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/pacote/:codigo" component={Pacote} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
