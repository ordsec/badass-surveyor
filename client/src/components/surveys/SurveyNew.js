// container for SurveyForm and SurveyReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
  // CRA way of creating component-level state
  // without using the constructor
  state = { showFormReview: false };

  // handle showing either the form or the review page
  renderContent() {
    if (this.state.showFormReview) {
      return <SurveyFormReview
        onCancel={() => this.setState({ showFormReview: false })}
      />;
    }

    return <SurveyForm
      onSurveySubmit={() => this.setState({ showFormReview: true })}
    />;
  }

  render() {
    return (
      <div className="container" style={{ marginTop: '30px' }}>
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({
  // component is hooked up to the same place in the redux store,
  // but the data in the form will be destroyed when you hit the
  // cancel button. this happens because this component is the 
  // parent of SurveyForm and SurveyFormReview and due to the
  // default behaviour of redux-form
  form: 'surveyForm'
})(SurveyNew);
