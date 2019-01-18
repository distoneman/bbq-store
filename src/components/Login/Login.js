import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './login.scss';
import Button from '@material-ui/core/Button';

export default class Login extends Component {
    constructor(props) {
        super(props)
    }


    render() {

        return (
            <div>
                <p className="login-title">
                    Sign In or Create and Account
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
                        <input type="text" className="input-box" />
                        <p className="input-label">
                            Password:
                        </p>
                        <input type="password" className="input-box" />
                        <p>
                            <Button variant="outlined" size="small" className='btn-login' >
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
                        <Button component={ Link } to="/register" variant="outlined" size="small" className='btn-login' >
                            Register
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}