import React, { Component } from 'react';
import BodyComponent from '../bodyComponent/components/BodyComponent';

class LandingPage extends Component {
  render() {
    return (
      <div className="container-fluid">

        <div>
          <BodyComponent />
        </div>

      </div>
    );
  }
}

export default LandingPage;
