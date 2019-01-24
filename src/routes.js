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
import AccountInfo from './components/AccountInfo/AccountInfo'

export default (
    <Switch>
        <Route exact path='/' component={StoreFront} />
        <Route path='/products/:catid' component={Products} />
        <Route path='/details/:prodid' component={Details} />
        <Route path='/cart' component={Cart} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/checkout' component={Checkout} />
        <Route path='/recipes' component={Recipes} />
        <Route path='/account' component={AccountInfo} />
    </Switch>
)