import React from 'react';
// import './cart.scss';
import { FaRegTrashAlt } from 'react-icons/fa';
import Button from '@material-ui/core/Button';

export default function cartDisplay(props) {
    return (
        <tr key={props.id}>
            <td className='trash'>
                <FaRegTrashAlt onClick={() => props.removeProduct(props.id)}/>
            </td>
            <td>{props.name}</td>
            <td>{props.price}</td>
            <td>
                <button onClick={() => props.updateQuantity('minus', props.id, props.quantity)}
                    className='btn-quantity'>-</button>
                <input className='input-quantity' type="text" value={props.quantity} readOnly />
                <button onClick={() => props.updateQuantity('add', props.id, props.quantity)}
                    className='btn-quantity'>+</button>
            </td>
            {/* </span> */}
            <td>{props.total}</td>
        </tr>

    )
}