import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RoutesMapping from "./mapping";

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                {RoutesMapping.map(({path, component, exact}, key) =>
                        <Route path={path} key={key} component={component} exact={exact} />)}
            </Switch>
        </BrowserRouter>
    )
};

export default Router;
