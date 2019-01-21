import React, { Component } from 'react';
import axios from 'axios';
import './products.scss'
import { withRouter } from 'react-router-dom';
import ProdDisplay from './../ProdDisplay/ProdDisplay.js';

class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        const { catid } = this.props.match.params;
        // console.log(catid);
        axios.get(`/api/products/cat/${catid}`).then(res => {
            this.setState({ products: res.data });
        });
    }

    componentDidUpdate(prevProp){
        const { catid } = this.props.match.params;
        if(prevProp.match.params.catid !== this.props.match.params.catid)
        {
            axios.get(`/api/products/cat/${catid}`).then(res => {
                this.setState({ products: res.data });
            });
        }
    }

    render() {
        // console.log(this.state.products)
        let productList = this.state.products.map(product => {
            const price = product.prod_price.toLocaleString('us-US', {style: 'currency', currency: 'USD'})
            const prodUrl = `/details/${product.prod_id}`
            // console.log(prodUrl);
            return (
                    <ProdDisplay
                        key={product.prod_id}
                        id={product.prod_id}
                        prod_name={product.prod_name}
                        prod_price={price}
                        prod_image={product.prod_image}
                        prod_url = {prodUrl}
                        update_quantity={this.update_quantity}
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

