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
import LoginOut from '../login-out/LoginOut';

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
            <LoginOut
              description={userReviewInfo.name}
              definition="Logout"
              onClick={handleReviewerLogout}
            />
          ) : null}

          {userInfo ? (
            <div className="user-info-wrapper">
              <div className="header-profile-wrapper">
                <span>
                  <LinkComp
                    route="user-profile-edit"
                    routeName="control panel"
                  />
                </span>
              </div>

              <div className="members-login--wrapper">
                {/* Use definition if its not a link */}
                <LoginOut
                  description={userInfo.name}
                  definition="Logout"
                  onClick={handleLogout}
                />
              </div>
            </div>
          ) : (
            <>
              {!userReviewInfo ? (
                <LoginOut
                  description="Members"
                  route="login"
                  routeDescription="login"
                />
              ) : null}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
