import React, { Component } from 'react';
import './storeFront.scss'
import { Link } from 'react-router-dom';
import grill from './../../images/classic-red-cart-poly_03_1-450x450.jpg';
import smoker from './../../images/traegerjr-330x330.jpg';
import rubs from './../../images/Honey_Hog.jpg';
import sauce from './../../images/Blues_Hog_Original_sauce.jpg';

export default class StoreFront extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='categories'>
                        <img className='img-cat' src={smoker} alt="" />
                        <p className='cat-text'>
                            Smokers
                        </p>
                    </div>
                    <div>
                        <img className='img-cat' src={grill} alt="" />
                        <p className='cat-text'>
                            Grills
                        </p>
                    </div>
                    <div>
                        <Link to='/products/3' className='links'>
                            <img className='img-cat' src={rubs} alt="" />
                            <p className='cat-text'>
                                Rubs
                            </p>
                        </Link>
                    </div>
                    <div className='categories'>
                        <img className='img-cat' src={sauce} alt="" />
                        <p className='cat-text'>
                            Sauces
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}