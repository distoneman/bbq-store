import React, { Component } from 'react';
import './details.scss'
import axios from 'axios';

export default class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: [],
            quantity: 1
        }
    }

    componentDidMount() {
        const { prodid } = this.props.match.params;
        axios.get(`/api/product/${prodid}`).then(res => {
            this.setState({ product: res.data[0] });
        })
    }

    render() {
        // let prod = this.state.product.prod_name
        const { prod_name, prod_desc, prod_price, prod_size, prod_image } = this.state.product;
        // const price = prod_price.toLocaleString('us-US', {style: 'currency', currency: 'USD'});
        // console.log(prod_price)
        // console.log(this.state.product.prod_price.toLocaleString('us-US', {style: 'currency', currency: 'USD'}))
        // console.log(this.state.product)

        // console.log(prod)
        // console.log(this.state.product[0].prod_id)

        return (
            <div>
                <div className='product-container'>
                    <div>
                        <img src={prod_image} className='image' alt={prod_name} />
                    </div>
                    <div>
                        <h2 className='prod-name'>
                            {prod_name}
                        </h2>
                        <p className="prod-size">
                            Size: {prod_size}
                        </p>
                        <p className="prod-price">
                            Price: ${prod_price}
                        </p>
                        <p>
                            <span>
                                Quantity: &nbsp;
                                <button>-</button>
                                <input type="text"/>
                                <button>+</button>
                            </span>
                        </p>
                    </div>
                </div>
                <div className="prod-desc">
                        <h3>
                            Product Description:<br/>
                        </h3>
                        {prod_desc}
                </div>
            </div>
        )
    }
}