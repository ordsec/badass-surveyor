import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import SurveyField from './SurveyField';

const FIELDS = [
  { label: 'Survey Title', name: 'title' },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email Boydy', name: 'body' },
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
          <button type="submit">Let's do it</button>
        </form>
      </div>
    );
  }
}

// similar to `connect`
export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
