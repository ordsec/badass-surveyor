import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    if (!this.props.surveys.length) {
      return (
        <h5 style={{ 'text-align': 'center' }}>
          No surveys yet!&nbsp;
          <Link to="/surveys/new">Create one</Link>, perhaps?
        </h5>
      );
    }

    return this.props.surveys.map((survey, idx) => {
      return (<div className="card deep-orange lighten-5" key={idx}>
        <div className="card-content">
          <span className="card-title">{survey.title}</span>
          <p>
            {survey.body}
          </p>
          <p className="right">
            Sent on: {new Date(survey.dateSent).toLocaleDateString()}
          </p>
        </div>
        <div className="card-action">
          <a>Yes: {survey.yes}</a>
          <a>No: {survey.no}</a>
        </div>
      </div>);
    });
  }

  render() {
    return (
      <div>
        {this.renderSurveys()}
      </div>
    );
  }
}

const mapStateToProps = ({ surveys }) => {
  return { surveys };
};

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
