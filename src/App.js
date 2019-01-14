import React, { Component } from 'react';
// import logo from './logo.svg';
import TopNav from './components/TopNav/TopNav';
import StoreFront from './components/StoreFront/StoreFront';
import Products from './components/Products/Products';
import Details from './components/Details/Details';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Checkout from './components/Checkout/Checkout';
import Payment from './components/Payment/Payment';
// import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <TopNav />
        <StoreFront />
        <Products />
        <Details />
        <Cart />
        <Login />
        <Register />
        <Checkout />
        <Payment />
      </div>
    );
  }
}

export default App;
