import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import formFields from './formFields';

const SurveyFormReview = ({ onCancel, formValues }) => {
  const reviewFields = _.map(formFields, ({ label, name }, idx) => {
    return (
      <div key={idx} style={{ marginBottom: '10px' }}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Let's review this shiet</h5>
      {reviewFields}
      <button
        className="yellow darken-3 btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { formValues: state.form.surveyForm.values };
};

export default connect(mapStateToProps)(SurveyFormReview);
