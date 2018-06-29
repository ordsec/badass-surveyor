import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

const Header = () => <h2>Header</h2>
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Landing</h2>

const App = () => (
  <div>
    <BrowserRouter>
      <div>
        <Header />
        <Route path="/" exact={true} component={Landing} />
        <Route path="/surveys" exact={true} component={Dashboard} />
        <Route path="/surveys/new" component={SurveyNew} />
      </div>
    </BrowserRouter>
  </div>
);

export default App;
