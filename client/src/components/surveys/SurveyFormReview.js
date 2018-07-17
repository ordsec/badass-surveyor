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
      <h5>Let's review this shiz</h5>
      <div style={{ margin: '30px 0' }}>
        {reviewFields}
      </div>
      <button
        className="yellow darken-4 white-text btn-flat"
        onClick={onCancel}
      >
        <i className="material-icons left">chevron_left</i>
        Back
      </button>
      <button className="green btn-flat right white-text">
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { formValues: state.form.surveyForm.values };
};

export default connect(mapStateToProps)(SurveyFormReview);
