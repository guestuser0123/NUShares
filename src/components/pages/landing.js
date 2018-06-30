import React, { Component } from 'react';
import BodyComponent from '../bodyComponent/components/BodyComponent';

class LandingPage extends Component {
  render() {
    return (
      <div className="container-fluid">

        <h1>
          LANDING PAGE (STOP AT PASSWORD RESET!!!!!!!!!!!!!!!!!!!)
        </h1>

        <div>
          <BodyComponent />
        </div>

      </div>
    );
  }
}

export default LandingPage;
