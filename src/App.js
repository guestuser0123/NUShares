import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

// components
import Navigation from './components/Navigation';
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import LandingPage from './components/pages/landing';
import SignUpPage from './components/pages/signUp';
import HomePage from './components/pages/homePage';
import AccountPage from './components/pages/account';
import SignInPage from './components/pages/signIn';
import PasswordForgetPage from './components/pages/pwForget';

import * as routes from './constants/routes';
import { firebase } from './firebase';

// includes
import './Assets/css/default.min.css';

import withAuthentication from './components/withAuthentication';

const App = () =>
  <Router>
    <div className="App">
      <Header />
        <Route exact path={routes.LANDING} render={() => <LandingPage />} />
        <Route exact path={routes.SIGN_UP} render={() => <SignUpPage />} />
        <Route exact path={routes.SIGN_IN} render={() => <SignInPage />} />
        <Route exact path={routes.PASSWORD_FORGET} render={() => <PasswordForgetPage />} />
        <Route exact path={routes.HOME} render={() => <HomePage />} />
        <Route exact path={routes.ACCOUNT} render={() => <AccountPage />} />
        <Footer />

    </div>
  </Router>

export default withAuthentication(App);
