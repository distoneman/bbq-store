import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { updateCartItems } from './../../ducks/reducer.js';
import StripeCheckout from 'react-stripe-checkout';
import swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import './checkout.scss';

class Checkout extends Component {
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
        orderTotal = Number(subTotal) + Number(this.state.shipping);
        this.setState({
            subTotal: subTotal,
            orderTotal: orderTotal
        })
        let states = await axios.get('/api/states')
        this.setState({ states: states.data })
        // console.log((this.state.orderTotal * 100).toFixed(2))
    }

    onToken = async (token) => {
        const message = `<h1>${this.state.firstname}</h1>
        Thank you for your order.
        <p>
        Your friends at The BBQ Supply Store
        </p>`

        let convertedAmt = this.state.orderTotal * 100
        token.card = void 0;
        let res = await axios.post('/api/payment', {
            token,
            amount: convertedAmt,
            user_id: this.state.user_id,
            html_message: message
        })
        // .then(response => {
        // alert('we are in business')
        this.props.updateCartItems(res.data.length);
        swal.fire({
            type: 'success',
            title: `${this.state.firstname}`,
            text: `Thank You for your payment of ${this.state.orderTotal.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}`,
            confirmButtonText: "Continue Shopping"
        })
        this.props.history.push('/')  //redirect
        // })
    };

    // handleChange(key, value) {
    //     console.log('handleChange')
    // }

    render() {
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
                        <input onChange={(e) => this.setState({ firstname: e.target.value })}
                            value={this.state.firstname} type="text" className="input-box" />
                        <p className="input-label">Last Name:</p>
                        <input onChange={(e) => this.setState({ lastname: e.target.value })}
                            value={this.state.lastname} type="text" className="input-box" />
                        <p className="input-label">Email:</p>
                        <input onChange={(e) => this.setState({ email: e.target.value })}
                            value={this.state.email} type="text" className="input-box" />
                        <p className="input-label">Street Address:</p>
                        <input onChange={(e) => this.setState({ address: e.target.value })}
                            type="text" className="input-box" />
                        <p className="input-label">City:</p>
                        <input onChange={(e) => this.setState({ city: e.target.value })}
                            type="text" className="city-input-box" />
                        <p className="input-label">State:</p>
                        <select onChange={(e) => this.setState({ state: e.target.value })}
                            className='state-input-box' name="state" id="state" >
                            <option value=""></option>
                            {stateList}
                        </select>
                        <p className="input-label">Zip:</p>
                        <input onChange={(e) => this.setState({ zip: e.target.value })}
                            type="text" className="zip-input-box" />

                    </div>
                    <div className="order-summary-container">
                        <h2>Order Summary</h2>
                        <table className='order-summary-table'>
                            <tbody>

                                <tr>
                                    <td className='summary-data'>Subtotal:</td>
                                    <td className='summary-data'>${this.state.subTotal.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className='summary-data'>Shipping:</td>
                                    <td className='summary-data'>${this.state.shipping}</td>
                                </tr>
                                <tr>
                                    <td className='summary-data'>Order Total:</td>
                                    <td className='summary-data'>${this.state.orderTotal.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
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

function mapStateToProps(rstate) {
    const { numItems } = rstate;
    return {
        numItems
    }
}

export default connect(mapStateToProps,
    {
        updateCartItems
    })(Checkout); 