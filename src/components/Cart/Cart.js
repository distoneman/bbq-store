import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCartItems } from './../../ducks/reducer.js'
import './cart.scss';
import CartDisplay from './../CartDisplay/CartDisplay';
import Button from '@material-ui/core/Button';

class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
        this.updateQuantity = this.updateQuantity.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
        this.updateOrderTotal = this.updateOrderTotal(this);

    }

    async componentDidMount() {
        let res = await axios.get(`/cart/session`).then(res => {
            this.setState({ products: res.data.cart });
        })
        this.props.updateCartItems(this.state.products.length)
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
        // console.log('remove product')
        let res = await axios.delete(`/cart/removeProduct/${id}`)
        this.setState({ products: res.data })
        console.log(this.state.products)
        this.props.updateCartItems(res.data.length)
    }

    async updateOrderTotal(orderTotal) {
        // console.log('updateOrderTotal')
    }

    render() {
        var cartDisplay;
        var subTotal = 0;
        var orderTotal = 0;
        // console.log(this.state.products.length)
        if (this.state.products && this.state.products.length !== 0) {
            cartDisplay = this.state.products.map(product => {
                var prod_total = product.prod_price * product.quantity;
                // prod_total = prod_total.toFixed(2);
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
            orderTotal = subTotal + 13.95;
            orderTotal = orderTotal.toLocaleString('us-US', { style: 'currency', currency: 'USD' });

        }
        return (
            <div className='container'>
                {this.state.products && this.state.products.length !== 0 ? (
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
                            <tr>
                                <td className='td-hidden'></td>
                                <td className='td-hidden'></td>
                                <td className='td-hidden'></td>
                                <td>Subtotal: </td>
                                <td>{subTotal.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</td>
                            </tr>
                            <tr>
                                <td className='td-hidden'></td>
                                <td className='td-hidden'></td>
                                <td className='td-hidden'></td>
                                <td>Shipping:</td>
                                <td>$13.95</td>
                            </tr>
                            <tr>
                                <td className='td-hidden'></td>
                                <td className='td-hidden'></td>
                                <td className='td-hidden'></td>
                                <td>Total:</td>
                                <td>{orderTotal}</td>
                            </tr>
                            <tr>
                                <td className="td-hidden"></td>
                                <td className="td-hidden"></td>
                                <td className="td-hidden"></td>
                                <td className="td-hidden" colSpan="2">
                                    <Button component={Link} to="/checkout" variant="outlined" size="small" className='btn-login' >
                                        Proceed to Checkout
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ) : <h1>Your cart is currently empty</h1>
                }
            </div>
        )
    }
}

function mapStateToProps({ numItems }) {
    return {
        numItems
    }
}

export default connect(mapStateToProps,
    {
        updateCartItems
    })(Cart);