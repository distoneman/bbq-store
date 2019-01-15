import React from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
import './top_nav.css'

export default function TopNav(props) {
    return (
        <div>
            <div className='top-bar'>
                <div className="top-element">Call 555-555-5555</div>
                <div className="top-element">My Account</div>
                <div className="top-element">Sign In or Register</div>
            </div>
            <div className='main-nav'>
                <div className='logo'>
                    The BBQ Supply Store
                </div>
                <Link to='/' className='main-nav-element'>
                    <div>Home</div>
                </Link>
                <Link to='/products' className='main-nav-element'>
                    <div>Shop</div>
                </Link>
                <div className='main-nav-element'>Recipes</div>
                <div className='main-nav-element'>Contact</div>
                <div className='main-nav-element'>Cart</div>
            </div>
            <hr />
        </div>
    )
}