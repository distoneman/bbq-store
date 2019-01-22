import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './login.scss';
import Button from '@material-ui/core/Button';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }

    async login() {
        const { email, password } = this.state;
        const res = await axios.post('/auth/login', {
            email: email,
            password: password,
        })
        if (res.data.noEmail) {
            alert('Email not found, try again or register')
        }
        if (res.data.wrongPass) {
            alert('Wrong Password')
        }
        if (res.data.loggedIn) {
            alert('You are now logged in')
            this.props.history.goBack()
            // this.props.history.push('/')  //redirect
        }
        // console.log(res.data.userData)
    }


    render() {

        return (
            <div>
                <p className="login-title">
                    Sign In or Create an Account
                </p>
                <div className='login-container'>
                    <div className="login-box">
                        <h3 className="login-box-title">
                            Existing Customer
                        </h3>
                        <p className="login-box-text">
                            If you have an account with us, sign in using your email address.
                        </p>
                        <p className="input-label">
                            Email Address:
                        </p>
                        <input onChange={(e) => this.setState({ email: e.target.value })}
                            type="text" className="input-box" />
                        <p className="input-label">
                            Password:
                        </p>
                        <input onChange={(e) => this.setState({ password: e.target.value })}
                            type="password" className="input-box" />
                        <p>
                            <Button onClick={() => this.login()} variant="outlined" size="small" className='btn-login' >
                                Login
                            </Button>
                        </p>
                    </div>
                    <div className="register-box">
                        <h3 className="login-box-title">
                            New Customers
                        </h3>
                        <p className="login-box-text">
                            By creating an account with our store, you will be able to move through the checkout process faster, store multiple shipping addresses, view and track your orders in your account and more.
                        </p>
                        <Button component={Link} to="/register" variant="outlined" size="small" className='btn-login' >
                            Register
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}