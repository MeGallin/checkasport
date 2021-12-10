import React from 'react';
import './Header.scss';
import Button from '../../components/button/Button';

const Header = () => {
  const handleClick = () => {
    alert('clicked');
  };
  return (
    <header>
      <nav>
        <Button colour text="login" className="btn" onClick={handleClick} />
      </nav>
    </header>
  );
};

export default Header;
