import React from 'react';
import './styles_signOut.css';
import { auth } from '../../firebase';

const SignOutButton = () =>
  <button
    type="button"
    id='signOut-btn'
    onClick={auth.doSignOut}
  >
    Sign Out
  </button>

export default SignOutButton;
