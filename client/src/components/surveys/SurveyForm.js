import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class SurveyForm extends Component {
  render() {
    return (
      <div>
        And the ACTUAL form goes heah!
      </div>
    );
  }
}

// similar to `connect`
export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
