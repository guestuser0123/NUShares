import React, { Component } from 'react';
import LandingBoardController from './LandingBoardController';
import '../styles/styles_bodycomponent.css';

class BodyComponent extends Component {
  render() {
    return (
      <div id="body-wrapper">
        <div>
            <LandingBoardController />
        </div>
      </div>
    );
  }
}

export default BodyComponent;
