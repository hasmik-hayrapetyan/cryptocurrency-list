import React from 'react';
import { Route, Switch } from "react-router-dom";
import CryptoList from '../../CryptoList';
import Details from '../../Common/Details';
import NotFound from '../../NotFound';
import TodoList from '../../TodoList';

const Routes = () => {
    return(
        <Switch>
            <Route exact path="/" component={CryptoList} />
            <Route exact path="/currency/:id" component={Details} />
            <Route exact path="/posts" component={TodoList} />
            <Route component={NotFound} />
        </Switch>
    )
};

export default Routes;