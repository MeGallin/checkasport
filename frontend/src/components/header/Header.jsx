import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Header.scss';

import LinkComp from '../linkComp/LinkComp';
import Button from '../../components/button/Button';

import { logoutAction } from '../../store/actions/userActions';
import { reviewLogoutAction } from '../../store/actions/userReviewActions';
import { USER_REVIEW_CREATE_COMMENT_RESET } from '../../store/constants/userReviewConstants';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userReviewLogin = useSelector((state) => state.userReviewLogin);
  const { userReviewInfo } = userReviewLogin;

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate('/');
  };
  const handleReviewerLogout = () => {
    dispatch({ type: USER_REVIEW_CREATE_COMMENT_RESET });
    dispatch(reviewLogoutAction());
  };

  return (
    <header>
      <nav className="nav-wrapper">
        <div>
          <Link to="/">Home</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="nav-wrapper">
          {userReviewInfo ? (
            <Button
              colour="primary"
              text="Reviewer Logout"
              className="btn"
              onClick={handleReviewerLogout}
              disabled={false}
            />
          ) : null}

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
                  <LinkComp
                    route="user-profile-edit"
                    routeName={userInfo.name}
                  />
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
