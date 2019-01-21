import React, { Component } from 'react';
import axios from 'axios';
import './cart.scss';
import CartDisplay from './../CartDisplay/CartDisplay';

export default class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
        this.updateQuantity = this.updateQuantity.bind(this);
        this.removeProduct = this.removeProduct.bind(this);

    }

    async componentDidMount() {
        let res = await axios.get(`/cart/session`).then(res => {
            // console.log(res.data.cart)
            // console.log(res.data.user)
            this.setState({ products: res.data.cart });

            // console.log(this.state.products)
        })
    }

    async updateQuantity(operator, id, quantity) {
        if (operator === 'minus' & quantity > 1) {
            quantity = quantity - 1;
        } else if (operator === 'add') {
            quantity++
        }
        let res = await axios.put('/cart/updateQty', {
            prod_id: id,
            quantity: quantity
        })
        this.setState({ products: res.data });
    }

    async removeProduct(id) {
        console.log('remove product')
        let res = await axios.delete(`/cart/removeProduct/${id}`)
        this.setState({ products: res.data })
        console.log(this.state.products)
    }

    render() {
        var cartDisplay;
        var subTotal = 0;
        if (this.state.products) {
            cartDisplay = this.state.products.map(product => {
                var prod_total = product.prod_price * product.quantity;
                subTotal = subTotal + prod_total;
                prod_total = prod_total.toLocaleString('us-US', { style: 'currency', currency: 'USD' });
                var price = product.prod_price.toLocaleString('us-US', { style: 'currency', currency: 'USD' });
                return (
                    <CartDisplay
                        key={product.prod_id}
                        id={product.prod_id}
                        name={product.prod_name}
                        price={price}
                        quantity={product.quantity}
                        total={prod_total}
                        updateQuantity={this.updateQuantity}
                        removeProduct={this.removeProduct}
                    />
                )
            })
        }
        return (
            <div className='container'>
                <p>
                </p>
                {this.state.products && this.state.products != 0 ? (
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
                ) : <h1>Your cart is currently empty</h1>
                }
            </div>
        )
    }
}