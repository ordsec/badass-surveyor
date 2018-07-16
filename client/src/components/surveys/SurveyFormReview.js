import React from 'react';
import { connect } from 'react-redux';

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

const mapStateToProps = (state) => {
  return { formValues: state.form.surveyForm.values };
};

export default connect(mapStateToProps)(SurveyFormReview);
