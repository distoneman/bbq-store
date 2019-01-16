import React from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
import './top_nav.css'
import bbqBeef from './../../images/barbecue-bbq-beef.jpg'

export default function TopNav(props) {
    return (
        <div>
            <div className='top-bar'>
                <div className="top-element">Call 555-555-5555</div>
                <Link to='/account' className='top-element'>
                    <div>My Account</div>
                </Link>
                <Link to='/login' className='top-element'>
                    <div>Sign In or Register</div>
                </Link>
            </div>
            <div>
                <div className='logo'>
                    The BBQ Supply Store
                </div>
                <ul className='main-nav'>
                    <Link to='/' className='main-nav-element'>
                        <li>Home</li>
                    </Link>
                    <Link to='/products' className='main-nav-element'>
                        <li>Shop

                        <ul className='shop-sub-nav'>
                                <Link to='./cart'>
                                    <li className='sub-nav-element'>Smokers</li>
                                </Link>
                                <li className='sub-nav-element'>Grills</li>
                                <li className='sub-nav-element'>Rubs</li>
                                <li className='sub-nav-element'>Sauces</li>
                                {/* <div className='sub-nav-element'>Accessories</div> */}
                            </ul>
                        </li>
                    </Link>
                    <Link to='/recipes' className='main-nav-element'>
                        <li>Recipes</li>
                    </Link>
                    <Link to='/contact' className='main-nav-element'>
                        <li>Contact</li>
                    </Link>
                    <Link to='/cart' className='main-nav-element'>
                        <li>Cart</li>
                    </Link>
                </ul>
            </div>
            <hr />
            <ul className='shop-sub-nav'>
                <li className='sub-nav-element'>Smokers</li>
                <li className='sub-nav-element'>Grills</li>
                <li className='sub-nav-element'>Rubs</li>
                <li className='sub-nav-element'>Sauces</li>
                {/* <div className='sub-nav-element'>Accessories</div> */}
            </ul>
            {/* <div className='pic-container'>
                <img className='home-pic' src={bbqBeef} alt="barbecue meat"/>
            </div> */}
        </div>
    )
}