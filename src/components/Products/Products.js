import React, { Component } from 'react';
import axios from 'axios';
import './products.scss'
import { withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';
import ProdDisplay from './../ProdDisplay/ProdDisplay.js';

class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            category: ''
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        const { catid } = this.props.match.params;
        // console.log(catid);
        axios.get(`/api/products/cat/${catid}`).then(res => {
            this.setState({ products: res.data });
            this.setState({category: res.data[0].category_name})
        });
    }

    componentDidUpdate(prevProp) {
        const { catid } = this.props.match.params;
        if (prevProp.match.params.catid !== this.props.match.params.catid) {
            axios.get(`/api/products/cat/${catid}`).then(res => {
                this.setState({ products: res.data });
            });
        }
    }

    render() {
        // console.log(this.state.products)
        let productList = this.state.products.map(product => {
            const price = product.prod_price.toLocaleString('us-US', { style: 'currency', currency: 'USD' })
            const prodUrl = `/details/${product.prod_id}`
            console.log(prodUrl);
            return (
                <ProdDisplay
                    key={product.prod_id}
                    id={product.prod_id}
                    prod_name={product.prod_name}
                    prod_price={price}
                    prod_image={product.prod_image}
                    prod_url={prodUrl}
                    update_quantity={this.update_quantity}
                />
            )
        })
        return (
            <div>
                <div className='bread-container'>
                    <Link to='/' className='bread-link'>
                        <span className='bread'>Home</span>
                    </Link>
                    <span className="bread"> > </span>
                        <span className="bread">{this.state.category}</span>
                </div>

                {/* Products */}
                <div className='container'>
                    {productList}
                </div>
            </div>
        )
    }
}

export default withRouter(Products)

