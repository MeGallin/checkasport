import React from 'react';
import './Card.scss';

const Card = ({
  name,
  src,
  alt,
  description,
  location,
  email,
  telephoneNumber,
}) => {
  return (
    <div className="card" name={name} src={src} alt={alt}>
      <h4>{name}</h4>
      <img className="card-img" src={src} alt={alt} />
      <h4>Description</h4>
      {description}
      <h4>Location</h4>
      {location}
      <h4>Email address</h4>
      <p>{email}</p>
      <h4>Contact number</h4>
      <p>{telephoneNumber}</p>
    </div>
  );
};

export default Card;
