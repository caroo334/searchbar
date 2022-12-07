import React from "react";
import './Card.css';

export const Card = ({description, img, ...props}) => {
    return (
        <div className="card-container">
            <img src={img} alt={description} className='card-img'/>
            <span className="card-description">{description}</span>
        </div>
    )
}