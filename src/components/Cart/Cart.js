import React, { Component } from 'react';
import axios from 'axios';
import { FaRegTrashAlt } from 'react-icons/fa';
import './cart.scss'

export default class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }

    async componentDidMount() {
        let res = await axios.get(`/cart/session`).then(res => {
            console.log(res.data.cart)
            console.log(res.data.user)
            this.setState({ products: res.data.cart });

            console.log(this.state.products)
        })
    }

    render() {
        var cartDisplay;
        var subTotal = 0;
        if (this.state.products) {
            cartDisplay = this.state.products.map(product => {
                var prod_total = product.prod_price * product.quantity;
                subTotal = subTotal + prod_total;
                prod_total = prod_total.toLocaleString('us-US', { style: 'currency', currency: 'USD' });
                var price = product.prod_price.toLocaleString('us-US', { style: 'currency', currency: 'USD'});
                return (
                    <tr key={product.prod_id}>
                        <td className='trash'><FaRegTrashAlt /></td>
                        <td>{product.prod_name}</td>
                        <td>{price}</td>
                        <td>{product.quantity}</td>
                        <td>{prod_total}</td>
                    </tr>
                )
            })
        } else {
            cartDisplay = <p>Your cart is currently empty</p>
        }
        return (
            <div className='container'>
                <p>
                </p>
                <table className='prod-table'>
                    <thead>
                        <tr>
                            <td></td>
                            <td>Products</td>
                            <td>Price</td>
                            <td className='tc-quantity'>Quantity</td>
                            <td>Total</td>
                        </tr>
                    </thead>
                    <tbody>
                        {cartDisplay}
                    </tbody>
                </table>
            </div>
        )
    }
}