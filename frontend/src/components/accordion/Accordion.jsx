import React from 'react';
import './Accordion.scss';

const Accordion = ({ question, answer, onClick }) => {
  return (
    <>
      <div className="accordion-wrapper">
        <div>
          <div className={!answer ? 'question' : 'answer'} onClick={onClick}>
            {question ? (
              <div className="accordion-inner-wrapper">
                <div>
                  <span>Q</span>
                  {question}
                  <span>?</span>
                </div>

                <div>
                  {!answer ? (
                    <i className="fas fa-chevron-circle-up"></i>
                  ) : (
                    <i className="fas fa-chevron-circle-down"></i>
                  )}
                </div>
              </div>
            ) : null}
          </div>
          <div className="answer">
            {answer ? (
              <>
                <span>A</span>
                {answer}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Accordion;
