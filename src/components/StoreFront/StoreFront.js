import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './storeFront.scss';
import grill from './../../images/classic-red-cart-poly_03_1-450x450.jpg';
import smoker from './../../images/traegerjr-330x330.jpg';
import rubs from './../../images/Honey_Hog.jpg';
import sauce from './../../images/Blues_Hog_Original_sauce.jpg';
import headImage from './../../images/headImage.jpg'

class StoreFront extends Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        console.log(this.props.cartItems)
        return (
            <div>
                <div>
                    <img className='img-header' src={headImage} alt="steak" />
                </div>
                <div className='container'>
                    <div className='categories'>
                        <Link to='/products/2' className='prod-links'>
                            <img className='img-cat' src={smoker} alt="" />
                            <p className='cat-text'>
                                Smokers
                        </p>
                        </Link>
                    </div>
                    <div>
                        <Link to='/products/1' className='prod-links'>
                            <img className='img-cat' src={grill} alt="" />
                            <p className='cat-text'>
                                Grills
                        </p>
                        </Link>
                    </div>
                    <div>
                        <Link to='/products/3' className='prod-links'>
                            <img className='img-cat' src={rubs} alt="" />
                            <p className='cat-text'>
                                Rubs
                            </p>
                        </Link>
                    </div>
                    <div>
                        <Link to='./products/4' className='prod-links'>
                            <img className='img-cat' src={sauce} alt="" />
                            <p className='cat-text'>
                                Sauces
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ cartItems }) {
    return {
        cartItems
    }
}

export default connect(mapStateToProps)(StoreFront)
