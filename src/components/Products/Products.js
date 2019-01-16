import React, { Component } from 'react';
import axios from 'axios';
import './products.scss'
import {withRouter} from 'react-router-dom';

class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        const {catid} = this.props.match.params;
        console.log(catid);
        axios.get(`/api/products/cat/${catid}`).then(res => {
            this.setState({ products: res.data });
        });
    }
    
    
    render() {
        console.log(this.state.products)
        return (
            <div className='test-container'>
                <div className='test'></div>
                <div className='test'></div>
                <div className='test'></div>
                <div className='test'></div>
                <div className='test'></div>
                Products
            </div>
        )
    }
}

export default withRouter(Products)