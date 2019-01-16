import React, { Component } from 'react';
import axios from 'axios';
import './products.scss'
import { withRouter } from 'react-router-dom';
import Prod_display from './../Prod_display/Prod_display.js';

class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        const { catid } = this.props.match.params;
        console.log(catid);
        axios.get(`/api/products/cat/${catid}`).then(res => {
            this.setState({ products: res.data });
        });
    }


    render() {
        // console.log(this.state.products)
        let productList = this.state.products.map(product => {
            const price = product.prod_price.toLocaleString('us-US', {style: 'currency', currency: 'USD'})
            return (
                    <Prod_display
                        key={product.prod_id}
                        id={product.prod_id}
                        prod_name={product.prod_name}
                        prod_price={price}
                        prod_image={product.prod_image}
                    />
            )
        })
        return (
            <div>
                {/* Products */}
                <div className='container'>
                    {productList}
                </div>
            </div>
        )
    }
}

export default withRouter(Products)

