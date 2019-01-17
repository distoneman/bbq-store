import React from 'react';
import './Prod_display.scss';
import { Link } from 'react-router-dom';

export default function Prod_display(props) {
    return (
        <div className='product'>
            <Link to={props.prod_url} className='link'>
                <img className='image' src={props.prod_image} alt={props.prod_name} />
                <p className='prod-title'>
                    {props.prod_name}
                </p>
                <p className='prod-price'>
                    {props.prod_price}
                </p>
            </Link>
        </div>
    )
}