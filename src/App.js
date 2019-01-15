import React, { Component } from 'react';
import routes from './routes';
// import logo from './logo.svg';
import TopNav from './components/TopNav/TopNav';
import StoreFront from './components/StoreFront/StoreFront';
// import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <TopNav />
        {/* 
        <StoreFront />
        <Products />
        <Details />
        <Cart />
        <Login />
        <Register />
        <Checkout />
        <Payment /> */}
        {routes}
      </div>
    );
  }
}

export default App;
