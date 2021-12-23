import React from 'react';
import './Card.scss';

const Card = ({ name, src, alt, description, location, email }) => {
  return (
    <div className="card" name={name} src={src} alt={alt}>
      <h4>{name}</h4>
      <img className="card-img" src={src} alt={alt} />
      <p>{description}</p>
      <p>{location}</p>
      <p>{email}</p>
    </div>
  );
};

export default Card;
