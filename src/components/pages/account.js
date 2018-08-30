import React from 'react';
import AuthUserContext from '../AuthUserContext';
import withAuthorization from '../withAuthorization';
import ProfilePage from './profile';

var location;

const AccountPage = () =>
  <AuthUserContext.Consumer>
    {authUser =>
      <div>
        <div className="acc-container">
          <ProfilePage location={location={state:authUser}} showAccPage={true} uid={authUser.uid}/>
        </div>
      </div>
    }
  </AuthUserContext.Consumer>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);