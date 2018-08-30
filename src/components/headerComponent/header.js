import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

import AuthUserContext from '../AuthUserContext';
import SignOutButton from './../pages/signOut';
import * as routes from '../../constants/routes';
import { auth } from '../../firebase/firebase';

const Header = ({ authUser }) =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <HeaderAuth />
      : <HeaderNonAuth />
    }
  </AuthUserContext.Consumer>

const HeaderAuth = (authUser) =>
  <header className='header'>
    <div className="logo">
      <Link to="/">NUShares</Link>
      </div>

      <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to={routes.ACCOUNT}>Account</Link></li>
        <li><SignOutButton/></li>
        </ul>
      </nav>
  </header>

const HeaderNonAuth = () =>
<header className='header'>
  <div className="logo">
    <Link to="/">NUShares</Link>
    </div>

    <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li id='header-sign-in-btn'><Link to={routes.SIGN_IN}>Sign In</Link></li>
    </ul>
    </nav>
</header>

export default Header;
