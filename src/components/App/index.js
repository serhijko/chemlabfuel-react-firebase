import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Header from '../Header';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import Journal_T12 from '../Journals/Journal_T12';
import Footer from '../Footer';
import './index.css';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <div className="App">
      <Header />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SING_UP} component={SignUpPage} />
      <Route path={ROUTES.SING_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.JOURNAL_T12} component={Journal_T12} />

      <hr />

      <Footer />
    </div>
  </Router>
);

export default withAuthentication(App);
