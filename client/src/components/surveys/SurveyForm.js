import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import SurveyField from './SurveyField';

class SurveyForm extends Component {
  renderFields() {
    return (
      <div>
        {/* delegate component rendering to a custom component we set up */}
        <Field type="text" name="title" component={SurveyField} />
      </div>
    );
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
