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
            orderTotal: 0
        }
    }

    async componentDidMount() {
        let user = await axios.get('/auth/getUser');
        console.log(user.data)
        if (user.data.loggedIn === true) {
            this.setState({ user: user.data.userData });
            // console.log(this.state.user)
        } else {
            this.props.history.push('/login')
            // this.props.history.goBack()
            // alert('Not Logged In')
        }
        let cart = await axios.get(`/cart/session`).then(res => {
            this.setState({ products: res.data.cart });
            console.log(this.state.products)
        })
        var orderTotal = 0;
        let subTotal = 0;
        subTotal = this.state.products.map(product => {
            var prod_total = product.prod_price * product.quantity;
            subTotal = Number(subTotal) + Number(prod_total);
            return (
                subTotal
            )
        })
        // console.log(subTotal)
        orderTotal = Number(subTotal) + this.state.shipping;
        // console.log(orderTotal)
        this.setState({
            subTotal: subTotal,
            orderTotal: orderTotal
        })
        console.log(this.state)
    }

    onToken = (token) => {
        token.card = void 0;
        console.log('token', token);
        axios.post('/api/payment', { token, amount: 999 }).then(response => {
            alert('we are in business')
        })
    };

    render() {
        const pkey = 'pk_test_fFtkj2n4MN1eK8zuyJYHvSl7'


        return (
            <div>
                <h1>
                    Checkout
                </h1>
                <div className='checkout-container'>
                    <div className="cust-details">
                    </div>
                    <div className="order-summary">
                    </div>
                    <StripeCheckout
                        token={this.onToken}
                        stripeKey={pkey}
                        amount={2997}
                    />
                </div>
            </div>
        )
    }
}