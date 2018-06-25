import React from 'react';

import AuthUserContext from '../AuthUserContext';
import { PasswordForgetForm } from './pwForget';
import PasswordChangeForm from './pwChange';
import withAuthorization from '../withAuthorization';

const AccountPage = () =>
  <AuthUserContext.Consumer>
    {authUser =>
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    }
  </AuthUserContext.Consumer>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
