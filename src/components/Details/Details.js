import React, { Component } from 'react';
import './details.scss'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { updateCartItems } from './../../ducks/reducer.js'


class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {},
            quantity: 1,
        }
    }

    async componentDidMount() {
        window.scrollTo(0, 0)
        const { prodid } = this.props.match.params;
        let res = await axios.get(`/api/product/${prodid}`).then(res => {
            this.setState({ product: res.data[0] });
        })
        // console.log(this.state.product)
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

    async addToCart() {
        let quantity = this.state.quantity;
        let prod_id = this.state.product.prod_id;
        let prod_name = this.state.product.prod_name;
        let prod_price = this.state.product.prod_price;
        let cart = await axios.post('/cart/addItem', {
            prod_id: prod_id,
            quantity: quantity,
            prod_name: prod_name,
            prod_price: prod_price
        })
        // console.log(cart)
        this.props.updateCartItems(cart.data.length);
        // console.log(cart)
    }


    render() {
        const { prod_name, prod_desc, prod_price, prod_size, prod_image, prod_category_id, category_name } = this.state.product;
        if (prod_price) var price = prod_price.toLocaleString('us-US', { style: 'currency', currency: 'USD' })
        return (
            <div>
                <div className='bread-container'>
                    <Link to='/' className='bread-link'>
                        <span className='bread'>Home</span>
                    </Link>
                    <span className="bread"> > </span>
                    <Link to={`/products/${prod_category_id}`} className='bread-link'>
                        <span className="bread">{category_name}</span>
                    </Link>
                    <span className="bread"> > </span>
                    <span className="bread">{prod_name}</span>
                </div>
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

function mapStateToProps(rstate) {
    const { numItems } = rstate;
    return {
        numItems
    }
}

export default connect(mapStateToProps,
    {
        updateCartItems
    })(Details); 