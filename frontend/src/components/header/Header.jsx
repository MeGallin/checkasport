import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Header.scss';
import LinkComp from '../linkComp/LinkComp';
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
      <nav className="nav-wrapper">
        <div>
          <Link to="/">Home</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div>
          {userInfo ? (
            <div className="user-info-wrapper">
              <Button
                colour="primary"
                text="logout"
                className="btn"
                onClick={handleLogout}
                disabled={false}
              />
              <LinkComp route="profile" routeName="Profile" />
            </div>
          ) : (
            <>
              <LinkComp route="login" routeName="Login" />
              or
              <LinkComp route="registration" routeName="Register" />
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
