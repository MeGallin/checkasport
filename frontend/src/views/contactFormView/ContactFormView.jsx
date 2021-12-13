import React, { useState } from 'react';
import './ContactFormView.scss';
import InputField from '../../components/inputField/InputField';
import Button from '../../components/button/Button';

const ContactFormView = ({ type }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, message);
  };

  return (
    <>
      <div className="contact-form-view-wrapper">
        <form>
          <InputField
            label="Name"
            type={type}
            name={name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputField
            label="Email"
            type="email"
            name={email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div>
            <label htmlFor="message">
              Message
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                name="message"
              />
            </label>
          </div>
          <Button
            colour="transparent"
            text="submit"
            className="btn"
            onClick={handleSubmit}
          ></Button>
        </form>
      </div>
    </>
  );
};

export default ContactFormView;
