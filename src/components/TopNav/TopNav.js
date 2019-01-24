import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './top_nav.scss';
import Badge from '@material-ui/core/Badge';
import logo from './../../images/logo2.png';

class TopNav extends Component {

    render() {
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
                <div className='nav'>
                    <div className='logo'>
                        <img className='logo-image' src={logo} alt="The BBQ Supply Store" />
                        {/* The BBQ Supply Store */}
                    </div>
                    <div>
                        <ul className='main-nav'>
                            <Link to='/' className='main-nav-element'>
                                <li>Home</li>
                            </Link>
                            {/* <Link to='/products' className='dropdown'> */}
                            <li className='dropdown'>Shop
                        <ul className='shop-sub-nav'>
                                    <Link to='/products/2' className='links'>
                                        <li className='sub-nav-element'>Smokers</li>
                                    </Link>
                                    <Link to='/products/1' className='links'>
                                        <li className='sub-nav-element'>Grills</li>
                                    </Link>
                                    <Link to='/products/3' className='links'>
                                        <li className='sub-nav-element'>Rubs</li>
                                    </Link>
                                    <Link to='/products/4' className='links'>
                                        <li className='sub-nav-element'>Sauces</li>
                                    </Link>
                                    {/* <div className='sub-nav-element'>Accessories</div> */}
                                </ul>
                            </li>
                            {/* </Link> */}
                            <Link to='/recipes' className='main-nav-element'>
                                <li>Recipes</li>
                            </Link>
                            <Link to='/contact' className='main-nav-element'>
                                <li>Contact</li>
                            </Link>
                            <Link to='/cart' className='main-nav-element'>
                                <Badge badgeContent={this.props.cartItems} color="secondary">
                                    <li>Cart</li>
                                </Badge>
                            </Link>
                        </ul>
                    </div>
                </div>
                <hr />
            </div>
        )
    }
}

function mapStateToProps({ cartItems }) {
    return {
        cartItems
    }
}

export default connect(mapStateToProps)(TopNav)
