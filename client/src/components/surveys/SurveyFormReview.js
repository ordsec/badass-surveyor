import React from 'react';

const SurveyFormReview = ({ onCancel }) => (
  <div>
    <h5>Let's review this shiet</h5>
    <button
      className="yellow darken-3 btn-flat"
      onClick={onCancel}
    >
      Back
    </button>
  </div>
);

export default SurveyFormReview;
