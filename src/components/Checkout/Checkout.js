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
            // user: {},
            shipping: 13.95,
            subTotal: 0,
            orderTotal: 0,
            states: [],
            firstname: '',
            address: '',
            city: '',
            state: '',
            zip: ''
        }
    }

    async componentDidMount() {
        let user = await axios.get('/auth/getUser');
        if (user.data.loggedIn === true) {
            this.setState({ 
                user_id: user.data.userData.id,
                firstname: user.data.userData.firstname,
                lastname: user.data.userData.lastname,
                email: user.data.userData.email
             });
        } else {
            this.props.history.push('/login')
        }
        let cart = await axios.get(`/cart/session`).then(res => {
            this.setState({ products: res.data.cart });
        })
        let orderTotal = 0;
        let subTotal = 0;
        // let prod_total = 0;

        this.state.products.forEach(product => {
            let prod_total = product.prod_price * product.quantity;
            subTotal += prod_total;
        })
        // subTotal =  this.state.products.map(product => {
        //     prod_total = product.prod_price * product.quantity;
        //     subTotal = Number(subTotal) + Number(prod_total);
        //     return (
        //         subTotal
        //     )
        // })
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

    onToken = (token) => {
        let convertedAmt = this.state.orderTotal * 100
        token.card = void 0;
        // console.log('token', token);
        // console.log(this.state.user)
        axios.post('/api/payment', {
            token,
            amount: convertedAmt,
            user_id: this.state.user.id
        }).then(response => {
            alert('we are in business')
        })
    };

    handleChange(key, value) {
        console.log('handleChange')
    }

    render() {
        console.log(this.state)
        const pkey = 'pk_test_fFtkj2n4MN1eK8zuyJYHvSl7'
        let stateList = this.state.states.map(state => {
            return (
                <option key={state.state_id} value={state.state_id}>{state.state_name}</option>
            )
        })
        return (
            <div>
                <h1 className='checkout-header'>
                    Checkout
                </h1>
                <div className='checkout-container'>
                    <div className="cust-details">
                        <h2>Customer Details</h2>
                        <p className='input-label'>First Name:</p>
                        <input onChange={(e) => this.setState({firstname: e.target.value})}
                            value={this.state.firstname} type="text" className="input-box" />
                        <p className="input-label">Last Name:</p>
                        <input onChange={(e) => this.setState({lastname: e.target.value})}
                            value={this.state.lastname} type="text" className="input-box" />
                        <p className="input-label">Email:</p>
                        <input onChange={(e) => this.setState({email: e.target.value})}
                            value={this.state.email} type="text" className="input-box" />
                        <p className="input-label">Street Address:</p>
                        <input onChange={(e) => this.setState({address: e.target.value})}
                            type="text" className="input-box" />
                        <p className="input-label">City:</p>
                        <input onChange={(e) => this.setState({city: e.target.value})}
                            type="text" className="city-input-box" />
                        <p className="input-label">State:</p>
                        <select onChange={(e) => this.setState({state: e.target.value})}
                            className='state-input-box' name="state" id="state" >
                            <option value=""></option>
                            {stateList}
                        </select>
                        <p className="input-label">Zip:</p>
                        <input onChange={(e) => this.setState({zip: e.target.value})}
                            type="text" className="zip-input-box" />

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