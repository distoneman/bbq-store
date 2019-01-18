import React, { Component } from 'react';
import './register.css';
import axios from 'axios';

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    }

    async register() {
        const { firstname, lastname, email, password } = this.state;
        const res = await axios.post('/auth/register', { 
            firstname: firstname, 
            lastname: lastname,
            email: email, 
            password: password
        })
        if(res.data.loggedIn){
            alert('You are now registered')
            console.log(res.data.userData);
            this.props.history.push('/')  //redirect
        }
        if(res.data.inUse){
            alert('E-mail already in use try again')
        }
    }

    handleChange = (key, val) => {
        this.setState({
            [key]: val
        });
    };

    render() {
        return(
            <div>
                <div>
                    Create an Account
                </div>
                <p>First Name:</p>
                <input type="text" onChange={(e) => this.handleChange('firstname', e.target.value)} />
                <p>Last Name:</p>
                <input type="text" onChange={(e) => this.handleChange('lastname', e.target.value)} />
                <p>E-Mail:</p>
                <input type="text" onChange={(e) => this.handleChange('email', e.target.value)} />
                <p>Password:</p>
                <input type="text" onChange={(e => this.handleChange('password', e.target.value))} />
                <button onClick={() => this.register()}>Register</button>
            </div>
        )
    }
}
