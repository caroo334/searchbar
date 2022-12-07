import React from "react";
import './Card.css';

export const Card = ({ name, code, img, price }) => {
    return (
        <div className="card-container">
            <img src={img} alt={name} className='card-img' />
            <div className="card-description">
                <span className="card-name">{name}</span>
                <span className="card-code">{code}</span>
            <p><span className="card-price">Precio:</span>{price}</p>
            </div>
        </div>
    )
}