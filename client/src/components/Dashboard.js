import React from 'react';
import { Link } from 'react-router-dom';

import SurveyList from './surveys/SurveyList';

const Dashboard = () => (
  <div>
    <SurveyList />
    <div className="fixed-action-btn">
      <Link
        to="/surveys/new"
        className="btn-floating btn-large red"
      >
        <i className="material-icons">chat_bubble_outline</i>
      </Link>
    </div>
  </div>
);

export default Dashboard;
