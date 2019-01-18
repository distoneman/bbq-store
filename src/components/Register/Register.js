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

            // const {firstname, lastname, email} = res.data.userData;
            console.log(firstname)
            const message = `<h1>Welcome ${firstname} to The BBQ Store</h1>
                This confirms your registration to The BBQ Store with the
                email address of ${email}.
                <p>
                Thank you for registering.
                </p>`
            const res = axios.post('/mail/send', {
                email: email,
                firstname: firstname,
                subject: `You're now registered at The BBQ Store`,
                html_message: message
            })
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
