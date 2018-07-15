import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';

const FIELDS = [
  { label: 'Survey Title', name: 'title' },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email Body', name: 'body' },
  { label: 'Recipient List', name: 'recipients' }
];

class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ name, label }, idx) => {
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
          // it takes our functions that describes
          // what to do with the values in the form
          this.props.handleSubmit((values) => console.log(values))
        }>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
            <i className="material-icons right">clear</i>
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            NEXT
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

// similar to `connect`
export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
