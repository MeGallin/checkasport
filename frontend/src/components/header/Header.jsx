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

              <div className="header-profile-wrapper">
                <i
                  className="fa fa-user"
                  style={{ fontSize: 20 + 'px', color: 'rgba(92, 184, 92, 1)' }}
                ></i>
                <span>
                  <LinkComp route="profile" routeName={userInfo.name} />
                </span>
              </div>
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
