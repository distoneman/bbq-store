import React, { Component } from 'react';
import './storeFront.scss'
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
                        <p />
                        Smokers
                    </div>
                    <div className='categories'>
                        <img className='img-cat' src={grill} alt="" />
                        <p />
                        Grills
                    </div>
                    <div className='categories'>
                        <img className='img-cat' src={rubs} alt="" />
                        <p />
                        Rubs
                    </div>
                    <div className='categories'>
                        <img className='img-cat' src={sauce} alt="" />
                        <p />
                        Sauces
                    </div>
                </div>
            </div>
        )
    }
}