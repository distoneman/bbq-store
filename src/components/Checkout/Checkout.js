import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
// import stripe from './stripeKey';
import './checkout.scss';

export default class Checkout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            user: {},
            shipping: 13.95,
            subTotal: 0,
            orderTotal: 0,
            states: []
        }
    }

    async componentDidMount() {
        let user = await axios.get('/auth/getUser');
        if (user.data.loggedIn === true) {
            this.setState({ user: user.data.userData });
        } else {
            this.props.history.push('/login')
        }
        let cart = await axios.get(`/cart/session`).then(res => {
            this.setState({ products: res.data.cart });
        })
        let orderTotal = 0;
        let subTotal = 0;
        subTotal =  this.state.products.map(product => {
            var prod_total = product.prod_price * product.quantity;
            subTotal = Number(subTotal) + Number(prod_total);
            return (
                subTotal
            )
        })
        // console.log(subTotal)
        orderTotal = Number(subTotal) + Number(this.state.shipping);
        console.log(orderTotal)
        this.setState({
            subTotal: subTotal,
            orderTotal: orderTotal
        })
        console.log(this.state)
        let states = await axios.get('/api/states')
        this.setState({ states: states.data })
    }

    onToken =(token) => {
        let convertedAmt = this.state.orderTotal * 100
        token.card = void 0;
        // console.log('token', token);
        axios.post('/api/payment', { token, amount: convertedAmt }).then(response => {
            alert('we are in business')
        })
    };

    render() {
        const pkey = 'pk_test_fFtkj2n4MN1eK8zuyJYHvSl7'
        let stateList = this.state.states.map(state => {
            return (
                <option key={state.state_id} value={state.state_id}>{state.state_name}</option>
            )
        })
        return (
            <div>
                <h1>
                    Checkout
                </h1>
                <div className='checkout-container'>
                    <div className="cust-details">
                        <h2>Customer Details</h2>
                        <p className='input-label'>First Name:</p>
                        <input value={this.state.user.firstname} type="text" className="input-box" />
                        <p className="input-label">Last Name:</p>
                        <input value={this.state.user.lastname} type="text" className="input-box" />
                        <p className="input-label">Email:</p>
                        <input value={this.state.user.email} type="text" className="input-box" />
                        <p className="input-label">Street Address:</p>
                        <input type="text" className="input-box" />
                        <p className="input-label">City:</p>
                        <input type="text" className="city-input-box" />
                        <p className="input-label">State:</p>
                        <select className='state-input-box' name="state" id="state" >
                            <option value=""></option>
                            {stateList}
                        </select>
                        {/* <input type="text" className="state-input-box"/> */}
                        <p className="input-label">Zip:</p>
                        <input type="text" className="zip-input-box" />

                    </div>
                    <div className="order-summary">
                        <h2>Order Summary</h2>
                        <StripeCheckout
                            token={this.onToken}
                            stripeKey={pkey}
                            amount={this.state.orderTotal * 100}
                        />
                    </div>
                </div>
            </div>
        )
    }
}