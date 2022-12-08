import React from "react";
import "./Card.css";

export const Card = ({ name, code, img, price }) => (
  <div className="card">
    <img className="image" src={img} alt={name} />
    <div className="info-container">
      <div className="name-container">
        <span className="card-title">{name}</span>
        <span className="card-code">{code}</span>
      </div>
      <div className="price-container">
        <span className="card-price">Precio:</span>
        <span className="card-price-amount">{price}</span>
      </div>
    </div>
  </div>
);
