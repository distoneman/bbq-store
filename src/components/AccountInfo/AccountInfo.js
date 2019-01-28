import React, { Component } from 'react';
import './account_info.scss';
import axios from 'axios';

export default class AccountInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: null,
            firstname: '',
            lastname: '',
            email: '',
            orders: []
        }
    }

    async componentDidMount() {
        let user = await axios.get('/auth/getUser');
        if (user.data.loggedIn === true) {
            this.setState({
                user_id: user.data.userData.id,
                firstname: user.data.userData.firstname,
                lastname: user.data.userData.lastname,
                email: user.data.userData.email
            });
            let orders = await axios.get(`/api/allOrders/${this.state.user_id}`)
            this.setState({
                orders: orders.data
            })
        } else {
            this.props.history.push('/login')
        }
        console.log(this.state)
    }

    render() {
        return(
            <div>
                <h1>Coming Soon</h1>
            </div>
        )
    }
}