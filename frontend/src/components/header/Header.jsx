import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Header.scss';
import Button from '../../components/button/Button';
import { logoutAction } from '../../store/actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/contact">Contact Us</Link>
        {userInfo ? (
          <Button
            colour="primary"
            text="logout"
            className="btn"
            onClick={handleLogout}
            disabled={false}
          />
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
