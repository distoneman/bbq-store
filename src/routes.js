import React from 'react';
import { Switch, Route } from 'react-router-dom';
import StoreFront from './components/StoreFront/StoreFront';
import Products from './components/Products/Products';
import Details from './components/Details/Details';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Checkout from './components/Checkout/Checkout';
import Recipes from './components/Recipes/Recipes';
import Confirmation from './components/Confirmation/Confirmation';

export default (
    <Switch>
        <Route exact path='/' component={StoreFront} />
        <Route path='/products' component={Products} />
        <Route path='/details' component={Details} />
        <Route path='/cart' component={Cart} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/checkout' component={Checkout} />
        <Route path='/confirmation' component={Confirmation} />
        <Route path='/recipes' component={Recipes} />
    </Switch>
)