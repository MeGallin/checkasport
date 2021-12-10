import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import Button from '../../components/button/Button';

const Header = () => {
  const handleClick = () => {
    alert('clicked');
  };
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/contact">Contact Us</Link>
        <Button
          colour="primary"
          text="login"
          className="btn"
          onClick={handleClick}
        />
      </nav>
    </header>
  );
};

export default Header;
