import React from 'react';
import './Footer.scss';
import DateTime from '../dateTime/DateTime';

import LinkComp from '../linkComp/LinkComp';

const Footer = () => {
  return (
    <footer>
      <div className="footer-wrapper">
        <LinkComp route="cookies" routeName="View our Cookies Policy" />
        <LinkComp route="privacy" routeName="View our Privacy Policy" />
      </div>
      <div className="date-time">
        <DateTime />
      </div>
    </footer>
  );
};

export default Footer;
