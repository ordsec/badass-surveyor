import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ name, label }, idx) => {
      return <Field
        component={SurveyField}
        type="text"
        name={name}
        label={label}
        key={idx}
      />
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={
          // handleSubmit is provided by redux-form -
          // it takes our function that describes
          // what to do with the values in the form
          this.props.handleSubmit(this.props.onSurveySubmit)
        }>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
            <i className="material-icons right">clear</i>
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            NEXT
            <i className="material-icons right">chevron_right</i>
          </button>
        </form>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};

  errors.recipients = validateEmails(values.recipients);

  _.each(formFields, ({ name, noValue }) => {
    if (!values[name]) {
      errors[name] = noValue || `You must provide a ${name}`;
    }
  });

  return errors;
};

// similar to `connect`
export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
