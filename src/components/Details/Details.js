import React, { Component } from 'react';
import './details.scss'
import axios from 'axios';
import Button from '@material-ui/core/Button';

export default class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {},
            quantity: 1,
        }
    }

    async componentDidMount() {
        const { prodid } = this.props.match.params;
        let res = await axios.get(`/api/product/${prodid}`).then(res => {
            this.setState({ product: res.data[0] });
        })
    }

    updateQuantity(operator) {
        let qty = this.state.quantity;
        if (operator === 'minus' & this.state.quantity > 1) {
            qty = qty - 1;
            this.setState({ quantity: qty })
        } else if (operator === 'add') {
            qty++
            this.setState({ quantity: qty })
        }
    }

    addToCart() {
        console.log('Add to Cart Hit');
        let quantity = this.state.quantity;
        let prod_id = this.state.product.prod_id;
        console.log(quantity);
        console.log(prod_id);
    }


    render() {
        const { prod_name, prod_desc, prod_price, prod_size, prod_image } = this.state.product;
        if (prod_price) var price = prod_price.toLocaleString('us-US', { style: 'currency', currency: 'USD' })
        console.log(this.state)
        return (
            <div>
                <div className='product-container'>
                    <div>
                        <img src={prod_image} className='image' alt={prod_name} />
                    </div>
                    <div className='details-container'>
                        <h2 className='prod-name'>
                            {prod_name}
                        </h2>
                        <p className="prod-size">
                            Size: {prod_size}
                        </p>
                        <p className="prod-price">
                            Price: {price}
                        </p>
                        <p>
                            Quantity: &nbsp;
                            <span className='qty-span'>
                                <button onClick={(e) => this.updateQuantity('minus')}
                                    className='btn-quantity'>-</button>
                                <input className='input-quantity' type="text" value={this.state.quantity} readOnly />
                                <button onClick={(e) => this.updateQuantity('add')}
                                    className='btn-quantity'>+</button>
                            </span>
                        </p>
                        <p>
                            <Button onClick={() => this.addToCart()} variant="outlined" size="small" className='btn-login' >
                                Add to Cart
                            </Button>
                        </p>
                    </div>
                </div>
                <div className="prod-desc">
                    <h3>
                        Product Description:<br />
                    </h3>
                    {prod_desc}
                </div>
            </div>
        )
    }
}