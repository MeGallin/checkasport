import React from 'react';
import './AboutView.scss';

import LinkComp from '../../components/linkComp/LinkComp';

const AboutView = () => {
  return (
    <div className="about-wrapper">
      <fieldset className="fieldSet">
        <legend>About Us</legend>
        <h1>About Us</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora
          excepturi reprehenderit temporibus atque deleniti! Quam fugit odit
          nostrum molestias, sunt iure deserunt pariatur at consectetur tempora
          quasi totam recusandae molestiae!
        </p>
        <h3>About Us</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora
          excepturi reprehenderit temporibus atque deleniti! Quam fugit odit
          nostrum molestias, sunt iure deserunt pariatur at consectetur tempora
          quasi totam recusandae molestiae!
        </p>
        <h3>About Us</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora
          excepturi reprehenderit temporibus atque deleniti! Quam fugit odit
          nostrum molestias, sunt iure deserunt pariatur at consectetur tempora
          quasi totam recusandae molestiae!
        </p>
        <h3>About Us</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora
          excepturi reprehenderit temporibus atque deleniti! Quam fugit odit
          nostrum molestias, sunt iure deserunt pariatur at consectetur tempora
          quasi totam recusandae molestiae!
        </p>
      </fieldset>
      <div>
        <p>
          Got any questions ? <LinkComp route="faq" routeName="FAQ's" />
        </p>
      </div>
    </div>
  );
};

export default AboutView;
