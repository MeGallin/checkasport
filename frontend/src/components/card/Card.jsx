import React from 'react';
import './Card.scss';

const Card = ({ name, src, alt, description }) => {
  return (
    <div className="card" name={name} src={src} alt={alt}>
      <h4>{name}</h4>
      <img className="card-img" src={src} alt={alt} />
      <p>{description}</p>
    </div>
  );
};

export default Card;
