import React from 'react';
import './Card.scss';
import { Link } from 'react-router-dom';

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
      <h4>{name}</h4>
      <Link to={`/fullProfile/${id}`}>
        <img className="card-profile-image" src={src} alt={alt} />
      </Link>

      <h4>Specialisation</h4>
      {specialisation}

      <h4>Description</h4>
      {description}

      <h4>Location</h4>
      {location}

      <h4>
        Qualifications
        {isQualificationsVerified}
      </h4>
      {qualifications}

      <h4>Contact me</h4>
      <p>{email}</p>

      <p>{telephoneNumber}</p>
      <h4>Rating</h4>
      <p>{rating}</p>

      <h4>Number of Reviews</h4>
      <p>{reviews}</p>
    </div>
  );
};

export default Card;
