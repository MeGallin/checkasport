import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contactFormMessageAction } from '../../store/actions/contactFormActions';
import { CONTACT_FORM_RESET } from '../../store/constants/contactFormConstants';
import './ContactFormView.scss';

import InputField from '../../components/inputField/InputField';
import Button from '../../components/button/Button';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import Message from '../../components/message/Message';

const ContactFormView = ({ type }) => {
  const dispatch = useDispatch();
  const contactForm = useSelector((state) => state.contactForm);
  const { loading, error, success, payload } = contactForm;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch({ type: CONTACT_FORM_RESET });
    return () => {
      console.log('cleanup');
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call action creator function
    dispatch(contactFormMessageAction(name, email, message));
    setName('');
    setEmail('');
    setMessage('');
  };

  const closeHandler = () => {
    //Dispatch CONTACT_FORM_RESET
    dispatch({ type: CONTACT_FORM_RESET });
  };

  return (
    <>
      {success ? (
        <Message
          message={payload.message}
          success={success}
          onClick={closeHandler}
        />
      ) : (
        <Message message={payload} success={success} onClick={closeHandler} />
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
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
      )}
    </>
  );
};

export default ContactFormView;
