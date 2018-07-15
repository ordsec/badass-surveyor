import React from 'react';

const SurveyField = ({ input, label }) => (
  <div>
    <label>{label}</label>
    <input {...input} />
  </div>
);

export default SurveyField;
