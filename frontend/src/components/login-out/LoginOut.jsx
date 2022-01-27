import React from 'react';
import PropTypes from 'prop-types';
import './LoginOut.scss';
import LinkComp from '../linkComp/LinkComp';

const LoginOut = ({
  description,
  route,
  routeDescription,
  onClick,
  definition,
}) => {
  return (
    <div className="login-out-wrapper">
      <span className="login-out-text">{description}</span>
      <span onClick={onClick} className="login-out-definition">
        {definition}
      </span>
      <LinkComp route={route} routeName={routeDescription} />
    </div>
  );
};

LoginOut.propTypes = {
  description: PropTypes.string,
  definition: PropTypes.string,
  routeDescription: PropTypes.string,
  route: PropTypes.string,
  onClick: PropTypes.func,
};

export default LoginOut;
