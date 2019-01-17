import React, { Component } from 'react';
import './details.scss'
import axios from 'axios';

export default class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: []
        }
    }

    componentDidMount() {
        const {prodid} = this.props.match.params;
        axios.get(`/api/product/${prodid}`).then(res => {
            this.setState({product: res.data[0]});
        })
    }

    render() {
        let prod = this.state.product.prod_name
        console.log(this.state.product.prod_name)
        console.log(prod)
        // console.log(this.state.product[0].prod_id)
        
        return(
            <div>
                {prod}
                Details
            </div>
        )
    }
}