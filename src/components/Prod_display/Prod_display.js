import React from 'react';
import './Prod_display.scss'

export default function Prod_display(props) {
    return (
        <div key={props.key} className='product'>
            <img className='image' src={props.prod_image} alt={props.prod_name} />
            <p className='prod-title'>
                {props.prod_name}
            </p>
            <p className='prod-price'>
            
                {props.prod_price}
            </p>
        </div>
    )
}