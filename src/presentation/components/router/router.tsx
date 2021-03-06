import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../../pages/login/login";
import "../../styles/global.scss";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exat component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
