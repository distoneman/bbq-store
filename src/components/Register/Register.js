import React, { Component } from 'react';
import './register.scss';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { isNullOrUndefined } from 'util';
import swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

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
        if (isNullOrUndefined(firstname) ||
            isNullOrUndefined(lastname) ||
            isNullOrUndefined(email) ||
            isNullOrUndefined(password)) {
            // alert('Complete all fields')
            await swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'You must complete all of the required fields',
                confirmButtonText: "Try Again"
                // footer: '<a href>Why do I have this issue?</a>'
              })
        } else {
            const res = await axios.post('/auth/register', {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password
            })
            if (res.data.loggedIn) {
                // alert('You are now registered')
                await swal.fire({
                    type: 'success',
                    title: `Welcome ${firstname}`,
                    text: "Your are now registered",
                    confirmButtonText: "Go Shopping"
                  })
                    // const {firstname, lastname, email} = res.data.userData;
                // console.log(firstname)
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
                this.props.history.push('/cart')  //redirect
            }
            if (res.data.inUse) {
                // alert('E-mail already in use try again')
                await swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Email already in use try logging in',
                    confirmButtonText: "Continue"
                  })
                  this.props.history.push('/login')  //redirect
            }
        }
    }

    handleChange = (key, val) => {
        this.setState({
            [key]: val
        });
    };

    render() {
        return (
            <div className='register-container'>
                <div className='register-title'>
                    Create an Account
                </div>
                <div className='required'>*Required Fields</div>
                <p className='input-label'>
                    First Name:<em>*</em>
                </p>
                <input type="text" className='input-box'
                    onChange={(e) => this.handleChange('firstname', e.target.value)} />
                <p className='input-label'>
                    Last Name:<em>*</em>
                </p>
                <input type="text" className='input-box'
                    onChange={(e) => this.handleChange('lastname', e.target.value)} />
                <p className='input-label'>
                    E-Mail:<em>*</em>
                </p>
                <input type="text" className='input-box'
                    onChange={(e) => this.handleChange('email', e.target.value)} />
                <p className='input-label'>
                    Password:<em>*</em>
                </p>
                <input type="text" className='input-box' type='password'
                    onChange={(e => this.handleChange('password', e.target.value))} />
                <p>
                    <Button variant="outlined" size="small"
                        onClick={() => this.register()}>
                        Register
                    </Button>
                </p>
            </div>
        )
    }
}
