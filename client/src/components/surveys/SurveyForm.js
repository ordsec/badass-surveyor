import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

class SurveyForm extends Component {
  render() {
    return (
      <div>
        <form onSubmit={
          // handleSubmit is provided by redux-form -
          // it takes our functions that describes
          // what to do with the values in the form
          this.props.handleSubmit((values) => console.log(values))
        }>
          <Field
            type="text"
            name="surveyTitle"
            component="input"
          />
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
