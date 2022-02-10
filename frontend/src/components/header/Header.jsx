import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Header.scss';

import LinkComp from '../linkComp/LinkComp';
import LoginOut from '../login-out/LoginOut';

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
      <fieldset className="fieldSet">
        <legend>
          <LinkComp route="" routeName="Sport Vantage Logo" />
        </legend>
        <nav className="nav-wrapper">
          <div>
            {/* <LinkComp route="" routeName="home" /> */}
            <LinkComp route="contact" routeName="contact" />
            <LinkComp route="about" routeName="about us" />
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
                <LinkComp route="user-profile-edit" routeName="control panel" />

                <div className="members-login--wrapper">
                  {/* Use attribute = definition if its not a link */}
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
      </fieldset>
    </header>
  );
};

export default Header;
