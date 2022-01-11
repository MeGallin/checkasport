import React from 'react';
import './Card.scss';
import { Link } from 'react-router-dom';
import Rating from '../rating/Rating';

const Card = ({
  id,
  name,
  src,
  alt,
  description,
  location,
  email,
  telephoneNumber,
  specialisation,
  qualifications,
  isQualificationsVerified,
  rating,
  reviews,
}) => {
  return (
    <div className="card" name={name} src={src} alt={alt}>
      <Rating value={rating} text={`  from ${reviews} reviews`} />
      {name}
      <Link to={`/fullProfile/${id}`}>
        <img className="card-profile-image" src={src} alt={alt} />
      </Link>
      {specialisation}
      {description}
      {location}
      {isQualificationsVerified}
      {qualifications}
      {email}
      {telephoneNumber}
    </div>
  );
};

export default Card;
