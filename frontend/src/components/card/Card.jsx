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
    <div className="card-inner-wrapper">
      <div className="item">
        <div className="specialisation">DES1</div>
        <div className="specialisation">DES2</div>
        <div className="specialisation">DES3</div>
        <div className="specialisation">DES4</div>
      </div>
      <div className="item">
        <img className="card-profile-image" src={src} alt={alt} />
        <div>
          <div className="card-name">{name}</div>
          <Rating value={rating} text={`  from ${reviews} reviews`} />

          {specialisation}
          {description}
          {location}
          {isQualificationsVerified}
          {qualifications}
          {email}
          {telephoneNumber}
        </div>
      </div>

      <div className="item">
        <Link to={`/fullProfile/${id}`}>VIEW FULL PROFILE</Link>
      </div>
    </div>
  );
};

export default Card;
