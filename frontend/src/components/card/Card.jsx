import React from 'react';
import './Card.scss';

const Card = ({ name, src, alt, description, location, email }) => {
  return (
    <div className="card" name={name} src={src} alt={alt}>
      <h4>{name}</h4>
      <img className="card-img" src={src} alt={alt} />
      <h4>Description</h4>
      <p>{description}</p>
      <h4>Location</h4>
      <p>{location}</p>
      <h4>Email address</h4>
      <p>{email}</p>
    </div>
  );
};

export default Card;
